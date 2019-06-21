var calculadora = {

  //Inicialización variables
	screen: document.getElementById("display"),
	botonigual: false,
	valorscreen: "0",
	operacion: "",
	valor1: 0,
	valor2: 0,
	valor3: 0,
	resultado: 0,

	//Function noname aplicar tipo de botón

	init: (function(){
		this.aplicartipodeboton(".tecla");
		this.eventosteclas();
	}),

	//Eventos formato de botones

	aplicartipodeboton: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.eventoReducirBoton;
			x[i].onmouseleave = this.eventoBackBoton;
		};
	},

	eventoReducirBoton: function(event){
		calculadora.ReducirBoton(event.target);
	},

	eventoBackBoton: function(event){
		calculadora.AumentarBoton(event.target);
	},

	//Función AumentarBoton
	AumentarBoton: function(elemento){
		var x = elemento.id;
		if (x=="igual" || x=="0" || x=="1" || x=="2" || x=="3" || x=="punto" ) {
			elemento.style.width = "29%";
			elemento.style.height = "62.7px";
		} else if(x=="mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "22%";
		elemento.style.height = "62.7px";
		}
	},



	//Función Reducir Boton

	ReducirBoton: function(elemento){
		var x = elemento.id;
		if (x=="igual" || x=="0" || x=="1" || x=="2" || x=="3" || x=="punto" ) {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if(x=="mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
		elemento.style.width = "21%";
		elemento.style.height = "62px";
		}
	},


  //Función que verifica los eventos en cada tecla requerida para la operación
	eventosteclas: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.inputnumber("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.inputnumber("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.inputnumber("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.inputnumber("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.inputnumber("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.inputnumber("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.inputnumber("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.inputnumber("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.inputnumber("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.inputnumber("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrarscreen();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.modificarsigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.inputdecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.visualizaroperacion();});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresoOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresoOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresoOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresoOperacion("+");});
	},


  //Borra la pantalla
	borrarscreen: function(){

    this.valorscreen = "0";
		this.operacion = "";
		this.valor1 = 0;
		this.valor2 = 0;
		this.resultado = 0;
		this.Operación = "";
		this.botonigual = false;
		this.valor3 = 0;
		this.screenresult();
	},

  //Signo adelante del numero
	modificarsigno: function(){
		if (this.valorscreen !="0") {
			var aux;
			if (this.valorscreen.charAt(0)=="-") {
				aux = this.valorscreen.slice(1);
			}	else {
				aux = "-" + this.valorscreen;
			}
		this.valorscreen = "";
		this.valorscreen = aux;
		this.screenresult();
		}
	},
   //Trato punto decimal
	 inputdecimal: function(){
		if (this.valorscreen.indexOf(".")== -1) {
			if (this.valorscreen == ""){
				this.valorscreen = this.valorscreen + "0.";
			} else {
				this.valorscreen = this.valorscreen + ".";
			}
			this.screenresult();
		}
	},

	inputnumber: function(valor){
		if (this.valorscreen.length < 8) {

			if (this.valorscreen=="0") {
				this.valorscreen = "";
				this.valorscreen = this.valorscreen + valor;
			} else {
				this.valorscreen = this.valorscreen + valor;
			}
		this.screenresult();
		}
	},

	ingresoOperacion: function(oper){
		this.valor1 = parseFloat(this.valorscreen);
		this.valorscreen = "";
		this.operacion = oper;
		this.botonigual = false;
		this.screenresult();
	},

	visualizaroperacion: function(){

		if(!this.botonigual){
			this.valor2 = parseFloat(this.valorscreen);
			this.valor3 = this.valor2;
			this.calcularoperacion(this.valor1, this.valor2, this.operacion);

		} else {
			this.calcularoperacion(this.valor1, this.valor3, this.operacion);
		}

		this.valor1 = this.resultado;
		this.valorscreen = "";

		if (this.resultado.toString().length < 9){
			this.valorscreen = this.resultado.toString();
		} else {
			this.valorscreen = this.resultado.toString().slice(0,8) + "...";
		}

		this.botonigual = true;
		this.screenresult();

	},

	calcularoperacion: function(valor1, valor2, operacion){
		switch(operacion){
			case "+":
				this.resultado = eval(valor1 + valor2);
			break;
			case "-":
				this.resultado = eval(valor1 - valor2);
			break;
			case "*":
				this.resultado = eval(valor1 * valor2);
			break;
			case "/":
				this.resultado = eval(valor1 / valor2);
			break;
		}
	},

	screenresult: function(){
		this.screen.innerHTML = this.valorscreen;
	}

};

calculadora.init();
