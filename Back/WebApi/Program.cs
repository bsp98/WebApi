
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

            //Aca agregamos la configuración CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("PermitirFrontendLocalhost", policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });
            builder.Services.AddScoped(typeof(IRepositorioReserva), typeof(RepositorioReserva));
            builder.Services.AddScoped(typeof(IServicioReserva), typeof(ServicioReserva));

            builder.Services.AddScoped(typeof(IRepositorioDiaNoLaborable), typeof(RepositorioDiaNoLaborable));
            builder.Services.AddScoped(typeof(IServicioDiaNoLaborable), typeof(ServicioDiaNoLaborable));



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
                    ValidAudience = "https://servidor_protegido"
                };
                
            });

            // Configurar la autorización
            builder.Services.AddAuthorization(options =>
            {
                options.DefaultPolicy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
            });



            // Configurar la autorización
            builder.Services.AddAuthorization(options =>
            {
                options.DefaultPolicy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
            });

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
