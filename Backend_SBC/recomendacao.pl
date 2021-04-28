:-dynamic(fact/1),
[forward, base_dados, base_conhecimento].

:-assert(fact(preco_0_7)), assert(fact(duracao_e_0_20)), assert(fact('classificacao_>47')), assert(fact(carnes)), assert(fact(extras_nao_incluidos)), assert(fact(bebida_nao_incluida)), assert(fact(entregar)).

resultados(OUTPUT):-
	fact(TIPO),
    	fact(PRECO), 
	fact(DURACAO), 
	fact(CLASSIFICACAO), 
	fact(CATEGORIA), 
	fact(EXTRAS), 
	fact(BEBIDA), 
    	(pedido(TIPO, PRECO, DURACAO, CLASSIFICACAO, X, EXTRAS, BEBIDA, OUTPUT), memberchk(CATEGORIA, X)).

resultados(_).

consulta(C):-
    	demo,
    	findall(OUTPUT, resultados(OUTPUT), O1), list_to_set(O1, C).


% demo Vai ver se consegue derivar um novo facto (base de conhecimento), se conseguir vai escrever o facto no ecra e vai armazená-lo dinamicamente através de um assert.