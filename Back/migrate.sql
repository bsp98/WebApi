IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250728234812_init'
)
BEGIN
    CREATE TABLE [Agenda] (
        [AgendaId] int NOT NULL IDENTITY,
        [Fecha] datetime2 NOT NULL,
        CONSTRAINT [PK_Agenda] PRIMARY KEY ([AgendaId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250728234812_init'
)
BEGIN
    CREATE TABLE [DiaNoLaborables] (
        [Id] int NOT NULL IDENTITY,
        [Fecha] datetime2 NOT NULL,
        CONSTRAINT [PK_DiaNoLaborables] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250728234812_init'
)
BEGIN
    CREATE TABLE [Egresos] (
        [Id] int NOT NULL IDENTITY,
        [Fecha] datetime2 NOT NULL,
        [CategoriaEgreso] int NOT NULL,
        [Lugar] nvarchar(max) NOT NULL,
        [Monto] float NOT NULL,
        [Descripcion] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Egresos] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250728234812_init'
)
BEGIN
    CREATE TABLE [Servicios] (
        [ServicioId] int NOT NULL IDENTITY,
        [Nombre] nvarchar(max) NOT NULL,
        [Descripcion] nvarchar(max) NOT NULL,
        [Precio] float NOT NULL,
        [Descuento] int NOT NULL,
        [Disponibilidad] int NOT NULL,
        [Categoria] int NOT NULL,
        [TiempoDeDuracionMin] int NOT NULL,
        CONSTRAINT [PK_Servicios] PRIMARY KEY ([ServicioId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250728234812_init'
)
BEGIN
    CREATE TABLE [Usuarios] (
        [Id] int NOT NULL IDENTITY,
        [Email] nvarchar(max) NOT NULL,
        [Password] nvarchar(max) NOT NULL,
        [Nombre] nvarchar(max) NOT NULL,
        [Apellido] nvarchar(max) NOT NULL,
        [TipoUsuario] int NOT NULL,
        [FechaDeNacimiento] datetime2 NULL,
        [Celular] nvarchar(max) NULL,
        [Activo] bit NULL,
        [PoliticasAceptadas] bit NULL,
        [FechaAceptacion] datetime2 NULL,
        CONSTRAINT [PK_Usuarios] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250728234812_init'
)
BEGIN
    CREATE TABLE [BloqueHorario] (
        [BloqueHorarioId] int NOT NULL IDENTITY,
        [HoraInicio] time NOT NULL,
        [HoraFin] time NOT NULL,
        [EstaDisponible] bit NOT NULL,
        [AgendaId] int NULL,
        CONSTRAINT [PK_BloqueHorario] PRIMARY KEY ([BloqueHorarioId]),
        CONSTRAINT [FK_BloqueHorario_Agenda_AgendaId] FOREIGN KEY ([AgendaId]) REFERENCES [Agenda] ([AgendaId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250728234812_init'
)
BEGIN
    CREATE TABLE [Reservas] (
        [Id] int NOT NULL IDENTITY,
        [PrecioTotal] float NOT NULL,
        [Fecha] datetime2 NOT NULL,
        [ClienteId] int NULL,
        [NombreCliente] nvarchar(max) NULL,
        [ApellidoCliente] nvarchar(max) NULL,
        [EmailCliente] nvarchar(max) NULL,
        [CelularCliente] nvarchar(max) NULL,
        [EstadoDePago] int NOT NULL,
        [ServicioId] int NOT NULL,
        [HoraInicio] time NOT NULL,
        [HoraFin] time NOT NULL,
        [Cancelada] bit NOT NULL,
        CONSTRAINT [PK_Reservas] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Reservas_Servicios_ServicioId] FOREIGN KEY ([ServicioId]) REFERENCES [Servicios] ([ServicioId]) ON DELETE CASCADE,
        CONSTRAINT [FK_Reservas_Usuarios_ClienteId] FOREIGN KEY ([ClienteId]) REFERENCES [Usuarios] ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250728234812_init'
)
BEGIN
    CREATE INDEX [IX_BloqueHorario_AgendaId] ON [BloqueHorario] ([AgendaId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250728234812_init'
)
BEGIN
    CREATE INDEX [IX_Reservas_ClienteId] ON [Reservas] ([ClienteId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250728234812_init'
)
BEGIN
    CREATE INDEX [IX_Reservas_ServicioId] ON [Reservas] ([ServicioId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250728234812_init'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250728234812_init', N'9.0.5');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250803050602_CrearTablaPublicaciones'
)
BEGIN
    CREATE TABLE [Publicaciones] (
        [Id] int NOT NULL IDENTITY,
        [Titulo] nvarchar(max) NOT NULL,
        [Descripcion] nvarchar(max) NOT NULL,
        [ImagenUrl] nvarchar(max) NOT NULL,
        [FechaPublicacion] datetime2 NOT NULL,
        CONSTRAINT [PK_Publicaciones] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250803050602_CrearTablaPublicaciones'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250803050602_CrearTablaPublicaciones', N'9.0.5');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250810184050_AddPagos'
)
BEGIN
    CREATE TABLE [Pagos] (
        [Id] int NOT NULL IDENTITY,
        [PreferenceId] nvarchar(max) NOT NULL,
        [ExternalReference] nvarchar(max) NULL,
        [PaymentId] nvarchar(max) NULL,
        [Status] nvarchar(max) NOT NULL,
        [Monto] decimal(18,2) NOT NULL,
        [Moneda] nvarchar(max) NOT NULL,
        [CreadoUtc] datetime2 NOT NULL,
        [ActualizadoUtc] datetime2 NULL,
        CONSTRAINT [PK_Pagos] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250810184050_AddPagos'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250810184050_AddPagos', N'9.0.5');
END;

COMMIT;
GO

