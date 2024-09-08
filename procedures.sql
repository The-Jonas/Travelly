----------------------------------------------
-------- Atualiza preço do transporte --------
----------------------------------------------

CREATE OR REPLACE PROCEDURE atualizar_preco_transporte(
	p_id uuid,
	p_novo_preco numeric(10,2)
)
AS $$ 
BEGIN
	UPDATE transporte 
	SET preco = p_novo_preco
	WHERE id = p_id;
END;
$$ LANGUAGE plpgsql; 

---------------------------------------------------------
-------- Atualiza dia do itinerario especificado --------
---------------------------------------------------------

CREATE OR REPLACE PROCEDURE atualizar_dia_itinerario(
    i_id uuid,          																			
    i_novo_dia int      
)
AS $$
BEGIN
    UPDATE itinerario
    SET dia = i_novo_dia
    WHERE id = i_id;
END;
$$ LANGUAGE plpgsql;

------------------------------------------------------------
---- Calcula a média de avaliações do destino informado ----
------------------------------------------------------------


CREATE OR REPLACE PROCEDURE calcular_media_avaliacoes(p_destino_id uuid, OUT media_avaliacoes FLOAT)
AS $$
BEGIN
    SELECT AVG(nota) INTO media_avaliacoes
    FROM avaliacoes
    WHERE destino_id = p_destino_id;