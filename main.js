var botao = document.querySelector(".botao");

botao.addEventListener("click" , function(event){
	event.preventDefault();
	var form = document.querySelector(".juros_comp");
	var valores = valoresDoCalculo(form);
	var mesAno = form.data.value;
	if (mesAno == "mes"){
		var tempo = valores.tempo;
	}else {
		var tempo = valores.tempo * 12;
	}

	var valorInvestido = valores.valorInicial + (valores.valorAplicacao*tempo);
	
	var aplicacao = valores.valorInicial;
	var calcular = 0;
	var juroData = form.juro.value;
	if (juroData == "ano") {
		for (var i = 0; i < tempo; i++){		
			calcular  = aplicacao * Math.pow((1 + (valores.taxa/100)),((1/12)));
			aplicacao = calcular + valores.valorAplicacao;		
		};
	}else{
		for (var i = 0; i < tempo; i++){		
			calcular  = aplicacao * (1 + (valores.taxa/100));
			aplicacao = calcular + valores.valorAplicacao;		
		};
	};
	calcular += valores.valorAplicacao;
	calcular = `${calcular.toFixed(2)}`;
	var juros = calcular - valorInvestido;
	publicarResultado(calcular,valorInvestido,juros);
});

function publicarResultado(calcular,valorInvestido,juros){	
	if (calcular > 0){
		var titulo = 0;
		for (var i = 1 ; i<=3 ; i++){
			titulo = document.querySelector(".titulo_resultado"+`${i}`);
			titulo.classList.remove("invisivel");
		};
		document.querySelector(".valor_investido").textContent = `${valorInvestido.toFixed(2).replace(".",",")}`;
		document.querySelector(".juros").textContent = `${juros.toFixed(2).replace(".",",")}`;
		document.querySelector(".resultado").textContent = calcular.replace(".",",");
	};
};

function valoresDoCalculo(form){
	var valores = {
		valorInicial: parseFloat(form.aplic_inicial.value.replace(",",".")),
		valorAplicacao: parseFloat(form.aplic_mensal.value.replace(",",".")),
		tempo: parseInt(form.tempo.value),
		taxa: parseFloat(form.taxa.value.replace(",",".")),
	};
	return valores;
};