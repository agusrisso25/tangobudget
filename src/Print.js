function print(perdidasFSL,disp_canalTOT,AnguloTilt,Gtx,Grx,Ptx,Prx,MargenFading,sensRX,distancia,perdidasLluvia,perdidasConectores,perdidasOtras){
  var lat0=latitud[0].toFixed(3);
  var lng0=longitud[0].toFixed(3);
  var lat1=latitud[1].toFixed(3);
  var lng1=longitud[1].toFixed(3);
  var coordtx=lat0+","+lng0;
  var coordrx=lat1+","+lng1;
  var htx=altura[0].toFixed(2);
  var hrx=altura[altura.length-1].toFixed(2);
  var dimensionestx=document.getElementById("dimensionestx").value;
  var dimensionesrx=document.getElementById("dimensionesrx").value;
  var pol=parseNumber(document.getElementById("polarizacion").value);
  var freq=Inputfreq;

  document.getElementById("link").innerHTML = '<a href="PruebaB.html?perdidasFSL='+ perdidasFSL.toFixed(2) +
     '&disp_canal='+ disp_canalTOT.toFixed(5) +
     '&AnguloTilt='+AnguloTilt.toFixed(2)+
     '&Gtx='+Gtx+
     '&Grx='+Grx+
     '&Ptx='+Ptx+
     '&Prx='+Prx.toFixed(3)+
     '&MargenFading='+MargenFading+
     '&distancia='+distancia.toFixed(3)+
     '&perdidasLluvia='+perdidasLluvia+
     '&perdidasConectores='+perdidasConectores+
     '&perdidasOtras='+perdidasOtras+
     '&coordtx='+coordtx+
     '&coordrx='+coordrx+
     '&Freq='+freq+
     '&pol='+pol+
     '&htx='+htx+
     '&hrx='+hrx+
     '&sensRX='+sensRX+
     '&cant_redondeo='+cant_redondeo+
     '&altura='+altura+
     '&muestra_mod='+muestra_mod+
     '&contador='+contador+
     '&valuetomodify_array='+valuetomodify_array+
     '" target="_blank">Haga click aquí para imprimir la página de resultados</a>';
  return;
}