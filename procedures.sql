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


---------------------------------------------------------------
---- Atualiza a descrição do destino com uma classificacao ----
---------------------------------------------------------------

CREATE OR REPLACE PROCEDURE AtualizarClassificacaoDestino()
AS $$
DECLARE
    rec RECORD;
    media_avaliacao NUMERIC(4,2);
    qtd_avaliacoes INT;
    classificacao_destino VARCHAR(20);
BEGIN
    -- Loop através de cada destino
    FOR rec IN (SELECT id FROM destino) LOOP
        -- Calcular a média das notas e a quantidade de avaliações para o destino atual
        SELECT 
            COALESCE(AVG(nota), 0),
            COUNT(*)
        INTO media_avaliacao, qtd_avaliacoes
        FROM avaliacao
        WHERE destino_id = rec.id;
        
        IF qtd_avaliacoes = 0 THEN
            classificacao_destino := 'Sem Avaliações';
        ELSIF media_avaliacao >= 4.5 THEN
            classificacao_destino := 'Excelente';
        ELSIF media_avaliacao >= 3.5 THEN
            classificacao_destino := 'Bom';
        ELSIF media_avaliacao >= 2.5 THEN
            classificacao_destino := 'Regular';
        ELSE
            classificacao_destino := 'Ruim';
        END IF;

        UPDATE destino
        SET descricao = descricao || ' | Classificação: ' || classificacao_destino
        WHERE id = rec.id;
    END LOOP;
    
    RAISE NOTICE 'Classificação dos destinos atualizada com sucesso!';
END;
$$ LANGUAGE plpgsql;

----------------------------------------------------------------
-- Atualiza o preco dos pacotes com base na estação e demanda --
----------------------------------------------------------------

CREATE OR REPLACE PROCEDURE AtualizarPrecoPacotes()
AS $$
DECLARE
    rec RECORD;
    numero_reservas INT;
    novo_preco NUMERIC(10,2);
    ajuste_percentual NUMERIC(5,2);
    data_atual DATE := CURRENT_DATE;
    estacao VARCHAR(10);
BEGIN
    -- Determina a estação do ano
    IF EXTRACT(MONTH FROM data_atual) BETWEEN 12 AND 2 THEN
        estacao := 'Verão';
    ELSIF EXTRACT(MONTH FROM data_atual) BETWEEN 3 AND 5 THEN
        estacao := 'Outono';
    ELSIF EXTRACT(MONTH FROM data_atual) BETWEEN 6 AND 8 THEN
        estacao := 'Inverno';
    ELSE
        estacao := 'Primavera';
    END IF;

    -- Loop através de cada pacote turístico
    FOR rec IN (SELECT id, preco_base, destino_id FROM pacote_turistico) LOOP
        -- Obter o número de reservas para o destino do pacote
        SELECT COUNT(*) INTO numero_reservas
        FROM reserva r
        JOIN reserva_viagem rv ON r.id = rv.reserva_id
        JOIN viagem v ON rv.viagem_id = v.id
        JOIN pacote_turistico pt ON pt.id = v.id 
        WHERE v.data_inicio >= data_atual
          AND r.status = 'Confirmada'
          AND pt.destino_id = rec.destino_id;

        ajuste_percentual := 0;

        -- Aumento de preço por alta demanda
        IF numero_reservas > 100 THEN
            ajuste_percentual := ajuste_percentual + 10;
        ELSIF numero_reservas > 50 THEN
            ajuste_percentual := ajuste_percentual + 5;
        END IF;

        -- Ajuste por estação do ano
        IF estacao = 'Verão' THEN
            ajuste_percentual := ajuste_percentual + 15;
        ELSIF estacao = 'Inverno' THEN
            ajuste_percentual := ajuste_percentual - 10;
        END IF;

        novo_preco := rec.preco_base * (1 + (ajuste_percentual / 100));

        UPDATE pacote_turistico
        SET preco_base = novo_preco
        WHERE id = rec.id;
    END LOOP;

    RAISE NOTICE 'Preços dos pacotes turísticos atualizados com sucesso!';
END;
$$ LANGUAGE plpgsql;
