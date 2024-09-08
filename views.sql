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