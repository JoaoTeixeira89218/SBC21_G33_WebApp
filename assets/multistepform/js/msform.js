
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches


$(".next").click(function () {
	var btn = $(this)[0].id;

	if (btn == "orderType") TIPO = getTIPO();
	if (TIPO == null) return;

	if (btn == "orderAge") IDADE = getIDADE();
	if (IDADE == null) return;

	if (btn == "orderPrice") PRECO = getPRECO();
	if (PRECO == undefined) return;

	if (btn == "orderSpirit") ESPIRITO = getESPIRITO();
	if (ESPIRITO == undefined) return;

	if (btn == "orderClassification") CLASSIFICACAO = getCLASSIFICACAO();
	if (CLASSIFICACAO == undefined) return;

	if (btn == "orderCategory") CATEGORIA = getCATEGORIA();
	if (CATEGORIA == undefined) return;


	if (animating) return false;
	animating = true;

	current_fs = $(this).parent();
	next_fs = $(this).parent().next();

	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

	//show the next fieldset
	next_fs.show();
	//hide the current fieldset with style
	current_fs.animate({ opacity: 0 }, {
		step: function (now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50) + "%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
				'transform': 'scale(' + scale + ')',
				'position': 'absolute'
			});
			next_fs.css({ 'left': left, 'opacity': opacity });
		},
		duration: 800,
		complete: function () {
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});


