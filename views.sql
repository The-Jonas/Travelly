--------------------------------------------------------
----- Exibe o número de avaliações de cada destino -----
--------------------------------------------------------

CREATE OR REPLACE VIEW destinos_com_avaliacoes AS
SELECT
    d.nome,
    d.pais,
    d.descricao,
    COUNT(a.id) AS numero_avaliacoes																	 
FROM
    destino d
LEFT JOIN
    avaliacao a ON d.id = a.destino_id
GROUP BY
    d.id;

SELECT * FROM destinos_com_avaliacoes;

--------------------------------------------------------
--- Informações completas usuario_avaliacao_destino ----
--------------------------------------------------------

CREATE OR REPLACE VIEW avaliacoes_completas AS
SELECT
    a.id AS avaliacao_id,
    u.id AS usuario_id,
    u.nome AS usuario_nome,
    u.email AS usuario_email,
    u.data_criacao AS usuario_data_criacao,
    a.destino_id AS destino_id,
    d.nome AS destino_nome,
    d.pais AS destino_pais,
    d.descricao AS destino_descricao,
    a.nota,
    a.comentario,
    a.data_avaliacao
FROM
    avaliacao a
JOIN
    usuario u ON a.usuario_id = u.id
JOIN
    destino d ON a.destino_id = d.id;

SELECT * FROM avaliacoes_completas

------------------------------------------------
--- Exibe informações da nota com o usuario ----
------------------------------------------------

CREATE OR REPLACE VIEW avaliacoes_com_user AS
SELECT
    a.id AS avaliacao_id,
    u.nome AS usuario_nome,
    a.nota,
    a.data_avaliacao
FROM
    avaliacao a
JOIN
    usuario u ON a.usuario_id = u.id;

SELECT * FROM avaliacoes_com_user

-----------------------------------------------------
--- Resume as informaçoes dos Pacotes Turisticos ----
-----------------------------------------------------

CREATE OR REPLACE VIEW resumoPacotesTuristicos AS
SELECT
    pt.id AS pacote_id,
    pt.nome AS nome_pacote,
    pt.descricao AS descricao_pacote,
    pt.preco_base,
    COALESCE(ROUND(AVG(a.nota), 2), 0) AS media_avaliacao
FROM
    pacote_turistico pt
LEFT JOIN
    destino d ON pt.destino_id = d.id
LEFT JOIN
    avaliacao a ON d.id = a.destino_id
GROUP BY
    pt.id, pt.nome, pt.descricao, pt.preco_base;
    
SELECT * FROM resumoPacotesTuristicos

--------------------------------------------------------------
-- Exibe as informaçoes das Reservas com pacotes e usuários --
--------------------------------------------------------------

CREATE OR REPLACE VIEW detalhesReserva AS
SELECT
    r.id AS reserva_id,
    u.nome AS nome_usuario,
    u.email AS email_usuario,
    pt.nome AS nome_pacote,
    v.data_inicio AS data_inicio_viagem,
    v.data_fim AS data_fim_viagem,
    r.data_reserva,
    r.status AS status_reserva
FROM
    reserva r
JOIN
    usuario u ON r.usuario_id = u.id
JOIN
    reserva_viagem rv ON r.id = rv.reserva_id
JOIN
    viagem v ON rv.viagem_id = v.id
JOIN
    pacote_turistico pt ON pt.id = (
        SELECT p.id
        FROM pacote_turistico p
        WHERE p.destino_id = (
            SELECT d.id
            FROM destino d
            WHERE d.id = pt.destino_id
            LIMIT 1
        )
        LIMIT 1
    );

SELECT * FROM detalhesReserva

-----------------------------------------------------
----- Resume as avaliacoes e notas dos destinos -----
-----------------------------------------------------

CREATE OR REPLACE VIEW estatisticasAvaliacoesPorDestino AS
SELECT
    d.id AS destino_id,
    d.nome AS nome_destino,
    COUNT(a.id) AS total_avaliacoes,
    COALESCE(ROUND(AVG(a.nota), 2), 0) AS media_nota
FROM
    destino d
LEFT JOIN
    avaliacao a ON d.id = a.destino_id
GROUP BY
    d.id, d.nome;

SELECT * FROM estatisticasAvaliacoesPorDestino