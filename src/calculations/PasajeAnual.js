function PasajeAnual(distancia, epsilon, Pw){
  var DeltaG=10.5-(5.6*Math.log10(1.1-Math.pow(Math.abs(Math.cos(2)),0.7)))-2.7*Math.log10(distancia)+1.7*Math.log10(1+Math.abs(epsilon));
  var dispanual = (1-Math.pow(10,-DeltaG/10)*Pw)*100;

  return dispanual;
}
