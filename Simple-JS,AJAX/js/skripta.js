var upozorenje = {
	kartica: ["Master", "Visa"],
	gotovina: "Prazno polje"
};


function praznoPolje(polje, text){

	if(polje.value.trim() == ""){
		alert(text);
		return false;
	}

	return true;
};


function validacija(forma){
//uslovi

	if(praznoPolje(forma.ime, "Niste uneli ime") == false){
		forma.ime.focus();
		return false;
	}

	if(praznoPolje(forma.prezime, "Niste uneli prezime") == false){
		forma.prezime.focus();
		return false;
	}

	if(praznoPolje(forma.email, "Niste uneli e-mail") == false){
		forma.email.focus();
		return false;
	}

	if(praznoPolje(forma.nacin, "Morate izabrati nacin placanja") == false){
		forma.nacin.focus();
		return false;
	}

	if(praznoPolje(forma.tip, "Morate izabrati tip placanja") == false){
		forma.tip.focus();
		return false;
	}

	
	if(forma.nacin.value == "Kartica" && forma.tip.value == "Prazno"){
			alert("Molim Vas odaberite neku od ponudjenih kartica!");
			return false;

	} else if (forma.nacin.value == "Gotovina" && (forma.tip.value == "Visa" || forma.tip.value == "Master")){
			alert("Za gotovinu, molim Vas odaberite prazno polje!");
			return false;
	}

	if(flag == 1){
		if(praznoPolje(forma.code, "Morate uneti validacioni kod za karticu!") == false){
			forma.code.focus();
			return false;
		} else if (Number(forma.code.value.length) !=3){
			alert("Kod mora sadrzati 3 broja!");
			forma.code.focus();
			return false;
		}
	}

	if(flag == 2){ 
		if(praznoPolje(forma.valuta, "Polje valuta je prazno!") == false){
			forma.valuta.focus();
			return false;

		} else if (Number(forma.valuta.value.length) <2 || forma.valuta.value != forma.valuta.value.toUpperCase()){
				alert("Polje valuta nije ispravno(exp.'RSD')!");
				forma.valuta.focus();
				return false;
			}

		}


		return true;
};


function upisi(opt){
		
	if(opt.value == "Kartica"){
		document.getElementById("select_tip").childNodes[1].innerHTML = upozorenje.kartica[0]+ ", "+upozorenje.kartica[1];

	} else if(opt.value == "Gotovina"){
			document.getElementById("select_tip").childNodes[1].innerHTML = upozorenje.gotovina;
	
	}
	
};

var flag = 0;
function ubaciPolje(opt){
	var f = document.querySelector('form div.form-group select.form-control');	

	var list=document.getElementById("idg");
	if(list!=null)
		list.parentNode.removeChild(list);
		
	var grupa = document.createElement("div");
	grupa.setAttribute = "class";
	grupa.className = "form-group";
	grupa.id = "idg";
	f.parentNode.appendChild(grupa);

	var labela = document.createElement("label");
	var inpV = document.createElement("input");
	inpV.className = "form-control";
	inpV.type = "text";


	if(opt.value == "Gotovina"){ 
		
		labela.innerHTML = "Valuta:";
		inpV.name = "valuta";	
		inpV.id = "valuta";

		grupa.appendChild(labela);
		grupa.appendChild(inpV);

		flag = 2;
	
	}
	else if(opt.value == "Kartica"){
	
		labela.innerHTML = "Validation Code:";
		inpV.name = "code";	
		inpV.id = "code";

		grupa.appendChild(labela);
		grupa.appendChild(inpV);

		flag = 1;
	}

};// kraj




























/*
function ubaciPolje(opt){
	var divs = document.getElementsByClassName('form-group');
	var f = document.querySelector('form div.form-group select.form-control');
		
	var grupa = document.createElement("div");
	grupa.setAttribute = "class";
	grupa.className = "form-group";
	f.parentNode.appendChild(grupa);

	var labela = document.createElement("label");
	
	var inpV = document.createElement("input");
	inpV.className = "form-control";
	inpV.type = "text";

	if(opt.value == "Gotovina"){ 
		
		labela.innerHTML = "Valuta:";
		inpV.name = "valuta";	
		inpV.id = "valuta";

		grupa.appendChild(labela);
		grupa.appendChild(inpV);
	
	}
	else if(opt.value == "Kartica"){
	
		labela.innerHTML = "Validation Code:";
		inpV.name = "code";	
		inpV.id = "code";

		grupa.appendChild(labela);
		grupa.appendChild(inpV);
	
}
*/


