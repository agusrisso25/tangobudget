/* Este bloque tiene como funcionalidad calcular si hay línea de vista entre la antena Tx y Rx
Se estudian los siguientes casos:
CASO A: La posicion máxima es distinta al origen o al destino, calculo altura2 del punto maximo.
  - caso 1: Pmax mayor a ambas antenas
  - caso 2: Pmax mayor a la antena Tx y menor a la Rx
  - caso 3: Pmax mayor a la antena Rx y menor a la Tx
  - caso 4: Pmax menor a ambas antenas
CASO B1: La posicion máxima es el origen o el destino
  - caso 1: Pmax3 mayor a ambas antenas
  - caso 2: Pmax mayor a la antena Tx y menor a la Rx
  - caso 3: Pmax mayor a la antena Rx y menor a la Tx
  - caso 4: Pmax menor a ambas antenas
CASO B2: Si Pmax2 es la maxima altura2 en mi path... y no es extremo
  - caso 1: Pmax2 mayor a ambas antenas
  - caso 2: Pmax2 mayor a la antena Tx y menor a la Rx
  - caso 3: Pmax2 mayor a la antena Rx y menor a la Tx
  - caso 4: Pmax2 menor a ambas antenas
*/

function getArrayLast(array, fromLast) {
  fromLast = fromLast || 0;
  return array[array.length - 1 - fromLast];
}

