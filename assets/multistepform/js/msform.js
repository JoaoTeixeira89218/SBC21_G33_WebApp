
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches


$(".next").click(function () {
	var btn = $(this)[0].id;
	if (btn == "orderType") TIPO = getTIPO();
	if (TIPO == null) return

	if (btn == "orderPrice") PRECO = getPRECO(); loadDuration();
	if (PRECO == undefined) return

	if (btn == "orderDuration") DURACAO = getDURACAO();
	if (DURACAO == undefined) return

	if (btn == "orderClassification") CLASSIFICACAO = getCLASSIFICACAO();
	if (CLASSIFICACAO == undefined) return

	if (btn == "orderCategory") CATEGORIA = getCATEGORIA();
	if (CATEGORIA == undefined) return

	if (btn == "orderExtra") EXTRAS = getEXTRAS();
	if (EXTRAS == null) return

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


//Select extra of order  (imagens)
$(document).on('click', '.extraArea', function () {
	var element = $(this)[0].children[0];
	if ($(".extraAreaSelected")[0]) {
		if (element.classList.contains('extraAreaSelected')) {
			element.classList.remove('extraAreaSelected')
		} else {
			$(".extraAreaSelected")[0].classList.remove("extraAreaSelected");
			element.classList.add('extraAreaSelected');
		}
	} else {
		element.classList.add('extraAreaSelected');
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


let pedido = {}
let TIPO = "";
let PRECO = "";
let DURACAO = "";
let CLASSIFICACAO = "";
let CATEGORIA = "";
let EXTRAS = "";
let BEBIDA = "";

function loadJSON(pedidoFinal) {
	pedidoFinal.tipo = TIPO;
	pedidoFinal.preco = PRECO;
	pedidoFinal.duracao = DURACAO;
	pedidoFinal.classificacao = CLASSIFICACAO;
	pedidoFinal.categoria = CATEGORIA;
	pedidoFinal.extras = EXTRAS;
	pedidoFinal.bebida = BEBIDA;
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

function getPRECO() {
	var checkRadio = document.querySelector('input[name="price"]:checked');
	return checkRadio.value
}

function getDURACAO() {
	var checkRadio = document.querySelector('input[name="duration"]:checked');
	return checkRadio.value
}

function getCLASSIFICACAO() {
	var checkRadio = document.querySelector('input[name="classification"]:checked');
	return checkRadio.value
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

function getEXTRAS() {
	const type = document.getElementsByClassName("extraAreaSelected");
	if (type[0] == undefined) {
		document.getElementById("extraError").hidden = false;
		setTimeout(function () {
			document.getElementById("extraError").hidden = true;
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

	var pedidoFinal = {};
	loadJSON(pedidoFinal);
	submeterPedido(pedidoFinal);
})

//back
$("#backBtn").click(function (evt) {
	evt.preventDefault();
	location.reload();
})


async function submeterPedido(pedido) {
	let conteudo = "";
	console.log(pedido);

	const data = {
		"tipo": "entregar",
		"preco": "preco_0_7",
		"duracao": "duracao_e_0_20",
		"classificacao": "'classificacao_46_47'",
		"categoria": "carnes",
		"extras": "extras_nao_incluidos",
		"bebida": "bebida_nao_incluida"
	}
	console.log(data)

	document.getElementById("questionsSection").style.display = "none";
	document.getElementById("processinfSection").style.display = 'flex';

	//Fetch Headers
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	//Fetch requestOptions
	const requestOptions = {
		mode: 'cors',
		method: 'GET',
		redirect: 'follow'
	};

	const requestOptions1 = {
		mode: 'cors',
		method: 'POST',
		headers: myHeaders,
		body: JSON.stringify(data),
		credentials: 'include'
	};

	//Fetch
	//fetch('http://127.0.0.1:8080/api/pedido/query?tipo=entregar&preco=preco_0_7&duracao=duracao_e_0_20&classificacao=classificacao_46_47&categoria=carnes&extras=extras_nao_incluidos&bebida=bebida_nao_incluida', requestOptions)
	fetch("http://127.0.0.1:8080/api/pedido/query?tipo=" + pedido.tipo + "&preco=" + pedido.preco + "&duracao=" + pedido.duracao + "&classificacao=" + pedido.classificacao + "&categoria=" + pedido.categoria + "&extras=" + pedido.extras + "&bebida=" + pedido.bebida, requestOptions)
		//fetch('http://127.0.0.1:8080/pedido', requestOptions1)
		.then(response => response.text())
		.then(result => {
			console.log(JSON.parse(result));

			for (const recomendacao of JSON.parse(result)) {
				conteudo += "<tr><td><img class='imgResult' src='" + recomendacao.imagem + "'></td>";
				conteudo += "<td>" + recomendacao.nome + "</td>";
				conteudo += "<td>" + recomendacao.nome + "</td>";
				conteudo += "<td>" + recomendacao.categoria + "</td>";
				conteudo += "<td>" + recomendacao.restaurante + "</td>";
				conteudo += "<td>" + recomendacao.duracaoMin + " a " + recomendacao.duracaoMax + "</td>";
				conteudo += "<td>" + recomendacao.localizacao + "</td></tr>";
			}
			document.getElementById("showResult").innerHTML = conteudo;
			document.getElementById("processinfSection").style.display = 'none';
			document.getElementById("answersSection").style.display = "flex";

		}).catch(error => {
			document.getElementById("processinfSection").style.display = 'none';
			document.getElementById("answersSection").style.display = "flex";
			console.log('error', error)
		});
}