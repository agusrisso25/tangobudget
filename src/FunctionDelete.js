/* Este bloque elimina todos los marcadores en el array removiendo las referencias a ellos y la polyline */
function deleteMarkersAndPath() {
    markers[0].setMap(null); //elimino el marcador A
    markers[1].setMap(null); //elimino el marcador B
    //Vacío todos los arrays:
    markers = [];
    latitud = [];
    longitud = [];
    camino = []; // NO se borra la elevacion
    elevator = [];
    elevations=[];
    altura = [];
    despeje=[];
    muestra_mod=[];
    data=0;
    contador=0;
    cant_redondeo=0;

    path = poly.setPath([]);  // ELIMINA la poly
    document.getElementById('transmisor').value = "0";
    document.getElementById('receptor').value = "0";
    document.getElementById('alturaantenarx').value = "0";
    document.getElementById('alturaantenatx').value = "0";

    document.getElementById('result3').innerHTML="";
    document.getElementById("Ldevista").innerHTML= "";
    document.getElementById("Fresnel").innerHTML="";
    document.getElementById('result_table').innerHTML="";
    document.getElementById('table_div').innerHTML="";

    document.getElementById('result_table').innerHTML="";
    document.getElementById('link').innerHTML="";
    document.getElementById('elevation_chart').innerHTML="";
    document.getElementById('link').innerHTML="";
}

function resetDrag(){
  altura=[];
  altura2=[];
  hayDespejeCamino=[];
  //getFreq(); //Se recalcula el fresnel del camino
  document.getElementById("alturaantenatx").value = "0"; //Habilita los campos nuevamente
  document.getElementById("alturaantenarx").value = "0";
  despeje=[]; //Se borra array de los despejes de los OI
  muestra_mod=[];

  document.getElementById("elevation_chart").innerHTML = "";
  document.getElementById("Ldevista").innerHTML = "";
  /*for(i=0;i<muestra_mod.length;i++){ //Borro tabla de objetos interferentes
    BorrarFila();
  }*/
  valuetomodify_array=[];
  distanciaobject_array=[];
  contador=0;
}