function LOS(elevations,coordenadas) {
  var pend1;
  var pend2;
  var posic_Pmax2;
  var posic_Pmax= altura2.indexOf(getArrayLast(data.getDistinctValues(1).filter(function (v) {
      return !isNaN(v);
    }))); //calculo la posicion del array del punto mas alto

  //CASO A: La posicion máxima es distinta al origen o al destino, calculo altura2 del punto maximo.
  if(posic_Pmax != 0 && posic_Pmax != altura2.length-1){
  	//caso 1: Pmax mayor a ambas antenas
  	var Pmax= parseFloat(getArrayLast(data.getDistinctValues(1), 0).toFixed(3)); //calculo altura2 maxima
    if (Pmax>altura2[altura2.length-1].toFixed(3) && Pmax>altura2[0].toFixed(3)){
  		return 0; //NO TENGO LOS: return 0
  }
  //caso 2: Pmax mayor a la antena Tx y menor a la Rx
  else if ((parseFloat(altura2[0].toFixed(3))<Pmax) && (Pmax<parseFloat(altura2[altura2.length-1].toFixed(3)))){ //el punto mas alto es el de la posicion altura2.length
  	pend1= ((altura2[altura2.length-1].toFixed(3)-altura2[0].toFixed(3))/((altura2.length-1)-0)); //hallo el valor de la pendiente de la recta que pasa por las antenas.
  	pend2= (Pmax-altura2[0].toFixed(3))/(posic_Pmax-0); //hallo el valor de la pendiente de la recta que pasa por el punto maximo y la antena Tx
  	if (pend1>=pend2){
  		return 1;} //TENGO LOS: return 1
  	else
      return 0; //NO TENGO LOS: return 0
  	}
  //caso 3: Pmax mayor a la antena Rx y menor a la Tx
  else if ((parseFloat(altura2[altura2.length-1].toFixed(3))<Pmax)&&(Pmax<parseFloat(altura2[0].toFixed(3)))){ //el punto mas bajo es el de la posicion 0
  	pend1= ((altura2[altura2.length-1].toFixed(3)-altura2[0].toFixed(3))/((altura2.length-1)-0)); //hallo el valor de la pendiente de la recta que pasa por las antenas.
  	pend2= (Pmax-altura2[0].toFixed(3))/(posic_Pmax-0); //hallo el valor de la pendiente de la recta que pasa por el punto maximo y la antena Tx
  	if (pend2<pend1)
  		return 1; //TENGO LOS: return 1
  	else
  		return 0; //NO TENGO LOS: return 0
  }
  //caso 4: Pmax menor a ambas antenas
  else
  	return 1; //tengo LOS: return 1
  }

  //CASO B1: La posicion máxima es el origen o el destino
  else if(posic_Pmax == 0 || posic_Pmax == (altura2.length-1)){
		posic_Pmax2= parseFloat(altura2.indexOf(getArrayLast(data.getDistinctValues(1), 1)));

	  if(posic_Pmax2 == 0 || posic_Pmax2 == (altura2.length-1)){ //Si Pmax2 sigue siendo uno de los extremos...
			var Pmax3= parseFloat(getArrayLast(data.getDistinctValues(1), 2).toFixed(1));
			var posic_Pmax3=altura2.indexOf(getArrayLast(data.getDistinctValues(1), 2));
	    	//caso 1: Pmax3 mayor a ambas antenas
					if (Pmax3>parseFloat(altura2[altura2.length-1].toFixed(3)) && Pmax3>parseFloat(altura2[0].toFixed(3)))
              return 0; //NO TENGO LOS: return 0

				//caso 2: Pmax3 mayor a la antena Tx y menor a la Rx
					else if ((parseFloat(altura2[0].toFixed(3))<Pmax3)&& (Pmax3<parseFloat(altura2[altura2.length-1].toFixed(3)))){ //el punto mas alto es el de la posicion altura2.length
							pend1= ((altura2[altura2.length-2].toFixed(3)-altura2[0].toFixed(3))/((altura2.length-1)-0)); //hallo el valor de la pendiente de la recta que pasa por las antenas.
							pend2= (Pmax3-altura2[0].toFixed(3))/(posic_Pmax3-0); //hallo el valor de la pendiente de la recta que pasa por el punto maximo y la antena Tx
							if (pend1>=pend2)
									return 1; //TENGO LOS: return 1
							else
                return 0; //NO TENGO LOS: return 0
							}//cierro caso 2 Pmx3
				//caso 3: Pmax mayor a la antena Rx y menor a la Tx
				else if ((parseFloat(altura2[altura2.length-1].toFixed(3))<Pmax3) && (Pmax3<parseFloat(altura2[0].toFixed(3)))){ //el punto mas bajo es el de la posicion 0
						pend1= ((altura2[altura2.length-1].toFixed(3)-altura2[0].toFixed(3))/((altura2.length-1)-0)); //hallo el valor de la pendiente de la recta que pasa por las antenas.
						pend2= (Pmax3-altura2[0].toFixed(3))/(posic_Pmax3-0); //hallo el valor de la pendiente de la recta que pasa por el punto maximo y la antena Tx
						if (pend2<pend1)
								return 1; //TENGO LOS: return 1
						else
              return 0; //NO TENGO LOS: return 0
				}
				//caso 4: Pmax3 menor a ambas antenas
				else
					return 1; //tengo LOS: return 1
     }

 //CASO B2: Si Pmax 2 es la maxima altura2 en mi path... y no es extremo
else {
			//caso 1: Pmax2 mayor a ambas antenas
			var Pmax2 = parseFloat(getArrayLast(data.getDistinctValues(1), 1).toFixed(1)); //nos da el valor de altura2 mas alto
			if (Pmax2 > parseFloat(altura2[altura2.length-1].toFixed(3) && Pmax2>altura2[0].toFixed(3))){
				return 0; //NO TENGO LOS: return 0
			}
			//caso 2: Pmax2 mayor a la antena Tx y menor a la Rx
			else if ((parseFloat(altura2[0].toFixed(3))<Pmax2) && (Pmax2<parseFloat(altura2[altura2.length-1].toFixed(3)))){ //el punto mas alto es el de la posicion altura2.length
				pend1= ((altura2[altura2.length-1].toFixed(3)-altura2[0].toFixed(3))/((altura2.length-1)-0)); //hallo el valor de la pendiente de la recta que pasa por las antenas.
				pend2= (Pmax2-altura2[0].toFixed(3))/(posic_Pmax2-0); //hallo el valor de la pendiente de la recta que pasa por el punto maximo y la antena Tx
					if (pend1>=pend2)
						return 1; //TENGO LOS: return 1
					else
						return 0; //NO TENGO LOS: return 0
			}

			//caso 3: Pmax2 mayor a la antena Rx y menor a la Tx
			else if ((parseFloat(altura2[altura2.length-1].toFixed(1))<Pmax2) && (Pmax2<parseFloat(altura2[0].toFixed(1)))){ //el punto mas bajo es el de la posicion 0
				pend1= ((altura2[altura2.length-1].toFixed(1)-altura2[0].toFixed(1))/((altura2.length-1)-0)); //hallo el valor de la pendiente de la recta que pasa por las antenas.
				pend2= (Pmax2-altura2[0].toFixed(1))/(posic_Pmax2-0); //hallo el valor de la pendiente de la recta que pasa por el punto maximo y la antena Tx
				if (pend2<pend1)
					return 1; //TENGO LOS: return 1
				else
					return 0; //NO TENGO LOS: return 0
			}
			//caso 4: Pmax2 menor a ambas antenas
				else
					return 1; //tengo LOS: return 1
				}
}
}
