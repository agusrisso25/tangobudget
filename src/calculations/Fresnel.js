/* Este bloque tiene como funcionalidad calcular el radio de fresnel y luego ver si el objeto interferente
genera una obstrucción del 40% o 60% del Fresnel.
Se procede a hallar el radio para calcular la zona de Fresnel. Para ello el programa deberá pasar:
Pmax: Punto o muestra en el que se coloca el objeto inteferente
h_Pmax: Altura del objeto interferente
*/

function Fresnel(Pmax,h_Pmax){
  var lambda;
  if(!Inputfreq){
    alert("Ingrese una frecuencia");
    return;
  }

	lambda = (2.998*Math.pow(10,8))/(Inputfreq*Math.pow(10,9));//c/(Inputfreq*Math.pow(10,9));

  var distancia = (haversine(radius, latitud, longitud))*1000;
  var pmedio=(distancia)/2; //Se halla el punto medio entre las antenas Tx y Rx
  var h_pmedio = ((-altura2[0]+altura2[altura2.length-1])/distancia)*(distancia/2)+altura2[0];
  var alpha=Math.atan2((altura2[altura2.length-1]-altura2[0]),distancia); //Resultado en Radianes

  var d1=pmedio/Math.cos(((-2/distancia)*(altura2[0]-h_pmedio))/distancia);
  var d2=pmedio/Math.cos(((-2/distancia)*(altura2[altura2.length-1]-h_pmedio))/distancia);

  R1=Math.sqrt((lambda*d1*d2)/(d1+d2)); //Se halla el radio de la primera zona de fresnel, por definición

  var fresnel60= R1*0.6;
  var fresnel40= R1*0.4;

  //pendLOS=((-altura[0]+altura[altura.length-1])/distancia)*(distancia/2)+altura[0];
  var resultadofresnelTOT;

  if(h_Pmax>h_pmedio) {
    resultadofresnelTOT=2;
  }
  else{
    var resultado60=Math.pow((Math.cos(alpha)*(Pmax-pmedio)+Math.sin(alpha)*(h_Pmax-h_pmedio)),2)/(Math.pow(fresnel60,2)+Math.pow(d2,2))+Math.pow((Math.sin(alpha)*(Pmax-pmedio)-Math.cos(alpha)*(h_Pmax-h_pmedio)),2)/(Math.pow(fresnel60,2));
    var resultado40=Math.pow((Math.cos(alpha)*(Pmax-pmedio)+Math.sin(alpha)*(h_Pmax-h_pmedio)),2)/(Math.pow(fresnel40,2)+Math.pow(d2,2))+Math.pow((Math.sin(alpha)*(Pmax-pmedio)-Math.cos(alpha)*(h_Pmax-h_pmedio)),2)/(Math.pow(fresnel40,2));

    if(resultado40<1 && resultado40>0)
      resultadofresnelTOT=2; //Tengo despeje menor a 40%
    else if(resultado40>=1 && resultado60<1)
      resultadofresnelTOT=1; //Tengo despeje del 40%
    else if(resultado60>1)
      resultadofresnelTOT=0; //Tengo despeje del 60%
  }
  return resultadofresnelTOT;
}
