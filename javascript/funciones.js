function datos_getArriveStop(idStop)
{
	
	
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
	alert(this.readyState);
    if (this.readyState == 4 && this.status == 200) {
		
    tratarJSON(this.responseText);
	
    }
}
xmlhttp.open("POST", "https://openbus.emtmadrid.es:9443/emt-proxy-server/last/geo/GetArriveStop.php", true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send("idClient=WEB.SERV.ataraxa@hotmail.com&passKey=83D88CD0-8A9B-4CE6-B976-B922B61FAE6D&idStop="+idStop);

}
function getStopsFromXY()
{
	//alert("dentro");
	latitud=document.getElementById("latitud").value;
	longitud=document.getElementById("longitud").value;
	radius=document.getElementById("radio").value;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
			//alert(this.readyState);
			if (this.readyState == 4 && this.status == 200) {
				
			alert(this.responseText);
			tratar_getStopsFromXY(this.responseText);
			}
	}
	xmlhttp.open("POST", "https://openbus.emtmadrid.es:9443/emt-proxy-server/last/geo/GetStopsFromXY.php", true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
url="idClient=WEB.SERV.ataraxa@hotmail.com&passKey=83D88CD0-8A9B-4CE6-B976-B922B61FAE6D&latitude="+latitud;
url+="&longitude="+longitud+"&Radius="+radius;
//alert(url);
xmlhttp.send(url);

	

}
function inicializar()
{
	recuperarLineas();
	setInterval(function(){recuperarLineas();}, 3000);
}
function tratar_getStopsFromXY(string_json)
{
	objeto_JSON=JSON.parse(string_json);
	lista_paradas=objeto_JSON.stop;//Array de paradas
	html_tabla="<table class='tabla_paradas'><tr><th>PARADA</th><th>DIRECCION</th><th>LINEAS</th>";
	for ( i=0; i<lista_paradas.length; i++)
	{
		objeto_parada=lista_paradas[i];
		stopId=objeto_parada.stopId;
		postalAddress=objeto_parada.postalAddress;
		lista_lineas=objeto_parada.line;//Array de líneas
		lineas="";
		for(j=0; j<lista_lineas.length; j++)
		{
			objeto_linea=lista_lineas[j];
			lineId=objeto_linea.line;
			lineas+=lineId+",";
		}
		lineas=lineas.substring(0, lineas.length-1);
		html_tabla+="<tr onclick=getArriveStop(this) id='"+stopId+"' class='fila_clicable'><td>"+stopId+"</td><td>"+postalAddress+"</td><td>"+lineas+"</td></tr>";
		
	}
	html_tabla+="</table>";
	document.getElementById("contenedor_getstopsfromxy").innerHTML=html_tabla;
}
function getArriveStop(objeto_fila)
{
	id=objeto_fila.id;
	datos_getArriveStop(id);
}

function tratarJSON(string_json)
{
	//alert(string_json);
	objeto_JSON=JSON.parse(string_json);
	lista_arrives=objeto_JSON.arrives;//Un array de objetos Arrive
	aux="<table><tr><th>Línea</th><th>Tiempo</th></tr>";
	for(i=0; i<lista_arrives.length;i++)
	{
		objeto_arrive=lista_arrives[i];
		lineId=objeto_arrive.lineId;
		busTimeLeft=objeto_arrive.busTimeLeft;
		aux+="<tr><td>"+lineId+"</td><td>"+busTimeLeft+"</td></tr>";
		
	}
	aux+="</table>";
	document.getElementById("contenedor_getarrivestop").innerHTML=aux;
}