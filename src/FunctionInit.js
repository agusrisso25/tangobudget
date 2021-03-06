/* Esta función declara las variables Globales e inicializa los dos mapas Printable e Interactive
*/
// Cada marcador se etiqueta con un letra alfabetica.
var labels = "TR";
var labelIndex = 0;
var markers = []; // Los marcadores se almacenan en un array.
var latitud = []; //las latitudes se almacenan en un array
var longitud = []; //las longitudes se almacenan en un array
var radius = 6371; // radio de la tierra
var camino = [];
var altura = []; //Array que tiene toda la información del perfil de elevación y sin errores
var altura2 = [];
var coordenadas = [];
var flag=0; //defino este flag para testear caso de uso en displayPathElevation
var muestra_mod=[]; // Nos indica cual es el valor de la muestra que hay que modificar en ModifyHeight
var data; //Información almacenada sobre el perfil de elevación
var chart;
var chartDiv;
var distanciaobject_array=[]; // Nos indica la distancia desde el TX que queremos modificar
var contador=0; //cuenta la cantidad de objetos interferentes agregados
var elevator;
var dist;
var cant_redondeo; //Cuenta la cantidad de muestras que tiene nuestro perfil de elevación
var valuetomodify_array= [];
var elevations;
var data_detabla;
var data_resultados;
var table;
var tableRes;
var hayLOS;
var AlturaIni;
var AlturaFin;
//Creo estos dos arrays para guardar los valores que tienen un despeje de 40% y 60%
var distanciaFresnel=[];
var alturaFresnel=[];
var resFresnel;
var fresnelOI_array=[];
var hayDespejeCamino=[];
var Inputfreq; //Frecuencia que ingresó el usuario en la plataforma
var fresnelGlobal;
var despeje=[];
var result;
var ec2=[];

var APP = { };
APP.objInterferente = null;

// Load the Visualization API and the columnchart package:
google.load("visualization", "1", { packages: ["columnchart"] });
// Inicializo el mapa centrado en un lugar de Montevideo y con su zoom correspondiente
function initMapInteractive() {
  var uluru = { lat: -34.916467, lng: -56.154272 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: uluru
  });

 // var geocoder = new google.maps.Geocoder();// creo que no la usamos para nada
  //var infowindow = new google.maps.InfoWindow;
  // Evento que escucha el click y llama a la funcion addMarkersAndAll() cuando sucede.
  google.maps.event.addListener(map, "click", function(event) {
    if (markers.length <= 1)
      //Limito a 2 marcadores maximo.
      addMarkersAndAll(event.latLng, map);
  //printablevalues=parseSearchString();
  });

  poly = new google.maps.Polyline({
    strokeColor: "#000000",
    strokeOpacity: 1.0,
    strokeWeight: 3
  });
}

function initMapPrintable() {
  result=parseSearchString();
  ResultadosmainB();
  ResultadosmainB2();

  var arr1=result.coordtx.split(",");
  var arr2=result.coordrx.split(",");
  var lat0=parseFloat(arr1[0]);
  var lng0=parseFloat(arr1[1]);
  var lat1=parseFloat(arr2[0]);
  var lng1=parseFloat(arr2[1]);
  var uluru = { lat: lat0, lng: lng0};
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: uluru
  });

  var marker1 = new google.maps.Marker({
    position: {lat: lat0, lng: lng0},
    map: map
  });
  var marker2 = new google.maps.Marker({
    position: {lat: lat1, lng: lng1},
    map: map
  });
  marker1.setMap(map);
  marker2.setMap(map);

  var pathfinal = [{lat: lat0, lng: lng0},
            {lat: lat1, lng: lng1}];
  var flightPath = new google.maps.Polyline({
    path: pathfinal,
    geodesic: true,
    strokeColor: 'black',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);

  var elevator = new google.maps.ElevationService();
  // Draw the path, using the Visualization API and the Elevation service.
  displayPathElevationB(pathfinal, elevator, map);

  function displayPathElevationB(path, elevator, map) {
    elevator.getElevationAlongPath({
      'path': path,
      'samples': parseNumber(result.cant_redondeo)
    }, plotElevation);
  }

  function plotElevation(elevations, status) {
    var chartDiv = document.getElementById('elevation_chart');
    var chart = new google.visualization.ColumnChart(chartDiv);
    var info = result.altura.split(",");
    var valuetomodify=result.valuetomodify_array.split(",");
    var muestra_mod=result.muestra_mod.split(",");
    var k=parseNumber(result.contador);

    var dataB = new google.visualization.DataTable();
    dataB.addColumn('string', 'Sample');
    dataB.addColumn('number', 'Elevation');
    for (var i = 0; i < info.length; i++) {
      dataB.addRow(['', parseFloat(info[i])]);
    }

    var j;
    for(j=0;j<k;j++){
      valuetomodify[j]=parseFloat(valuetomodify[j]);
      muestra_mod[j]=parseNumber(muestra_mod[j]);
      dataB.setValue(muestra_mod[j], 1, valuetomodify[j]);
    }

    chart.draw(dataB, {
      height: 200,
      width: 950,
      alignment: 'center',
      legend: 'none',
      titleX: 'Cantidad de muestras',
      titleY: 'Elevación (m)',
    });
  }

}
