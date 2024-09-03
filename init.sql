CREATE TABLE Destino (
    id UUID PRIMARY KEY,
    nome VARCHAR(100),
    pais VARCHAR(100),
    descricao TEXT,
    imagem BYTEA
);
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


CREATE TABLE Pacote_turistico (
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


-- tabela Usuario
INSERT INTO Usuario (id, nome, email, senha) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Alice Silva', 'alice@example.com', 'senha1'),
('550e8400-e29b-41d4-a716-446655440002', 'Bob Souza', 'bob@example.com', 'senha2'),
('550e8400-e29b-41d4-a716-446655440003', 'Carol Dias', 'carol@example.com', 'senha3'),
('550e8400-e29b-41d4-a716-446655440004', 'David Lima', 'david@example.com', 'senha4'),
('550e8400-e29b-41d4-a716-446655440005', 'Eva Martins', 'eva@example.com', 'senha5');

-- tabela Destino
INSERT INTO Destino (id, nome, pais, descricao, imagem) VALUES
('550e8400-e29b-41d4-a716-446655440006', 'Paris', 'França', 'Cidade Luz', pg_read_binary_file('/images/paris.jpg')),
('550e8400-e29b-41d4-a716-446655440007', 'Rio de Janeiro', 'Brasil', 'Cidade Maravilhosa', pg_read_binary_file('/images/rj.jpg')),
('550e8400-e29b-41d4-a716-446655440008', 'Nova York', 'Estados Unidos', 'A Big Apple', pg_read_binary_file('/images/ny.jpg')),
('550e8400-e29b-41d4-a716-446655440009', 'Tóquio', 'Japão', 'Cidade que nunca dorme', pg_read_binary_file('/images/toquio.jpg')),
('550e8400-e29b-41d4-a716-446655440010', 'Sydney', 'Austrália', 'Cidade costeira', pg_read_binary_file('/images/sydney.jpg'));

-- tabela Avaliacao
INSERT INTO Avaliacao (id, usuario_id, destino_id, nota, comentario, data_avaliacao) VALUES
('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440006', 5, 'Incrível!', CURRENT_TIMESTAMP),
('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440007', 4, 'Muito bom!', CURRENT_TIMESTAMP),
('550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440008', 4, 'Ótima experiência', CURRENT_TIMESTAMP),
('550e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440009', 3, 'Foi bom, mas caro', CURRENT_TIMESTAMP),
('550e8400-e29b-41d4-a716-446655440015', '550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440010', 5, 'Maravilhoso!', CURRENT_TIMESTAMP);

-- tabela Reserva
INSERT INTO Reserva (id, usuario_id, data_reserva, status) VALUES
('550e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440001', CURRENT_TIMESTAMP, 'confirmada'),
('550e8400-e29b-41d4-a716-446655440017', '550e8400-e29b-41d4-a716-446655440002', CURRENT_TIMESTAMP, 'pendente'),
('550e8400-e29b-41d4-a716-446655440018', '550e8400-e29b-41d4-a716-446655440003', CURRENT_TIMESTAMP, 'confirmada'),
('550e8400-e29b-41d4-a716-446655440019', '550e8400-e29b-41d4-a716-446655440004', CURRENT_TIMESTAMP, 'cancelada'),
('550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440005', CURRENT_TIMESTAMP, 'confirmada');

-- tabela Viagem
INSERT INTO Viagem (id, data_inicio, data_fim, preco_total) VALUES
('550e8400-e29b-41d4-a716-446655440021', '2024-10-01', '2024-10-10', 3000.00),
('550e8400-e29b-41d4-a716-446655440022', '2024-11-01', '2024-11-15', 4500.00),
('550e8400-e29b-41d4-a716-446655440023', '2024-12-01', '2024-12-10', 5000.00),
('550e8400-e29b-41d4-a716-446655440024', '2024-09-15', '2024-09-25', 4000.00),
('550e8400-e29b-41d4-a716-446655440025', '2024-08-01', '2024-08-10', 3500.00);

-- tabela Itinerario
INSERT INTO Itinerario (id, viagem_id, dia, descricao) VALUES
('550e8400-e29b-41d4-a716-446655440026', '550e8400-e29b-41d4-a716-446655440021', 1, 'Chegada a Paris'),
('550e8400-e29b-41d4-a716-446655440027', '550e8400-e29b-41d4-a716-446655440022', 1, 'Chegada ao Rio de Janeiro'),
('550e8400-e29b-41d4-a716-446655440028', '550e8400-e29b-41d4-a716-446655440023', 1, 'Visita à Times Square'),
('550e8400-e29b-41d4-a716-446655440029', '550e8400-e29b-41d4-a716-446655440024', 1, 'Exploração de Shibuya'),
('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440025', 1, 'Passeio na Sydney Opera House');

-- tabela Hospedagem
INSERT INTO Hospedagem (id, nome, localizacao, preco_noite) VALUES
('550e8400-e29b-41d4-a716-446655440031', 'Hotel Paris', 'Centro de Paris', 150.00),
('550e8400-e29b-41d4-a716-446655440032', 'Hotel Rio', 'Copacabana', 200.00),
('550e8400-e29b-41d4-a716-446655440033', 'Hotel NY', 'Manhattan', 250.00),
('550e8400-e29b-41d4-a716-446655440034', 'Hotel Tokyo', 'Shinjuku', 180.00),
('550e8400-e29b-41d4-a716-446655440035', 'Hotel Sydney', 'Darling Harbour', 220.00);

-- tabela Transporte
INSERT INTO Transporte (id, tipo, descricao, preco) VALUES
('550e8400-e29b-41d4-a716-446655440036', 'Aéreo', 'Voo para Paris', 1000.00),
('550e8400-e29b-41d4-a716-446655440037', 'Aéreo', 'Voo para Rio de Janeiro', 800.00),
('550e8400-e29b-41d4-a716-446655440038', 'Aéreo', 'Voo para Nova York', 1200.00),
('550e8400-e29b-41d4-a716-446655440039', 'Aéreo', 'Voo para Tóquio', 1500.00),
('550e8400-e29b-41d4-a716-446655440040', 'Aéreo', 'Voo para Sydney', 1300.00);

-- tabela Itinerario_Hospedagem
INSERT INTO Itinerario_Hospedagem (itinerario_id, hospedagem_id) VALUES
('550e8400-e29b-41d4-a716-446655440026', '550e8400-e29b-41d4-a716-446655440031'),
('550e8400-e29b-41d4-a716-446655440027', '550e8400-e29b-41d4-a716-446655440032'),
('550e8400-e29b-41d4-a716-446655440028', '550e8400-e29b-41d4-a716-446655440033'),
('550e8400-e29b-41d4-a716-446655440029', '550e8400-e29b-41d4-a716-446655440034'),
('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440035');

-- tabela Itinerario_Transporte
INSERT INTO Itinerario_Transporte (itinerario_id, transporte_id) VALUES
('550e8400-e29b-41d4-a716-446655440026', '550e8400-e29b-41d4-a716-446655440036'),
('550e8400-e29b-41d4-a716-446655440027', '550e8400-e29b-41d4-a716-446655440037'),
('550e8400-e29b-41d4-a716-446655440028', '550e8400-e29b-41d4-a716-446655440038'),
('550e8400-e29b-41d4-a716-446655440029', '550e8400-e29b-41d4-a716-446655440039'),
('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440040');

-- tabela Pagamento
INSERT INTO Pagamento (id, reserva_id, metodo_pagamento, valor_pago, data_pagamento) VALUES
('550e8400-e29b-41d4-a716-446655440060', '550e8400-e29b-41d4-a716-446655440016', 'Cartão de Crédito', 250.00, '2024-09-01T12:00:00Z'),
('550e8400-e29b-41d4-a716-446655440061', '550e8400-e29b-41d4-a716-446655440017', 'Boleto Bancário', 180.00, '2024-09-02T14:00:00Z'),
('550e8400-e29b-41d4-a716-446655440062', '550e8400-e29b-41d4-a716-446655440018', 'Transferência Bancária', 320.00, '2024-09-03T16:00:00Z'),
('550e8400-e29b-41d4-a716-446655440063', '550e8400-e29b-41d4-a716-446655440019', 'Cartão de Débito', 150.00, '2024-09-04T18:00:00Z'),
('550e8400-e29b-41d4-a716-446655440064', '550e8400-e29b-41d4-a716-446655440020', 'PayPal', 275.00, '2024-09-05T10:00:00Z');

-- tabela Reserva_Viagem
INSERT INTO Reserva_Viagem (reserva_id, viagem_id) VALUES
('550e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440021'),
('550e8400-e29b-41d4-a716-446655440017', '550e8400-e29b-41d4-a716-446655440022'),
('550e8400-e29b-41d4-a716-446655440018', '550e8400-e29b-41d4-a716-446655440023'),
('550e8400-e29b-41d4-a716-446655440019', '550e8400-e29b-41d4-a716-446655440024'),
('550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440025');

-- tabela Pacote_turistico
INSERT INTO Pacote_turistico (id, nome, descricao, preco_base, destino_id) VALUES
('550e8400-e29b-41d4-a716-446655440065', 'Pacote A', 'Pacote turístico para praias brasileiras', 1200.00, '550e8400-e29b-41d4-a716-446655440007'),
('550e8400-e29b-41d4-a716-446655440066', 'Pacote B', 'Pacote de aventura na França', 1500.00, '550e8400-e29b-41d4-a716-446655440006'),
('550e8400-e29b-41d4-a716-446655440067', 'Pacote C', 'Tour cultural por Tóquio', 1000.00, '550e8400-e29b-41d4-a716-446655440009'),
('550e8400-e29b-41d4-a716-446655440068', 'Pacote D', 'Exploração gastronômica em Sydney', 1100.00, '550e8400-e29b-41d4-a716-446655440010'),
('550e8400-e29b-41d4-a716-446655440069', 'Pacote E', 'Escapada romântica para Nova York', 900.00, '550e8400-e29b-41d4-a716-446655440008');

