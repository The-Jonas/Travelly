CREATE TABLE Usuario (
    id UUID PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(255),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Reserva (
    id UUID PRIMARY KEY,
    usuario_id UUID REFERENCES Usuario(id),
    data_reserva TIMESTAMP,
    status VARCHAR(20)
);

CREATE TABLE Avaliacao (
    id UUID PRIMARY KEY,
    usuario_id UUID REFERENCES Usuario(id),
    destino_id UUID REFERENCES Destino(id),
    nota INTEGER,
    comentario TEXT,
    data_avaliacao TIMESTAMP
);

CREATE TABLE Pagamento (
    id UUID PRIMARY KEY,
    reserva_id UUID REFERENCES Reserva(id),
    metodo_pagamento VARCHAR(50),
    valor_pago DECIMAL(10, 2),
    data_pagamento TIMESTAMP
);

CREATE TABLE Viagem (
    id UUID PRIMARY KEY,
    data_inicio DATE,
    data_fim DATE,
    preco_total DECIMAL(10, 2)
);

CREATE TABLE Itinerario (
    id UUID PRIMARY KEY,
    viagem_id UUID REFERENCES Viagem(id),
    dia INTEGER,
    descricao TEXT
);

CREATE TABLE Hospedagem (
    id UUID PRIMARY KEY,
    nome VARCHAR(100),
    localizacao VARCHAR(255),
    preco_noite DECIMAL(10, 2)
);

CREATE TABLE Transporte (
    id UUID PRIMARY KEY,
    tipo VARCHAR(50),
    descricao TEXT,
    preco DECIMAL(10, 2)
);

CREATE TABLE Itinerario_Hospedagem (
    itinerario_id UUID REFERENCES Itinerario(id),
    hospedagem_id UUID REFERENCES Hospedagem(id),
    PRIMARY KEY (itinerario_id, hospedagem_id)
);

CREATE TABLE Itinerario_Transporte (
    itinerario_id UUID REFERENCES Itinerario(id),
    transporte_id UUID REFERENCES Transporte(id),
    PRIMARY KEY (itinerario_id, transporte_id)
);

CREATE TABLE Destino (
    id UUID PRIMARY KEY,
    nome VARCHAR(100),
    pais VARCHAR(100),
    descricao TEXT,
    imagem BYTEA
);

CREATE TABLE PacoteTuristico (
    id UUID PRIMARY KEY,
    nome VARCHAR(100),
    descricao TEXT,
    preco_base DECIMAL(10, 2),
    destino_id UUID REFERENCES Destino(id)
);

CREATE TABLE Reserva_Viagem (
    reserva_id UUID REFERENCES Reserva(id),
    viagem_id UUID REFERENCES Viagem(id),
    PRIMARY KEY (reserva_id, viagem_id)
);
