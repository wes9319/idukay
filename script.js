/**
 * Idukay Code Challenge 
 * Quito - Ecuador, 2019
 **/
/*
*App name: Control de Flujo
*Company: Idukay
*Description: Enterprise' warp-drive management software
*Author: Elvis Vasquez
*Author URL: https://wes9319.github.io
*/

//html selectors
var injectorA = document.querySelector("#injectorA");
var injectorB = document.querySelector("#injectorB");
var injectorC = document.querySelector("#injectorC");
var dmgInjectorA = document.querySelector("#dmgInjectorA");
var dmgInjectorB = document.querySelector("#dmgInjectorB");
var dmgInjectorC = document.querySelector("#dmgInjectorC");
var maxWorkingTime = document.querySelector("#maxWorkingTime");
var calculate = document.querySelector("button");
var speed = document.querySelector("#speed");

//variables
var normalCapacity = 100;
var extraCapacityLimit = 99;
var maxSpeed = 0;
var workingTime = 100;
var A = 0;
var B = 0;
var C = 0;
var finalTime = "";

var injectors = [
	{name: "A", flow: 100, damage:0, workingTime: 100, usable: true, maxCapacity: 199, realFlow: 0},
	{name: "B", flow: 100, damage:0, workingTime: 100, usable: true, maxCapacity: 199, realFlow: 0},
	{name: "C", flow: 100, damage:0, workingTime: 100, usable: true, maxCapacity: 199, realFlow: 0}
];

//retrieve and validate inputs
dmgInjectorA.addEventListener("change", function(){
	if (Number(dmgInjectorA.value) <= 99) {
		injectors[0].damage = Number(dmgInjectorA.value);
		injectors[0].usable = true;
	}else{
		injectors[0].damage = 100;	
		injectors[0].usable = false;
		console.log("Alerta !! el inyector " + injectors[0].name+" esta demasiado danado!!")
	}
});

dmgInjectorB.addEventListener("change", function(){
	if (Number(dmgInjectorB.value) <= 99) {
		injectors[1].damage = Number(dmgInjectorB.value);
		injectors[1].usable = true;
	}else{
		injectors[1].damage = 100
		injectors[1].usable = false;
		console.log("Alerta !! el inyector " +injectors[1].name+" esta demasiado danado!!")
	}
});

dmgInjectorC.addEventListener("change", function(){
	if (Number(dmgInjectorC.value) <= 99) {
		injectors[2].damage = Number(dmgInjectorC.value);
		injectors[2].usable = true;
	}else{
		injectors[2].damage = 100;
		injectors[2].usable = false;
		console.log("Alerta !! el inyector " +injectors[2].name+" esta demasiado danado!!")
	}
});

speed.addEventListener("change", function(){
	maxSpeed = Number(speed.value) * 3;
	console.log("Speed= "+maxSpeed)
});

//function to calculate flow based on damage
function flow(){
	for (var i = 0; i < injectors.length; i++) { //calculo de flujo por injector
		if (injectors[i].usable) {
			injectors[i].flow = normalCapacity - injectors[i].damage;
			injectors[i].maxCapacity = injectors[i].flow + extraCapacityLimit;
		}else{
			injectors[i].flow = 0;
			injectors[i].maxCapacity = 0;
			injectors[i].workingTime = 0;
		}
		console.log("Done "+ injectors[i].name);
	}
}

//function to calculate final working time
//@param {number} max
//@returns {string} time 
function maxTime(max){
	if (max<=100) {
		time = "infinito";
	}else{
		time = 200 - max + " minutos";
	}
	return time;
}

//function to find the injector with max damage
function maxFlow(){
	var max = injectors[0].realFlow;
	for (var i = 0; i < injectors.length; i++) {
		if(injectors[i].realFlow > max){
			max = injectors[i].realFlow;
			console.log("max " + max );
		}		
	}
	return max;
}

//Event to run complete calculation
calculate.addEventListener("click", function(){
	var limit=0;
	flow();
	while(maxSpeed > 0){
		if (injectors[0].usable) {
			if (A<(injectors[0].maxCapacity)) {
				A++;
				maxSpeed--;
				console.log("A: " + A);
			}else{
				limit++;
				console.log("A done");
			}
		}
		if (injectors[1].usable) {
			if (B<(injectors[1].maxCapacity)) {
				B++;
				maxSpeed--;
				console.log("B: " + B);
			}else{
				limit++;
				console.log("B done");
			}
		}
		if (injectors[2].usable) {
			if (C<(injectors[2].maxCapacity)) {
				C++;;
				maxSpeed--;
				console.log("C: " + C);
			}else{
				limit++;
				console.log("C done");
			}
		}
		if (limit===3 && 
		(injectors[0].usable &&
		 injectors[1].usable && 
		 injectors[2].usable)==false) {//si ninguno funciona o si se alcanza el limite
			maxSpeed=0;
			A="Unable to complete ";
			B="Unable to complete ";
			C="Unable to complete ";
		}
		var finalSpeed = A+B+C;
	}
	console.log("maxSpeed: " + finalSpeed);

	limit = 0;
	injectors[0].realFlow = A;
	injectors[1].realFlow = B;
	injectors[2].realFlow = C;

	injectorA.textContent = A;
	injectorB.textContent = B;
	injectorC.textContent = C;
	maxWorkingTime.textContent = maxTime(maxFlow());
});