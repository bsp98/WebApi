
using DataAcces.Interfaces;
using DataAcces.Interfaces.CRUD;
using DataAcces.Repositories;
using DataAccess.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;
using Services.Services;
using System.Text;

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



            builder.Services.AddScoped(typeof(IRepositorioUsuario), typeof(RepositorioUsuario));
            builder.Services.AddScoped(typeof(IServicioUsuario), typeof(ServicioUsuario));

            builder.Services.AddAutoMapper(typeof(ServicioUsuario));

            builder.Services.AddScoped(typeof(IRepositoryAdd<>), typeof(RepositorioGeneral<>));
            builder.Services.AddScoped(typeof(IRepositoryUpdate<>), typeof(RepositorioGeneral<>));
            builder.Services.AddScoped(typeof(IRepositoryRemove<>), typeof(RepositorioGeneral<>));

            // Add services to the container.

            // Configurar la autenticación JWT
            var claveSecreta = builder.Configuration.GetValue<string>("ClaveSecreta:Clave");

            var claveBytes = Encoding.UTF8.GetBytes(claveSecreta);

            //builder.Services.AddAuthentication(options =>
            //{
            //    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //}).AddJwtBearer(options =>
            //{
            //    options.RequireHttpsMetadata = false;
            //    options.SaveToken = true;
            //    options.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidateIssuerSigningKey = true,
            //        IssuerSigningKey = new SymmetricSecurityKey(claveBytes),
            //        ValidateIssuer = true,
            //        ValidIssuer = "https://servidor_seguridad",
            //        ValidateAudience = true,
            //        ValidAudience = "https://servidor_protegido"
            //    };
            //});

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
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
