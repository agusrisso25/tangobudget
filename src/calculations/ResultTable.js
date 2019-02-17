/* Este bloque tiene como funcionalidad desplegar los resultados de los cálculos en forma de tabla dinámica
Se deben pasar los siguientes valores:
hayLOS: Corresponde a saber si existe linea de vista entre la antena Tx y Rx
perdidasFSL: Valor calculado de la pérdidas de espacio libre
disp_canal: La disponibilidad calculada
AnguloTilt: Angulo de inclinación calculado
*/

function Resultados(perdidasFSL,disp_canalLL,disp_canalMC,disp_canalTOT,enlace,AnguloTilt,Gtx,Grx,Ptx,Prx,MargenFading,sensRX,distancia,perdidasLluvia,perdidasConectores,perdidasOtras){

	var despejefinal;
	var htx=altura[0].toFixed(2) +" metros";
	var hrx=altura[altura.length-1].toFixed(2) +" metros";
	var dimensionestx=document.getElementById("dimensionestx").value;
	var dimensionesrx=document.getElementById("dimensionesrx").value;
	var pol=parseNumber(document.getElementById("polarizacion").value);

	if(enlace==1){
		enlace="Enlace aceptable";
	}
	else {
		enlace="Enlace no aceptable";
	}

	if(pol==1)
		pol="Vertical";
	else
		pol="Horizontal";


	if(fresnelGlobal==0)
	{
		despejefinal="Mayor o igual a 60%";
	}
	else if(fresnelGlobal==1){
		despejefinal="Entre el 40% y 60%";
	}
	else {
		despejefinal="No hay despeje de Fresnel";
	}

	var totPerdidas=perdidasFSL+perdidasLluvia+perdidasOtras+perdidasConectores;

	var obj = [
		{
			name: "Altura total del Transmisor (m) ",
			value: htx
		},
		{
			name: "Altura total del Receptor (m) ",
			value: hrx
		},
		{
			name: "Ganancia del Transmisor (dBi)",
			value: Gtx
		},
		{
			name: "Ganancia del Receptor (dBi) ",
			value: Grx
		},
		{
			name: "Potencia del Transmisor (dBm) ",
			value: Ptx
		},
		{
			name: "Potencia del Receptor (dBm)",
			value: Prx.toFixed(2)
		},
		{
			name: "Angulo Tilt (grados)",
			value: AnguloTilt.toFixed(3)
		},
		{
			name: "Sensibilidad de Recepción (dBm) ",
			value: sensRX
		},
		{
			name: "Frecuencia (GHz) ",
			value: Inputfreq
		},
		{
			name: "Largo del camino (Km) ",
			value: distancia.toFixed(4)
		},
		{
			name: "Polarizacion ",
			value: pol
		},
		{
	    name: "Perdidas de Espacio Libre (dB)",
	    value: perdidasFSL.toFixed(3)
	  },
		{
	    name: "Perdidas por Fading (dB)",
	    value: MargenFading.toFixed(3)
	  },
		{
	    name: "Perdidas por Lluvia (dB)",
	    value: perdidasLluvia.toFixed(3)
	  },
		{
	    name: "Perdidas de Conectores (dB)",
	    value: perdidasConectores.toFixed(2)
	  },
		{
	    name: "Otras Perdidas (dB)",
	    value: perdidasOtras.toFixed(2)
	  },
		{
	    name: "TOTAL DE PERDIDAS (dB)",
	    value: totPerdidas.toFixed(3)
	  },
		{
	    name: "Hay linea de vista?",
	    value: hayLOS
	  },
		{
	    name: "Despeje de Fresnel",
	    value: despejefinal
	  },
		{
	    name: "Disponibilidad de Canal Multi Camino (%)",
	    value: disp_canalMC
	  },
		{
	    name: "Disponibilidad de Canal por lluvia (%)",
	    value: disp_canalLL
	  },
	  {
	    name: "Disponibilidad de Canal (%)",
	    value: disp_canalTOT
	  },
		{
	    name: "Viabilidad del enlace",
	    value: enlace
	  }

	];

	function populateTable(obj) {
	  var report = document.getElementById('result_table');

	  // Limpiar tabla antes de agregar datos
	  report.innerHTML = '';

	  // Por cada elemento agregar una fila con dos columnas. Una para el nombre y otra para el valor
	  for (var i = 0; i < Object.keys(obj).length; i++) {
	    var tr = "<tr><td>" + obj[i].name + "</td><td>" + obj[i].value + "</td></tr>";
	    report.innerHTML += tr;
	  }
	}

	populateTable(obj);
}