$(".previous").click(function () {
	if (animating) return false;
	animating = true;

	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();

	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

	//show the previous fieldset
	previous_fs.show();
	//hide the current fieldset with style
	current_fs.animate({ opacity: 0 }, {
		step: function (now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1 - now) * 50) + "%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({ 'left': left });
			previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
		},
		duration: 800,
		complete: function () {
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

//******************************************************************************************************************************************** */

const recomendationOption = document.getElementById("recomendationOption");
recomendationOption.addEventListener("click", () => {
	OPCAO = getOPCAO();
	if (OPCAO == null) return;
	document.getElementById("optionSection").style.display = 'none';
	document.getElementById("questionsSection_A1").style.display = 'block';
})

const recomendationOptionPrevious = document.getElementById("recomendationOptionPrevious");
recomendationOptionPrevious.addEventListener("click", () => {
	document.getElementById("questionsSection_A1").style.display = 'none';
	document.getElementById("optionSection").style.display = 'flex';
})

//Select option of order  (imagens)
$(document).on('click', '.optionArea', function () {
	var element = $(this)[0].children[0];
	if ($(".optionAreaSelected")[0]) {
		if (element.classList.contains('optionAreaSelected')) {
			element.classList.remove('optionAreaSelected')
		} else {
			$(".optionAreaSelected")[0].classList.remove("optionAreaSelected");
			element.classList.add('optionAreaSelected');
		}
	} else {
		element.classList.add('optionAreaSelected');
	}
});


//Select type of order  (imagens)
$(document).on('click', '.typeArea', function () {
	var element = $(this)[0].children[0];
	if ($(".typeAreaSelected")[0]) {
		if (element.classList.contains('typeAreaSelected')) {
			element.classList.remove('typeAreaSelected')
		} else {
			$(".typeAreaSelected")[0].classList.remove("typeAreaSelected");;
			element.classList.add('typeAreaSelected');
		}
	} else {
		element.classList.add('typeAreaSelected');
	}
});


//Select drink of order  (imagens)
$(document).on('click', '.drinkArea', function () {
	var element = $(this)[0].children[0];
	if ($(".drinkAreaSelected")[0]) {
		if (element.classList.contains('drinkAreaSelected')) {
			element.classList.remove('drinkAreaSelected')
		} else {
			$(".drinkAreaSelected")[0].classList.remove("drinkAreaSelected");
			element.classList.add('drinkAreaSelected');
		}
	} else {
		element.classList.add('drinkAreaSelected');
	}
});


//Select category of order  (imagens)
$(document).on('click', '.categoryArea', function () {
	var element = $(this)[0].children[0];
	if ($(".categoryAreaSelected")[0]) {
		if (element.classList.contains('categoryAreaSelected')) {
			element.classList.remove('categoryAreaSelected')
		} else {
			$(".categoryAreaSelected")[0].classList.remove("categoryAreaSelected");
			element.classList.add('categoryAreaSelected');
		}
	} else {
		element.classList.add('categoryAreaSelected');
	}
});

let OPCAO = "";
let pedido = {}
let TIPO = "";
let PRECO = "";
let IDADE = "";
let CLASSIFICACAO = "";
let CATEGORIA = "";
let ESPIRITO = "";
let BEBIDA = "";

function loadJSON_A1() {
	pedido.tipo = TIPO;
	pedido.preco = PRECO;
	pedido.idade = IDADE;
	pedido.classificacao = CLASSIFICACAO;
	pedido.categoria = CATEGORIA;
	pedido.espirito = ESPIRITO;
	pedido.bebida = BEBIDA;
}

function loadJSON_A2() {
	pedido.tipo = TIPO;
	pedido.preco = PRECO;
	pedido.idade = IDADE;
	pedido.classificacao = CLASSIFICACAO;
	pedido.categoria = CATEGORIA;
	pedido.espirito = ESPIRITO;
	pedido.bebida = BEBIDA;
}

function loadDuration() {
	const durationArea = $("#durationArea .container2 input")
	const durationAreaName = $("#durationArea .container2 div")

	if (TIPO == "entregar") {
		durationArea[0].value = "duracao_e_0_20";
		durationAreaName[0].innerHTML = "Até 20 minutos";

		durationArea[1].value = "duracao_e_21_29";
		durationAreaName[1].innerHTML = "Entre 21 a 29 minutos";

		durationArea[2].value = "duracao_e_>=30";
		durationAreaName[2].innerHTML = "A partir de 30 minutos";

	} else if (TIPO == "levantar") {
		durationArea[0].value = "duracao_l_0_10";
		durationAreaName[0].innerHTML = "Até 10 minutos";

		durationArea[1].value = "duracao_l_11_20";
		durationAreaName[1].innerHTML = "Entre 11 a 20 minutos";

		durationArea[2].value = "duracao_l_>20";
		durationAreaName[2].innerHTML = "A partir de 21 minutos";
	}
}

function getOPCAO() {
	const type = document.getElementsByClassName("optionAreaSelected");
	if (type[0] == undefined) {
		document.getElementById("optionError").hidden = false;
		setTimeout(function () {
			document.getElementById("optionError").hidden = true;
		}, 2000);
		return
	}
	return type[0].id;
}

function getTIPO() {
	const type = document.getElementsByClassName("typeAreaSelected");
	if (type[0] == undefined) {
		document.getElementById("typeError").hidden = false;
		setTimeout(function () {
			document.getElementById("typeError").hidden = true;
		}, 2000);
		return
	}
	return type[0].id;
}

//Get order price
function getIDADE() {
	var checkRadio = document.querySelector('input[name="age"]:checked');
	if (checkRadio != null) return checkRadio.value;
	document.getElementById("ageError").hidden = false;
	setTimeout(function () {
		document.getElementById("ageError").hidden = true;
	}, 2000);
}

//Get order price
function getPRECO() {
	var checkRadio = document.querySelector('input[name="price"]:checked');
	if (checkRadio != null) return checkRadio.value;
	document.getElementById("priceError").hidden = false;
	setTimeout(function () {
		document.getElementById("priceError").hidden = true;
	}, 2000);
}

//Get client spirit
function getESPIRITO() {
	var checkRadio = document.querySelector('input[name="spirit"]:checked');
	if (checkRadio != null) return checkRadio.value;
	document.getElementById("spiritError").hidden = false;
	setTimeout(function () {
		document.getElementById("spiritError").hidden = true;
	}, 2000);
}

//Get classification
function getCLASSIFICACAO() {
	var checkRadio = document.querySelector('input[name="classification"]:checked');
	if (checkRadio != null) return checkRadio.value;
	document.getElementById("classificationError").hidden = false;
	setTimeout(function () {
		document.getElementById("classificationError").hidden = true;
	}, 2000);
}

function getCATEGORIA() {
	const type = document.getElementsByClassName("categoryAreaSelected");
	if (type[0] == undefined) {
		document.getElementById("categoryError").hidden = false;
		setTimeout(function () {
			document.getElementById("categoryError").hidden = true;
		}, 2000);
		return
	}
	return type[0].id;
}


function getBEBIDA() {
	const type = document.getElementsByClassName("drinkAreaSelected");
	if (type[0] == undefined) {
		document.getElementById("drinkError").hidden = false;
		setTimeout(function () {
			document.getElementById("drinkError").hidden = true;
		}, 2000);
		return
	}
	return type[0].id;
}

//Submit
$("#orderDrink").click(function () {
	var btn = $(this)[0].id;
	if (btn == "orderDrink") BEBIDA = getBEBIDA();
	if (BEBIDA == undefined) return

	if (OPCAO == 'conhecimento_manual')	loadJSON_A1(); submeterPedidoManual();
	if (OPCAO == 'conhecimento_automatico')loadJSON_A2(); submeterPedidoAuto();
})


//back
$("#backBtn").click(function (evt) {
	evt.preventDefault();
	location.reload();
})

//Fetch Headers
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//Fetch requestOptions
const requestOptions = {
	mode: 'cors',
	method: 'GET',
	redirect: 'follow'
};


//Conhecimento Manual
async function submeterPedidoManual() {
	let conteudo = "";
	console.log(pedido);

	document.getElementById("questionsSection_A1").style.display = "none";
	document.getElementById("processingSection").style.display = 'flex';

	//Fetch
	//fetch('http://127.0.0.1:8080/api/tarefa-a1/query?tipo=entregar&preco=preco_0_7&idade=idade_1829&estado_espirito=apressado&classificacao=classificacao_46_47&categoria=carnes&bebida=bebida_nao_incluida', requestOptions)
	fetch("http://127.0.0.1:8080/api/tarefa-a1/query?tipo=" + pedido.tipo + "&preco=" + pedido.preco + "&idade=" + pedido.idade + "&espirito=" + pedido.espirito +"&classificacao=" + pedido.classificacao + "&categoria=" + pedido.categoria + "&bebida=" + pedido.bebida, requestOptions)
		.then(response => response.text())
		.then(result => {
			console.log(JSON.parse(result));

			for (const recomendacao of JSON.parse(result)) {
				conteudo += "<tr><td><img class='imgResult' src='" + recomendacao.imagem + "'></td>";
				conteudo += "<td>" + recomendacao.nome + "</td>";
				conteudo += "<td>" + recomendacao.categoria + "</td>";
				conteudo += "<td>" + recomendacao.restaurante + "</td>";
				conteudo += "<td>" + recomendacao.duracaoMin + " a " + recomendacao.duracaoMax + "</td>";
				conteudo += "<td>" + recomendacao.preco + " €</td>";
				conteudo += "<td>" + recomendacao.localizacao + "</td></tr>";
			}
			document.getElementById("showResult").innerHTML = conteudo;
			document.getElementById("processingSection").style.display = 'none';
			document.getElementById("answersSection_A1").style.display = "flex";

		}).catch(error => {
			document.getElementById("processingSection").style.display = 'none';
			document.getElementById("questionsSection_A1").style.display = "block";
			console.log('error', error)
		});
}

//Conhecimento Automático
async function submeterPedidoAuto() {
	console.log("ola")

}