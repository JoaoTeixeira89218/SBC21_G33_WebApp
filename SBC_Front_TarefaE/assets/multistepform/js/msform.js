
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

//******************************************************************************************************************************************** */

//Variables
let FETCH = "";
let OBJETIVO = "";
let NUMDEST = "";

//Fetch Headers
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//Fetch requestOptions
const requestOptions = {
	mode: 'cors',
	method: 'GET',
	redirect: 'follow'
};

//Display none of the options area and show the questions area
const solutionOption = document.getElementById("solutionOption");
solutionOption.addEventListener("click", () => {
	OPCAO = getOPCAO();
	if (OPCAO == null) return;

	document.getElementById("optionSection").style.display = 'none';
	document.getElementById("questionsSection").style.display = 'flex';

})


//Select option 
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


//Get option selected
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

//Get objective selected
function getOBJETIVO() {
	var checkRadio = document.querySelector('input[name="objective"]:checked');
	if (checkRadio != null) return checkRadio.value;
	document.getElementById("objectiveError").hidden = false;
	setTimeout(function () {
		document.getElementById("objectiveError").hidden = true;
	}, 2000);
}

//Get number of clients selected
function getNUMDEST() {
	var checkRadio = document.querySelector('input[name="numberDest"]:checked');
	if (checkRadio != null) return checkRadio.value;
	document.getElementById("NumError").hidden = false;
	setTimeout(function () {
		document.getElementById("NumError").hidden = true;
	}, 2000);
}


//Display none of the questions area and show the options area
$(".solutionOptionPrevious").click(function () {
	document.getElementById("questionsSection").style.display = 'none';
	document.getElementById("optionSection").style.display = 'flex';
});

//Submit
$("#submitExtra").click(function () {
	var btn = $(this)[0].id;

	if (btn == "submitExtra") {
		OBJETIVO = getOBJETIVO();
		NUMDEST = getNUMDEST();
	}
	if (OBJETIVO == null) return;
	if (NUMDEST == null) return;

	ExtraHillClimbing();
})

//back
$(".backBtn").click(function (evt) {
	evt.preventDefault();
	location.reload();
})

//Back to questionnaire
$("#backBtn").click(function (evt) {
	evt.preventDefault();
	document.getElementById("NoAnswersSection").style.display = 'none';
	document.getElementById("questionsSection").style.display = "flex";
	document.getElementById("showLucro").hidden = false;
	document.getElementById("showValor").hidden = false;

})


//ExtraHillClimbing
async function ExtraHillClimbing() {
	console.log(OBJETIVO)

	document.getElementById("questionsSection").style.display = "none";
	document.getElementById("processingSection").style.display = 'flex';

	if (NUMDEST == 1) FETCH = `http://127.0.0.1:8080/api/tarefa-b2-extra-obj1/query?metodo=${OBJETIVO}`;
	if (NUMDEST == 2) FETCH = `http://127.0.0.1:8080/api/tarefa-b2-extra-obj2/query?metodo=${OBJETIVO}`;

	//Fetch
	fetch(FETCH, requestOptions)
		.then(response => response.json())
		.then(result => {
			console.log(result);
			preencherImagem(result.caminho);
			document.getElementById("caminhoS2").innerHTML = result.caminho.join(' -> ');
			document.getElementById("objetivoS").innerHTML = OBJETIVO;
			document.getElementById("clienteS").innerHTML = result.cliente.join(' e ');

			switch (OBJETIVO) {
				case 'lucro':
					document.getElementById("showLucro").hidden = false;
					document.getElementById("lucroS2").innerHTML = result.totaleval + " €";
					break;
				case 'ambos':
					document.getElementById("showValor").hidden = false;
					document.getElementById("valorS2").innerHTML = result.totaleval;
					break;
			}
			document.getElementById("processingSection").style.display = 'none';
			document.getElementById("answersSection").style.display = "flex";

		}).catch(error => {
			document.getElementById("processingSection").style.display = 'none';
			document.getElementById("NoAnswersSection").style.display = "flex";
			console.log('error', error);
		});
}


function preencherImagem(caminho) {
	const arr = caminho;
	for (let i = 0; i < arr.length; i++) {
		if (i + 1 >= arr.length) return;
		if ((arr[i] == "restaurante" && arr[i + 1] == "cliente1") || (arr[i + 1] == "restaurante" && arr[i] == "cliente1")) {
			// mostrar imagem 1
			document.getElementsByClassName("Moleza1")[0].hidden = false;
			console.log("1");
		}
		if ((arr[i] == "restaurante" && arr[i + 1] == "cliente4") || (arr[i + 1] == "restaurante" && arr[i] == "cliente4")) {
			// mostrar imagem 3
			document.getElementsByClassName("Moleza3")[0].hidden = false;
			console.log("3");
		}
		if ((arr[i] == "cliente1" && arr[i + 1] == "cliente2") || arr[i + 1] == "cliente1" && arr[i] == "cliente2") {
			// mostrar imagem 5
			document.getElementsByClassName("Moleza5")[0].hidden = false;
			console.log("5");
		}
		if ((arr[i] == "cliente1" && arr[i + 1] == "cliente4") || (arr[i + 1] == "cliente1" && arr[i] == "cliente4")) {
			// mostrar imagem 2
			document.getElementsByClassName("Moleza2")[0].hidden = false;
			console.log("2");
		}
		if ((arr[i] == "cliente1" && arr[i + 1] == "cliente5") || (arr[i + 1] == "cliente1" && arr[i] == "cliente5")) {
			// mostrar imagem 4
			document.getElementsByClassName("Moleza4")[0].hidden = false;
			console.log("4");
		}
		if ((arr[i] == "cliente2" && arr[i + 1] == "cliente4") || (arr[i + 1] == "cliente2" && arr[i] == "cliente4")) {
			// mostrar imagem 6
			document.getElementsByClassName("Moleza6")[0].hidden = false;
			console.log("6");
		}
		if ((arr[i] == "cliente2" && arr[i + 1] == "cliente5") || (arr[i + 1] == "cliente2" && arr[i] == "cliente5")) {
			// mostrar imagem 8
			document.getElementsByClassName("Moleza8")[0].hidden = false;
			console.log("8");
		}
		if ((arr[i] == "cliente2" && arr[i + 1] == "cliente3") || (arr[i + 1] == "cliente2" && arr[i] == "cliente3")) {
			// mostrar imagem 9
			document.getElementsByClassName("Moleza9")[0].hidden = false;
			console.log("9");
		}
		if ((arr[i] == "cliente3" && arr[i + 1] == "cliente4") || (arr[i + 1] == "cliente3" && arr[i] == "cliente4")) {
			// mostrar imagem 10
			document.getElementsByClassName("Moleza10")[0].hidden = false;
			console.log("10");
		}
		if ((arr[i] == "cliente3" && arr[i + 1] == "cliente5") || (arr[i + 1] == "cliente3" && arr[i] == "cliente5")) {
			// mostrar imagem 7
			document.getElementsByClassName("Moleza7")[0].hidden = false;
			console.log("7");
		}
	}
}