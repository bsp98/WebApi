
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





namespace WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

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


            //Aca agregamos la configuración CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("PermitirFrontendLocalhost", policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
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
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(claveBytes),
                    ValidateIssuer = true,
                    ValidIssuer = "https://servidor_seguridad",
                    ValidateAudience = true,
                    ValidAudience = "https://servidor_protegido",
                    ClockSkew = TimeSpan.Zero
                };

                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        // Extraer token desde la cookie
                        if (context.Request.Cookies.ContainsKey("jwt"))
                        {
                            context.Token = context.Request.Cookies["jwt"];
                        }
                        return Task.CompletedTask;
                    }
                };
            });

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


            //email
            builder.Services.AddScoped<IServicioEmail, ServicioEmail>();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

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

            // Aca aplicamos el middleware CORS
            app.UseCors("PermitirFrontendLocalhost");

            // autorization y authentication
            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();

           

        }
    }
}
