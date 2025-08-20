
using DataAcces.Interfaces;
using DataAcces.Interfaces.CRUD;
using DataAcces.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using DataAccess.Interfaces;
using Services.Services;
using Services.Interfaces;
using Domain.Models;
using Microsoft.OpenApi.Models;
using MercadoPago.Config;
using Hangfire;
using System.Security.Claims;





namespace WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            MercadoPago.Config.MercadoPagoConfig.AccessToken =
                builder.Configuration["MercadoPago:AccessToken"];


            //inyecta el Contexto
            builder.Services.AddDbContext<DbContext, Contexto>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("StringConection"),
                b => b.MigrationsAssembly("WebApi"));
            });
            

            //inyecta los repositorios
            builder.Services.AddScoped(typeof(IRepositorioServicio), typeof(RepositorioServicio));
            builder.Services.AddScoped(typeof(IServicioServicio), typeof(ServicioServicio));
            builder.Services.AddScoped(typeof(IRepositorioUsuario), typeof(RepositorioUsuario));
            builder.Services.AddScoped(typeof(IServicioUsuario), typeof(ServicioUsuario));
            builder.Services.AddScoped(typeof(IRepositorioAgenda), typeof(RepositorioAgenda));
            builder.Services.AddScoped(typeof(IRepositorioBloqueHorario), typeof(RepositorioBloqueHorario));
            builder.Services.AddScoped(typeof(IServicioAutenticacion), typeof(ServicioAutenticacion));
            builder.Services.AddScoped(typeof(IRepositorioEgreso), typeof(RepositorioEgreso));
            builder.Services.AddScoped(typeof(IServicioEgreso), typeof(ServicioEgreso));
            builder.Services.AddScoped(typeof(IServicioEstadistica), typeof(ServicioEstadstica));

            builder.Services.AddScoped(typeof(IServicioPublicacion), typeof(ServicioPublicacion));
            builder.Services.AddScoped(typeof(IRepositorioPublicacion), typeof(RepositorioPublicacion));


            builder.Services.AddScoped(typeof(IServicioGiftCard), typeof(ServicioGiftCard));

            builder.Services.AddScoped(typeof(IServicioPago), typeof(ServicioPago));
            builder.Services.AddScoped(typeof(IRepositorioPago), typeof(RepositorioPago));

            builder.Services.AddScoped(typeof(IServicioModoDePago), typeof(ServicioModoDePago));
            builder.Services.AddScoped(typeof(IRepositorioModoDePago), typeof(RepositorioModoDePago));


            //Aca agregamos la configuración CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("PermitirFrontendLocalhost", policy =>
                {
                    policy.WithOrigins("http://localhost:5173", "https://delightful-bush-03f20bd10.1.azurestaticapps.net")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                });
            });
            builder.Services.AddScoped(typeof(IRepositorioReserva), typeof(RepositorioReserva));
            builder.Services.AddScoped(typeof(IServicioReserva), typeof(ServicioReserva));

            builder.Services.AddScoped(typeof(IRepositorioDiaNoLaborable), typeof(RepositorioDiaNoLaborable));
            builder.Services.AddScoped(typeof(IServicioDiaNoLaborable), typeof(ServicioDiaNoLaborable));

            builder.Services.AddScoped(typeof(IServicioEmail), typeof(ServicioEmail));
            builder.Services.AddSingleton<IServicioCodigo, ServicioCodigo>();
            builder.Services.AddScoped(typeof(IServicioContacto), typeof(ServicioContacto));


            // Add services to the container.

            builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());



            // Configurar la autenticación JWT
            var claveSecreta = builder.Configuration.GetValue<string>("ClaveSecreta:Clave");

            var claveBytes = Encoding.UTF8.GetBytes(claveSecreta);

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        {
                            if (context.Request.Cookies.TryGetValue("jwt", out var token))
                                context.Token = token;     // ← toma el token de la cookie
                            return Task.CompletedTask;
                        }
                    }
                };
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(claveBytes),
                    ValidateIssuer = true,
                    ValidateLifetime = true,
                    ValidIssuer = "https://servidor_seguridad",
                    ValidateAudience = true,
                    ValidAudience = "https://servidor_protegido",
                    RoleClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
                    ClockSkew = TimeSpan.Zero
                };

                
            });
            // hangfire
            builder.Services.AddHangfire(config =>
            {
                config.UseSqlServerStorage(builder.Configuration.GetConnectionString("StringConection"));
            });

            builder.Services.AddHangfireServer(); // <- Muy importante, este corre los workers

            // Configurar la autorización
            builder.Services.AddAuthorization(options =>
            {
                options.DefaultPolicy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
            });

            builder.Services.AddHttpContextAccessor();
           

            //conf de autorizacion
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new() { Title = "Mi API", Version = "v1" });

                // Configuración para JWT Bearer
                c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                    Description = "Ingrese el token JWT como: Bearer {su_token}"
                });

                c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
            });
            //mercado pago
            MercadoPagoConfig.AccessToken = builder.Configuration["MercadoPago:AccessToken"];
            //email
            builder.Services.AddScoped<IServicioEmail, ServicioEmail>();


            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
           // if (app.Environment.IsDevelopment())
          //  {
                app.UseSwagger();
                app.UseSwaggerUI();
          //  }

            app.UseHttpsRedirection();
            //hangfire
            app.UseHangfireDashboard();


            app.UseRouting();
            // Aca aplicamos el middleware CORS
            app.UseCors("PermitirFrontendLocalhost");

            // autorization y authentication
            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();
            //PULBI
            app.UseStaticFiles();
            app.UseStaticFiles();

            app.Run();

           

        }
    }
}
