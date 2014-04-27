//<![CDATA[
var map;
var map2;
var markers = [];
var currentMarker = [];
var infoWindow;

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

var customIcons = {
	1: {
		icon: 'assets/pointer_1.png' // AVAILLABLE
	},
	0: {
		icon: 'assets/pointer_2.png' // NOT AVAILLABLE
	},
	2: {
		icon: 'assets/pointer_3.png' // UNKNOWN
	},
	3: {
		icon: 'assets/pointer_4.png' // VEHICLE
	}
};



//RECHERCHE URGENTE
function display_ur(){
	
	var link = document.getElementById('searchNav_search_ur');
	var content = document.getElementById('searchNav_content_ur');
	var tickets = document.getElementById('tickets_content_ur');
	var tickets_details = document.getElementById('tickets_details_ur');
	var myMap = document.getElementById('findMapContainer');
	var theButs = document.getElementById('theButs');	
	
	
	var searchNav_search_title      = document.getElementById('searchNav_search_title_ur');
	var searchNav_search_back_picto = document.getElementById('searchNav_search_back_picto_ur');
	var searchNav_search_picto 		= document.getElementById('searchNav_search_picto_ur');
	
	var tickets_details = document.getElementById('tickets_details_ur');
	var testContainer = document.getElementById('testContainer_ur');
	var ticket_img = document.getElementById('ticket_img_ur');
	var extra_info = document.getElementById('extra_info_ur');
	var testContainer2 = document.getElementById('testContainer2_ur');
	var ticket_logo = document.getElementById('ticket_logo1_ur');
	var direction  = document.getElementById('direction_ur');
	
	
	link.style.display ="none";
	content.style.display ="block";
	tickets.style.display ="none";
	myMap.style.top = "25%";
	var theRadius    = document.getElementById('theRadius');
	
	theRadius.style.display = "none";
	theButs.style.display = "none";
	
	
	
	
	
	
}


function display_ur2(){
	
	var link = document.getElementById('searchNav_search_ur');
	var content = document.getElementById('searchNav_content_ur');
	var tickets = document.getElementById('tickets_content_ur');
	var tickets_details = document.getElementById('tickets_details_ur');
	
	var searchNav_search_title      = document.getElementById('searchNav_search_title_ur');
	var searchNav_search_back_picto = document.getElementById('searchNav_search_back_picto_ur');
	var searchNav_search_picto 		= document.getElementById('searchNav_search_picto_ur');
	
	var tickets_details = document.getElementById('tickets_details_ur');
	var testContainer = document.getElementById('testContainer_ur');
	var ticket_img = document.getElementById('ticket_img_ur');
	var extra_info = document.getElementById('extra_info_ur');
	var testContainer2 = document.getElementById('testContainer2_ur');
	var ticket_logo = document.getElementById('ticket_logo1_ur');
	var direction  = document.getElementById('direction_ur');
	
	
	
	
	if(testContainer.style.width == '38%'){
		
		testContainer.style.width = '100%';
		extra_info.style.display = 'none';
		
		
		ticket_img.style.width = '100%';
		tickets_details.style.width = '300px';
	
		testContainer2.style.width = '100%';
		ticket_logo.style.display = 'none';
		
		ticket_logo.style.width = '100%';
		ticket_logo.style.margin = '0px 0% 0px 0%';	
		direction.style.width = '100%';
		direction.style.marginTop = '10px';
		
		
		
	}
	else {
		if(tickets_details.style.display== 'block'){
			tickets.style.display = 'block';
			tickets_details.style.display = 'none';
		}
		else{
			if(content.style.display== 'none'){
				content.style.display = 'block';
				tickets.style.display = 'none';
				link.style.width='auto';
			
				searchNav_search_title.innerHTML ="RECHERCHE URGENTE"
				searchNav_search_back_picto.style.display = 'none';
				searchNav_search_picto.style.display = 'block';
			}
			else {
				content.style.display= 'none';
				tickets.style.display = 'none';
				link.style.width='auto';
				controlContainer.style.display = "block";
				controlContainer_ur.style.left = "263px";
			}	
		}
	}
	
	
	
}
function geo_ur(){
	
    map = new google.maps.Map(document.getElementById("map"), {
		center: new google.maps.LatLng(50.4635, 6.0500),
		zoom: 8,
		mapTypeId: 'roadmap',
		disableDefaultUI: true
		
	});
	infoWindow = new google.maps.InfoWindow();
	
	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showCurrentLocation);
	}
	else{
		alert("Geolocation API not supported.");
	}
	
	var link    = document.getElementById('searchNav_search_ur');
	var content = document.getElementById('searchNav_content_ur');
	var tickets = document.getElementById('tickets_content_ur');
	var myMap    = document.getElementById('findMapContainer');
	var theRadius = document.getElementById('theRadius');
	
	content.style.display = "none";
	link.style.display = "block";
	tickets.style.display = "block";
	myMap.style.top = "55%";
	theRadius.style.display = "block";
	

}

function showCurrentLocation(position){
	var iconBase = 'assets/'
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	var coords = new google.maps.LatLng(latitude, longitude);
	//place the initial marker
	searchLocationsNear(coords);
}


function search_by_address_ur(){
	var link    = document.getElementById('searchNav_search_ur');
	var content = document.getElementById('searchNav_content_ur');
	var tickets = document.getElementById('tickets_content_ur');
	var myMap    = document.getElementById('findMapContainer');
	var theRadius    = document.getElementById('theRadius');

	content.style.display = "none";
	link.style.display = "block";
	tickets.style.display = "block";
	myMap.style.top = "55%";	
	theRadius.style.display = "block";
	
	
	
	
    map = new google.maps.Map(document.getElementById("map"), {
		center: new google.maps.LatLng(50.4635, 6.0500),
		zoom: 8,
		mapTypeId: 'roadmap',
		disableDefaultUI: true
		
	});
	infoWindow = new google.maps.InfoWindow();
	
	
	var address = document.getElementById("theAddress").value;
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({address: address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			
			
			//document.getElementById("the_formatted_address").innerHTML = results[0].formatted_address;
			searchLocationsNear(results[0].geometry.location);
			//document.getElementById("clickSecurity").style.display ="none";
		} else {
			alert(address + ' not found');
			//document.getElementById("clickSecurity").style.display ="none";
		}
	});
	
	
	
	
}
function searchLocationsNear(center) {
	clearLocations();
	createCurrentPositionMarker(center); //MARKER   
	var bounds = new google.maps.LatLngBounds();
	bounds.extend(center);
	var affichage = 2;

	var radius = 50;
	var searchUrl = 'http://aed-pointer.eu/aed_temp/SEARCH_mobile/phpsqlsearch_genxml.php?lat=' + center.lat() + '&lng=' + center.lng() + '&radius=' + radius + '&affichage=' + affichage;

	downloadUrl(searchUrl, function(data, center) {
		var xml = parseXml(data);
		var markerNodes = xml.documentElement.getElementsByTagName("marker");


		var lessThan2 = new Array();
		var lessThan5 = new Array();
		var lessThan1 = new Array();
		var lessThan20 = new Array();

		for (var i = 0; i < markerNodes.length; i++) {
			var distance = parseFloat(markerNodes[i].getAttribute("distance"));

			if(distance < 0.251){
				lessThan2.push(i);
			}
			if(distance < 0.501){
				lessThan5.push(i);
			}
			if(distance < 1.001){
				lessThan1.push(i);
			}
			if(distance < 2.001){
				lessThan20.push(i);
			}
		}
		if(lessThan2.length < 4){
			if(lessThan5.length < 4){
				if(lessThan1.length < 4){
					if(lessThan20.length == 0){
						var theRadius = document.getElementById("theRadius");
						theRadius.style.display ="block";
						theRadius.innerHTML = 'Il n\'y a pas de DEA dans un rayon de 2km';
					}
					else{
						var theRadius = document.getElementById("theRadius");
						theRadius.style.display ="block";
						theRadius.innerHTML = 'Il y a ' + lessThan20.length + ' DEA dans un rayon de 2km';

						for (var i = 0; i < lessThan20.length; i++) {
							var theName = markerNodes[lessThan20[i]].getAttribute("name");
							var address = markerNodes[lessThan20[i]].getAttribute("address");
							var company = markerNodes[lessThan20[i]].getAttribute("company");
							var distance = parseFloat(markerNodes[lessThan20[i]].getAttribute("distance"));
							var latlng = new google.maps.LatLng(
								parseFloat(markerNodes[lessThan20[i]].getAttribute("lat")),
								parseFloat(markerNodes[lessThan20[i]].getAttribute("lng"))
							);
							var description = markerNodes[lessThan20[i]].getAttribute("description");
							var theAvailability = markerNodes[lessThan20[i]].getAttribute("theAvailability");
							var phone = markerNodes[lessThan20[i]].getAttribute("phone");
							var the_center_lat = markerNodes[lessThan20[i]].getAttribute("center_lat");
							var the_center_lng = markerNodes[lessThan20[i]].getAttribute("center_lng");
							var output_lat = markerNodes[lessThan20[i]].getAttribute("lat");
							var output_lng = markerNodes[lessThan20[i]].getAttribute("lng");
							var autreInfoDispo = markerNodes[lessThan20[i]].getAttribute("autreInfoDispo");
							var auPublicNonDescription = markerNodes[lessThan20[i]].getAttribute("auPublicNonDescription");
							var theType = markerNodes[lessThan20[i]].getAttribute("theType");

							createMarker(latlng, company,theName,distance, address, description, theAvailability, the_center_lat, the_center_lng,output_lat,output_lng);
							bounds.extend(latlng);

							var text_output = document.getElementById("tickets_content_ur");
							
							//'<div class="theButs"  ><div class="retour" onclick="retour()">Retour</div><div class="the_dirs" onclick="calcRoute('+the_center_lat+','+the_center_lng+','+output_lat+','+output_lng+',\''+ company+'\','+theAvailability+')" >Directions</div></div>'
							
							if(theAvailability == 1){
								text_output.innerHTML += '<div id="t_'+i+'" class="ticketContainer"><div onclick="address_onclick('+i+')" class="visibleContainer"><div class="dispo_1"><div class="ticketNum">'+(i+1)+'</div>Actuellement disponible</div><div class="distance">'+distance.toFixed(1)+' km</div><div class="company"> '+ company + '</div><div class="theType">'+theType+'</div></div><div class="invisibleContainer"><div class="ticketTitle"> Description de la disponibilité</div><div class="ticketSubtitle">'+autreInfoDispo+'</div><div class="ticketTitle"> Adresse</div><div class="ticketSubtitle"> '+address+'</div><div class="ticketTitle"> Description de l\'accessibilité</div><div class="ticketSubtitle">'+auPublicNonDescription+'</div><div class="ticketTitle"> Description de l\'emplacement</div><div class="ticketSubtitle"> '+description+'</div><div class="theButs"  ><div class="retour" onclick="retour()">Retour</div><div class="the_dirs" onclick="calcRoute('+the_center_lat+','+the_center_lng+','+output_lat+','+output_lng+',\''+ company+'\','+theAvailability+')" >Directions</div></div></div></div>';
							}
							else if(theAvailability == 0){
								text_output.innerHTML += '<div id="t_'+i+'" class="ticketContainer"><div onclick="address_onclick('+i+')" class="visibleContainer"><div class="dispo_0"><div class="ticketNum">'+(i+1)+'</div>Actuellement indisponible</div><div class="distance">'+distance.toFixed(1)+' km</div><div class="company"> '+ company + '</div><div class="theType">'+theType+'</div></div><div class="invisibleContainer"><div class="ticketTitle"> Description de la disponibilité</div><div class="ticketSubtitle">'+autreInfoDispo+'</div><div class="ticketTitle"> Adresse</div><div class="ticketSubtitle"> '+address+'</div><div class="ticketTitle"> Description de l\'accessibilité</div><div class="ticketSubtitle">'+auPublicNonDescription+'</div><div class="ticketTitle"> Description de l\'emplacement</div><div class="ticketSubtitle"> '+description+'</div><div class="theButs"  ><div class="retour" onclick="retour()">Retour</div><div class="the_dirs" onclick="calcRoute('+the_center_lat+','+the_center_lng+','+output_lat+','+output_lng+',\''+ company+'\','+theAvailability+')" >Directions</div></div></div></div>';				
							}
							else if(theAvailability == 2){
								text_output.innerHTML += '<div id="t_'+i+'" class="ticketContainer"><div onclick="address_onclick('+i+')" class="visibleContainer"><div class="dispo_2"><div class="ticketNum">'+(i+1)+'</div>Disponibilité non précisée</div><div class="distance">'+distance.toFixed(1)+' km</div><div class="company"> '+ company + '</div><div class="theType">'+theType+'</div></div><div class="invisibleContainer"><div class="ticketTitle"> Description de la disponibilité</div><div class="ticketSubtitle">'+autreInfoDispo+'</div><div class="ticketTitle"> Adresse</div><div class="ticketSubtitle"> '+address+'</div><div class="ticketTitle"> Description de l\'accessibilité</div><div class="ticketSubtitle">'+auPublicNonDescription+'</div><div class="ticketTitle"> Description de l\'emplacement</div><div class="ticketSubtitle"> '+description+'</div><div class="theButs"  ><div class="retour" onclick="retour()">Retour</div><div class="the_dirs" onclick="calcRoute('+the_center_lat+','+the_center_lng+','+output_lat+','+output_lng+',\''+ company+'\','+theAvailability+')" >Directions</div></div></div></div>';				
							}
							else if(theAvailability == 3){
								text_output.innerHTML += '<div id="t_'+i+'" class="ticketContainer"><div onclick="address_onclick('+i+')" class="visibleContainer"><div class="dispo_3"><div class="ticketNum">'+(i+1)+'</div>Vehicule</div><div class="distance">'+distance.toFixed(1)+' km</div><div class="company"> '+ company + '</div><div class="theType">'+theType+'</div></div><div class="invisibleContainer"><div class="ticketTitle"> Description de la disponibilité</div><div class="ticketSubtitle">'+autreInfoDispo+'</div><div class="ticketTitle"> Adresse</div><div class="ticketSubtitle"> '+address+'</div><div class="ticketTitle"> Description de l\'accessibilité</div><div class="ticketSubtitle">'+auPublicNonDescription+'</div><div class="ticketTitle"> Description de l\'emplacement</div><div class="ticketSubtitle"> '+description+'</div><div class="theButs"  ><div class="retour" onclick="retour()">Retour</div><div class="the_dirs" onclick="calcRoute('+the_center_lat+','+the_center_lng+','+output_lat+','+output_lng+',\''+ company+'\','+theAvailability+')" >Directions</div></div></div></div>';
							}
						}
					} //20	   		
				}
				else {
					var theRadius = document.getElementById("theRadius");
					theRadius.style.display ="block";
					theRadius.innerHTML = 'Il y a ' + lessThan1.length + ' DEA dans un rayon de 1km';

					for (var i = 0; i < lessThan1.length; i++) {
						var theName = markerNodes[lessThan1[i]].getAttribute("name");
						var address = markerNodes[lessThan1[i]].getAttribute("address");
						var company = markerNodes[lessThan1[i]].getAttribute("company");
						var distance = parseFloat(markerNodes[lessThan1[i]].getAttribute("distance"));
						var latlng = new google.maps.LatLng(
							parseFloat(markerNodes[lessThan1[i]].getAttribute("lat")),
							parseFloat(markerNodes[lessThan1[i]].getAttribute("lng"))
						);
						var description = markerNodes[lessThan1[i]].getAttribute("description");
						var theAvailability = markerNodes[lessThan1[i]].getAttribute("theAvailability");
						var phone = markerNodes[lessThan1[i]].getAttribute("phone");
						var the_center_lat = markerNodes[lessThan1[i]].getAttribute("center_lat");
						var the_center_lng = markerNodes[lessThan1[i]].getAttribute("center_lng");
						var output_lat = markerNodes[lessThan1[i]].getAttribute("lat");
						var output_lng = markerNodes[lessThan1[i]].getAttribute("lng");
						var autreInfoDispo = markerNodes[lessThan1[i]].getAttribute("autreInfoDispo");
						var auPublicNonDescription = markerNodes[lessThan1[i]].getAttribute("auPublicNonDescription");
						var theType = markerNodes[lessThan1[i]].getAttribute("theType");

						createMarker(latlng, company,theName,distance, address, description, theAvailability, the_center_lat, the_center_lng,output_lat,output_lng);
						bounds.extend(latlng);

						var text_output = document.getElementById("tickets_content_ur");

						if(theAvailability == 1){
							text_output.innerHTML += '<div id="t_'+i+'" class="ticketContainer"><div onclick="address_onclick('+i+')" class="visibleContainer"><div class="dispo_1"><div class="ticketNum">'+(i+1)+'</div>Actuellement disponible</div><div class="distance">'+distance.toFixed(1)+' km</div><div class="company"> '+ company + '</div><div class="theType">'+theType+'</div></div><div class="invisibleContainer"><div class="ticketTitle"> Description de la disponibilité</div><div class="ticketSubtitle">'+autreInfoDispo+'</div><div class="ticketTitle"> Adresse</div><div class="ticketSubtitle"> '+address+'</div><div class="ticketTitle"> Description de l\'accessibilité</div><div class="ticketSubtitle">'+auPublicNonDescription+'</div><div class="ticketTitle"> Description de l\'emplacement</div><div class="ticketSubtitle"> '+description+'</div><div class="theButs"  ><div class="retour" onclick="retour()">Retour</div><div class="the_dirs" onclick="calcRoute('+the_center_lat+','+the_center_lng+','+output_lat+','+output_lng+',\''+ company+'\','+theAvailability+')" >Directions</div></div></div></div>';
						}
						else if(theAvailability == 0){
							text_output.innerHTML += '<div id="t_'+i+'" class="ticketContainer"><div onclick="address_onclick('+i+')" class="visibleContainer"><div class="dispo_0"><div class="ticketNum">'+(i+1)+'</div>Actuellement indisponible</div><div class="distance">'+distance.toFixed(1)+' km</div><div class="company"> '+ company + '</div><div class="theType">'+theType+'</div></div><div class="invisibleContainer"><div class="ticketTitle"> Description de la disponibilité</div><div class="ticketSubtitle">'+autreInfoDispo+'</div><div class="ticketTitle"> Adresse</div><div class="ticketSubtitle"> '+address+'</div><div class="ticketTitle"> Description de l\'accessibilité</div><div class="ticketSubtitle">'+auPublicNonDescription+'</div><div class="ticketTitle"> Description de l\'emplacement</div><div class="ticketSubtitle"> '+description+'</div><div class="theButs"  ><div class="retour" onclick="retour()">Retour</div><div class="the_dirs" onclick="calcRoute('+the_center_lat+','+the_center_lng+','+output_lat+','+output_lng+',\''+ company+'\','+theAvailability+')" >Directions</div></div></div></div>';				
						}
						else if(theAvailability == 2){
							text_output.innerHTML += '<div id="t_'+i+'" class="ticketContainer"><div onclick="address_onclick('+i+')" class="visibleContainer"><div class="dispo_2"><div class="ticketNum">'+(i+1)+'</div>Disponibilité non précisée</div><div class="distance">'+distance.toFixed(1)+' km</div><div class="company"> '+ company + '</div><div class="theType">'+theType+'</div></div><div class="invisibleContainer"><div class="ticketTitle"> Description de la disponibilité</div><div class="ticketSubtitle">'+autreInfoDispo+'</div><div class="ticketTitle"> Adresse</div><div class="ticketSubtitle"> '+address+'</div><div class="ticketTitle"> Description de l\'accessibilité</div><div class="ticketSubtitle">'+auPublicNonDescription+'</div><div class="ticketTitle"> Description de l\'emplacement</div><div class="ticketSubtitle"> '+description+'</div><div class="theButs"  ><div class="retour" onclick="retour()">Retour</div><div class="the_dirs" onclick="calcRoute('+the_center_lat+','+the_center_lng+','+output_lat+','+output_lng+',\''+ company+'\','+theAvailability+')" >Directions</div></div></div></div>';				
						}
						else if(theAvailability == 3){
							text_output.innerHTML += '<div id="t_'+i+'" class="ticketContainer"><div onclick="address_onclick('+i+')" class="visibleContainer"><div class="dispo_3"><div class="ticketNum">'+(i+1)+'</div>Vehicule</div><div class="distance">'+distance.toFixed(1)+' km</div><div class="company"> '+ company + '</div><div class="theType">'+theType+'</div></div><div class="invisibleContainer"><div class="ticketTitle"> Description de la disponibilité</div><div class="ticketSubtitle">'+autreInfoDispo+'</div><div class="ticketTitle"> Adresse</div><div class="ticketSubtitle"> '+address+'</div><div class="ticketTitle"> Description de l\'accessibilité</div><div class="ticketSubtitle">'+auPublicNonDescription+'</div><div class="ticketTitle"> Description de l\'emplacement</div><div class="ticketSubtitle"> '+description+'</div><div class="theButs"  ><div class="retour" onclick="retour()">Retour</div><div class="the_dirs" onclick="calcRoute('+the_center_lat+','+the_center_lng+','+output_lat+','+output_lng+',\''+ company+'\','+theAvailability+')" >Directions</div></div></div></div>';
						}
					}  
				} //1
			}
			else {
				var theRadius = document.getElementById("theRadius");
				theRadius.style.display ="block";
				theRadius.innerHTML = 'Il y a ' + lessThan5.length + ' DEA dans un rayon de 500m';

				for (var i = 0; i < lessThan5.length; i++) {
					var theName = markerNodes[lessThan5[i]].getAttribute("name");
					var address = markerNodes[lessThan5[i]].getAttribute("address");
					var company = markerNodes[lessThan5[i]].getAttribute("company");
					var distance = parseFloat(markerNodes[lessThan5[i]].getAttribute("distance"));
					var latlng = new google.maps.LatLng(
						parseFloat(markerNodes[lessThan5[i]].getAttribute("lat")),
						parseFloat(markerNodes[lessThan5[i]].getAttribute("lng"))
					);
					var description = markerNodes[lessThan5[i]].getAttribute("description");
					var theAvailability = markerNodes[lessThan5[i]].getAttribute("theAvailability");
					var phone = markerNodes[lessThan5[i]].getAttribute("phone");
					var the_center_lat = markerNodes[lessThan5[i]].getAttribute("center_lat");
					var the_center_lng = markerNodes[lessThan5[i]].getAttribute("center_lng");
					var output_lat = markerNodes[lessThan5[i]].getAttribute("lat");
					var output_lng = markerNodes[lessThan5[i]].getAttribute("lng");
					var autreInfoDispo = markerNodes[lessThan5[i]].getAttribute("autreInfoDispo");
					var auPublicNonDescription = markerNodes[lessThan5[i]].getAttribute("auPublicNonDescription");
					var theType = markerNodes[lessThan5[i]].getAttribute("theType");

					createMarker(latlng, company,theName,distance, address, description, theAvailability, the_center_lat, the_center_lng,output_lat,output_lng);
					bounds.extend(latlng);

					var text_output = document.getElementById("tickets_content_ur");

					if(theAvailability == 1){
						text_output.innerHTML += '<div id="t_'+i+'" class="ticketContainer"><div onclick="address_onclick('+i+')" class="visibleContainer"><div class="dispo_1"><div class="ticketNum">'+(i+1)+'</div>Actuellement disponible</div><div class="distance">'+distance.toFixed(1)+' km</div><div class="company"> '+ company + '</div><div class="theType">'+theType+'</div></div><div class="invisibleContainer"><div class="ticketTitle"> Description de la disponibilité</div><div class="ticketSubtitle">'+autreInfoDispo+'</div><div class="ticketTitle"> Adresse</div><div class="ticketSubtitle"> '+address+'</div><div class="ticketTitle"> Description de l\'accessibilité</div><div class="ticketSubtitle">'+auPublicNonDescription+'</div><div class="ticketTitle"> Description de l\'emplacement</div><div class="ticketSubtitle"> '+description+'</div><div class="theButs"  ><div class="retour" onclick="retour()">Retour</div><div class="the_dirs" onclick="calcRoute('+the_center_lat+','+the_center_lng+','+output_lat+','+output_lng+',\''+ company+'\','+theAvailability+')" >Directions</div></div></div></div>';
					}
					else if(theAvailability == 0){
						text_output.innerHTML += '<div id="t_'+i+'" class="ticketContainer"><div onclick="address_onclick('+i+')" class="visibleContainer"><div class="dispo_0"><div class="ticketNum">'+(i+1)+'</div>Actuellement indisponible</div><div class="distance">'+distance.toFixed(1)+' km</div><div class="company"> '+ company + '</div><div class="theType">'+theType+'</div></div><div class="invisibleContainer"><div class="ticketTitle"> Description de la disponibilité</div><div class="ticketSubtitle">'+autreInfoDispo+'</div><div class="ticketTitle"> Adresse</div><div class="ticketSubtitle"> '+address+'</div><div class="ticketTitle"> Description de l\'accessibilité</div><div class="ticketSubtitle">'+auPublicNonDescription+'</div><div class="ticketTitle"> Description de l\'emplacement</div><div class="ticketSubtitle"> '+description+'</div><div class="theButs"  ><div class="retour" onclick="retour()">Retour</div><div class="the_dirs" onclick="calcRoute('+the_center_lat+','+the_center_lng+','+output_lat+','+output_lng+',\''+ company+'\','+theAvailability+')" >Directions</div></div></div></div>';				
					}
					else if(theAvailability == 2){
						text_output.innerHTML += '<div id="t_'+i+'" class="ticketContainer"><div onclick="address_onclick('+i+')" class="visibleContainer"><div class="dispo_2"><div class="ticketNum">'+(i+1)+'</div>Disponibilité non précisée</div><div class="distance">'+distance.toFixed(1)+' km</div><div class="company"> '+ company + '</div><div class="theType">'+theType+'</div></div><div class="invisibleContainer"><div class="ticketTitle"> Description de la disponibilité</div><div class="ticketSubtitle">'+autreInfoDispo+'</div><div class="ticketTitle"> Adresse</div><div class="ticketSubtitle"> '+address+'</div><div class="ticketTitle"> Description de l\'accessibilité</div><div class="ticketSubtitle">'+auPublicNonDescription+'</div><div class="ticketTitle"> Description de l\'emplacement</div><div class="ticketSubtitle"> '+description+'</div><div class="theButs"  ><div class="retour" onclick="retour()">Retour</div><div class="the_dirs" onclick="calcRoute('+the_center_lat+','+the_center_lng+','+output_lat+','+output_lng+',\''+ company+'\','+theAvailability+')" >Directions</div></div></div></div>';				
					}
					else if(theAvailability == 3){
						text_output.innerHTML += '<div id="t_'+i+'" class="ticketContainer"><div onclick="address_onclick('+i+')" class="visibleContainer"><div class="dispo_3"><div class="ticketNum">'+(i+1)+'</div>Vehicule</div><div class="distance">'+distance.toFixed(1)+' km</div><div class="company"> '+ company + '</div><div class="theType">'+theType+'</div></div><div class="invisibleContainer"><div class="ticketTitle"> Description de la disponibilité</div><div class="ticketSubtitle">'+autreInfoDispo+'</div><div class="ticketTitle"> Adresse</div><div class="ticketSubtitle"> '+address+'</div><div class="ticketTitle"> Description de l\'accessibilité</div><div class="ticketSubtitle">'+auPublicNonDescription+'</div><div class="ticketTitle"> Description de l\'emplacement</div><div class="ticketSubtitle"> '+description+'</div><div class="theButs"  ><div class="retour" onclick="retour()">Retour</div><div class="the_dirs" onclick="calcRoute('+the_center_lat+','+the_center_lng+','+output_lat+','+output_lng+',\''+ company+'\','+theAvailability+')" >Directions</div></div></div></div>';
					}
				}
			} //5
		}
		else {
			var theRadius = document.getElementById("theRadius");
			theRadius.style.display ="block";
			theRadius.innerHTML = 'Il y a ' + lessThan2.length + ' DEA dans un rayon de 250m';

			for (var i = 0; i < lessThan2.length; i++) {
				var theName = markerNodes[lessThan2[i]].getAttribute("name");
				var address = markerNodes[lessThan2[i]].getAttribute("address");
				var company = markerNodes[lessThan2[i]].getAttribute("company");
				var distance = parseFloat(markerNodes[lessThan2[i]].getAttribute("distance"));
				var latlng = new google.maps.LatLng(
					parseFloat(markerNodes[lessThan2[i]].getAttribute("lat")),
					parseFloat(markerNodes[lessThan2[i]].getAttribute("lng"))
				);
				var description = markerNodes[lessThan2[i]].getAttribute("description");
				var theAvailability = markerNodes[lessThan2[i]].getAttribute("theAvailability");
				var phone = markerNodes[lessThan2[i]].getAttribute("phone");
				var the_center_lat = markerNodes[lessThan2[i]].getAttribute("center_lat");
				var the_center_lng = markerNodes[lessThan2[i]].getAttribute("center_lng");
				var output_lat = markerNodes[lessThan2[i]].getAttribute("lat");
				var output_lng = markerNodes[lessThan2[i]].getAttribute("lng");
				var autreInfoDispo = markerNodes[lessThan2[i]].getAttribute("autreInfoDispo");
				var auPublicNonDescription = markerNodes[lessThan2[i]].getAttribute("auPublicNonDescription");
				var theType = markerNodes[lessThan2[i]].getAttribute("theType");

				createMarker(latlng, company,theName,distance, address, description, theAvailability, the_center_lat, the_center_lng,output_lat,output_lng);
				
				
				bounds.extend(latlng);

				var text_output = document.getElementById("tickets_content_ur");

				if(theAvailability == 1){
					text_output.innerHTML += '<div id="t_'+i+'" class="ticketContainer"><div onclick="address_onclick('+i+')" class="visibleContainer"><div class="dispo_1"><div class="ticketNum">'+(i+1)+'</div>Actuellement disponible</div><div class="distance">'+distance.toFixed(1)+' km</div><div class="company"> '+ company + '</div><div class="theType">'+theType+'</div></div><div class="invisibleContainer"><div class="ticketTitle"> Description de la disponibilité</div><div class="ticketSubtitle">'+autreInfoDispo+'</div><div class="ticketTitle"> Adresse</div><div class="ticketSubtitle"> '+address+'</div><div class="ticketTitle"> Description de l\'accessibilité</div><div class="ticketSubtitle">'+auPublicNonDescription+'</div><div class="ticketTitle"> Description de l\'emplacement</div><div class="ticketSubtitle"> '+description+'</div><div class="theButs"  ><div class="retour" onclick="retour()">Retour</div><div class="the_dirs" onclick="calcRoute('+the_center_lat+','+the_center_lng+','+output_lat+','+output_lng+',\''+ company+'\','+theAvailability+')" >Directions</div></div></div></div>';
				}
				else if(theAvailability == 0){
					text_output.innerHTML += '<div id="t_'+i+'" class="ticketContainer"><div onclick="address_onclick('+i+')" class="visibleContainer"><div class="dispo_0"><div class="ticketNum">'+(i+1)+'</div>Actuellement indisponible</div><div class="distance">'+distance.toFixed(1)+' km</div><div class="company"> '+ company + '</div><div class="theType">'+theType+'</div></div><div class="invisibleContainer"><div class="ticketTitle"> Description de la disponibilité</div><div class="ticketSubtitle">'+autreInfoDispo+'</div><div class="ticketTitle"> Adresse</div><div class="ticketSubtitle"> '+address+'</div><div class="ticketTitle"> Description de l\'accessibilité</div><div class="ticketSubtitle">'+auPublicNonDescription+'</div><div class="ticketTitle"> Description de l\'emplacement</div><div class="ticketSubtitle"> '+description+'</div><div class="theButs"  ><div class="retour" onclick="retour()">Retour</div><div class="the_dirs" onclick="calcRoute('+the_center_lat+','+the_center_lng+','+output_lat+','+output_lng+',\''+ company+'\','+theAvailability+')" >Directions</div></div></div></div>';				
				}
				else if(theAvailability == 2){
					text_output.innerHTML += '<div id="t_'+i+'" class="ticketContainer"><div onclick="address_onclick('+i+')" class="visibleContainer"><div class="dispo_2"><div class="ticketNum">'+(i+1)+'</div>Disponibilité non précisée</div><div class="distance">'+distance.toFixed(1)+' km</div><div class="company"> '+ company + '</div><div class="theType">'+theType+'</div></div><div class="invisibleContainer"><div class="ticketTitle"> Description de la disponibilité</div><div class="ticketSubtitle">'+autreInfoDispo+'</div><div class="ticketTitle"> Adresse</div><div class="ticketSubtitle"> '+address+'</div><div class="ticketTitle"> Description de l\'accessibilité</div><div class="ticketSubtitle">'+auPublicNonDescription+'</div><div class="ticketTitle"> Description de l\'emplacement</div><div class="ticketSubtitle"> '+description+'</div><div class="theButs"  ><div class="retour" onclick="retour()">Retour</div><div class="the_dirs" onclick="calcRoute('+the_center_lat+','+the_center_lng+','+output_lat+','+output_lng+',\''+ company+'\','+theAvailability+')" >Directions</div></div></div></div>';				
				}
				else if(theAvailability == 3){
					text_output.innerHTML += '<div id="t_'+i+'" class="ticketContainer"><div onclick="address_onclick('+i+')" class="visibleContainer"><div class="dispo_3"><div class="ticketNum">'+(i+1)+'</div>Vehicule</div><div class="distance">'+distance.toFixed(1)+' km</div><div class="company"> '+ company + '</div><div class="theType">'+theType+'</div></div><div class="invisibleContainer"><div class="ticketTitle"> Description de la disponibilité</div><div class="ticketSubtitle">'+autreInfoDispo+'</div><div class="ticketTitle"> Adresse</div><div class="ticketSubtitle"> '+address+'</div><div class="ticketTitle"> Description de l\'accessibilité</div><div class="ticketSubtitle">'+auPublicNonDescription+'</div><div class="ticketTitle"> Description de l\'emplacement</div><div class="ticketSubtitle"> '+description+'</div><div class="theButs"  ><div class="retour" onclick="retour()">Retour</div><div class="the_dirs" onclick="calcRoute('+the_center_lat+','+the_center_lng+','+output_lat+','+output_lng+',\''+ company+'\','+theAvailability+')" >Directions</div></div></div></div>';
				}
			} 	
		} //2
		map.fitBounds(bounds);
	});
}
function clearLocations() {
	document.getElementById("tickets_content_ur").innerHTML = "";
	infoWindow.close();
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers.length = 0;
	for (var i = 0; i < currentMarker.length; i++) {
		currentMarker[i].setMap(null);
	}
	currentMarker.length = 0;
}
function createCurrentPositionMarker(myLatLng) {

	var image = 'assets/position_actuelle.png';
	var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: image
	});
	currentMarker.push(marker);	 
	//document.getElementById("clickSecurity").style.display ="none";   
}
function downloadUrl(url, callback) {
	var request = window.ActiveXObject ?
	new ActiveXObject('Microsoft.XMLHTTP') :
	new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			request.onreadystatechange = doNothing;
			callback(request.responseText, request.status);
		}
	};
	request.open('GET', url, true);
	request.send(null);
}
function doNothing() {}
function parseXml(str) {
	if (window.ActiveXObject) {
		var doc = new ActiveXObject('Microsoft.XMLDOM');
		doc.loadXML(str);
		return doc;
	} else if (window.DOMParser) {
		return (new DOMParser).parseFromString(str, 'text/xml');
	}
}
function createMarker(latlng, company,theName,distance, address, description, theAvailability, the_center_lat, the_center_lng, output_lat, output_lng) {
	var icon = customIcons[theAvailability] || {};
	var marker = new google.maps.Marker({
		map: map,
		position: latlng,
		icon: icon.icon
	});
	
	google.maps.event.addListener(marker, 'click', function() {
		
	/*	
		if(theAvailability == 1){
			dispo = "<div class='infoWindow_availabilityContainer'><div class='infoWindow_availabilityLeft' style='background-color:#29a164;'></div><div class='infoWindow_availabilityCenter'><img src='assets/icon_dispo1.png' width='50' height='50'></div><div class='infoWindow_availabilityRight' style='background-color:#29a164;'>DEA actuellement disponible</div></div>"
		}
		else if(theAvailability == 0){
			dispo = "<div class='infoWindow_availabilityContainer'><div class='infoWindow_availabilityLeft' style='background-color:#ff1e10;'></div><div class='infoWindow_availabilityCenter'><img src='assets/icon_dispo2.png' width='50' height='50'></div><div class='infoWindow_availabilityRight' style='background-color:#ff1e10;'>DEA actuellement non disponible</div></div>"
		}
		else if(theAvailability == 2){
			dispo = "<div class='infoWindow_availabilityContainer'><div class='infoWindow_availabilityLeft' style='background-color:#ffa710;'></div><div class='infoWindow_availabilityCenter'><img src='assets/icon_dispo3.png' width='50' height='50'></div><div class='infoWindow_availabilityRight' style='background-color:#ffa710;'>Disponibilité du DEA non précisée</div></div>"
		}
		else if(theAvailability == 3){
			dispo = "<div class='infoWindow_availabilityContainer'><div class='infoWindow_availabilityLeft' style='background-color:#666666;'></div><div class='infoWindow_availabilityCenter'><img src='assets/icon_dispo4.png' width='50' height='50'></div><div class='infoWindow_availabilityRight' style='background-color:#666666;'>DEA situé dans un vehicule</div></div>"
		}
*/
		//var info = '<div class="infoWindow_container"><div id="directions_2" onclick="calcRoute('+the_center_lat+','+the_center_lng+','+output_lat+','+output_lng+',\''+company+'\','+theAvailability+')">DIRECTIONS</div><div class="infoWindow_name"><b>'+ company +'</b></div> <div class="infoWindow_address" style="font-size:.9em;"> '+ address +' </div><br />'+dispo+'</div>';

		//infoWindow.setContent(info);
		//infoWindow.open(map, marker);
		/*
		var extend_win = document.getElementById("tickets_content_ur").childNodes;
		var fullNum = extend_win.length;
		var num = markers.indexOf(marker);
		
		for(i=0;i< fullNum;i++){
			if(num !== i){
				extend_win[i].lastChild.style.display =  "none";
				extend_win[i].style.boxShadow =  "none";
				
			}
			else {
				if (extend_win[i].lastChild.style.display=='block'){
					extend_win[i].lastChild.style.display =  "none";
					
				}
				else{
					extend_win[i].scrollIntoView(true);
					extend_win[i].lastChild.style.display='block';
					
				}
			}		
		}
		*/	
	});
	markers.push(marker);
}
function address_onclick(num) {
	var myMap = document.getElementById('findMapContainer');
	var theRadius    = document.getElementById('theRadius');
	var tickets = document.getElementById('tickets_content_ur');
	
	//var theButs = document.getElementById('theButs');
	
	//theButs.style.display = "block";
	tickets.style.bottom = "10%";
	theRadius.style.display = "none";
	
	//document.getElementById('directions_container').style.visibility = 'hidden';	
	var ticket_childs = document.getElementById("tickets_content_ur").childNodes;
	var fullNum = ticket_childs.length;
	
	for(i=0;i<fullNum;i++){
		if(i== num){
			ticket_childs[i].lastChild.style.display="block";
		}
		else{
			ticket_childs[i].style.display="none";
		}
	}
	
	google.maps.event.trigger(markers[num], 'click');
	
	
	
}
function calcRoute(start_lat,start_lng,end_lat,end_lng, company, theAvailability) {
	
	var walk = document.getElementById('walk');
	var car = document.getElementById('car');
	
	if (car.className.match(/\bdirections_opt_container\b/)) {
		
		document.getElementById('directions_opt_container').innerHTML = '<div id="walk"  class="dir_opt_not_selected"onclick="calcRoute2(0,'+start_lat+','+start_lng+','+end_lat+','+end_lng+',\''+company+'\')">À PIED</div><div id="car"  class="dir_opt_selected" onclick="calcRoute2(1,'+start_lat+','+start_lng+','+end_lat+','+end_lng+',\''+company+'\')">EN VOITURE</div>';
		
	}
	else {	
		document.getElementById('directions_opt_container').innerHTML = '<div id="walk"  class="dir_opt_selected" onclick="calcRoute2(0,'+start_lat+','+start_lng+','+end_lat+','+end_lng+',\''+company+'\')">À PIED</div><div id="car" class="dir_opt_not_selected" onclick="calcRoute2(1,'+start_lat+','+start_lng+','+end_lat+','+end_lng+',\''+company+'\')">EN VOITURE</div>';
		
	}	
	
	
	var dir_nav = document.getElementById('dir_nav');
	if(theAvailability == 1){
		dir_nav.style.background = '#29A164';
		document.getElementById('dir_title').innerHTML = '<div>Direction pour :<span> '+company + '</span></div><div id="dir_img"><div>Actuellement disponible</div><div><img src="assets/icon_dispo1.png"></div></div>';
		
	}
	else if(theAvailability == 0){
		dir_nav.style.background = '#ff1e10';
		document.getElementById('dir_title').innerHTML = '<div>Direction pour :<span> '+company + '</span></div><div id="dir_img"><div>Non disponible</div><div><img src="assets/icon_dispo2.png"></div></div>';
		
	}
	else if(theAvailability == 2){
		dir_nav.style.background = '#ffa710';
		document.getElementById('dir_title').innerHTML = '<div>Direction pour :<span> '+company + '</span></div><div id="dir_img"><div>Disponibilité non précisée</div><div><img src="assets/icon_dispo3.png"></div></div>';
		
	}
	else{
		dir_nav.style.background = '#666666';
		document.getElementById('dir_title').innerHTML = '<div>Direction pour :<span> '+company + '</span></div><div id="dir_img"><div>Vehicule</div><div><img src="assets/icon_dispo4.png"></div></div>';
		
	}
	
	
	
	var start = start_lat +','+start_lng;
	var end = end_lat +','+end_lng;

	var request = {
		origin: start,
		destination: end,
		travelMode: google.maps.TravelMode.WALKING
	};
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
		  directionsDisplay.setDirections(response);
		}
	});
	document.getElementById('directions_container').style.visibility = 'visible';
}

function retour(){
	var myMap = document.getElementById('findMapContainer');
	var theRadius    = document.getElementById('theRadius');
	var tickets = document.getElementById('tickets_content_ur');
	var theButs = document.getElementById('theButs');
	var content = document.getElementById('searchNav_content_ur');
	
	
	theRadius.style.display = "block";
	//theButs.style.display = "none";
	tickets.style.bottom = "45%";
	
	var ticket_childs = document.getElementById("tickets_content_ur").childNodes;	
	for(i=0;i<ticket_childs.length;i++){
		ticket_childs[i].style.display="block";
	}
	//content.style.display = "none";
	var invisible_childs = document.getElementById("tickets_content_ur").childNodes;
	
	for(i=0;i< invisible_childs.length;i++){
		
			invisible_childs[i].lastChild.style.display =  "none";
			
			
			
	}
	
}




function ticket_info_ur(){
	
	var link            = document.getElementById('searchNav_search_ur');
	var content         = document.getElementById('searchNav_content_ur');
	var tickets         = document.getElementById('tickets_content_ur');
	var tickets_details = document.getElementById('tickets_details_ur');
	
	tickets_details.style.display= 'block';
	tickets.style.display= 'none';
	
}
function big_img_ur(){
	var img_bg  = document.getElementById('img_bg_ur');
	
		img_bg.style.display = 'block';
		
	
	
}
function small_img_ur(){
	var img_bg  = document.getElementById('img_bg_ur');
	
		img_bg.style.display = 'none';
}



//EXPLORER VOTRE ENVIRONEMENT
function display(){
	var controlContainer_ur = document.getElementById('controlContainer_ur');
	var controlContainer = document.getElementById('controlContainer');
	
	var link = document.getElementById('searchNav_search');
	var content = document.getElementById('searchNav_content');
	var tickets = document.getElementById('tickets_content');
	var tickets_details = document.getElementById('tickets_details');
	
	var searchNav_search_title      = document.getElementById('searchNav_search_title');
	var searchNav_search_back_picto = document.getElementById('searchNav_search_back_picto');
	var searchNav_search_picto 		= document.getElementById('searchNav_search_picto');
	
	var tickets_details = document.getElementById('tickets_details');
	var testContainer = document.getElementById('testContainer');
	var ticket_img = document.getElementById('ticket_img');
	var extra_info = document.getElementById('extra_info');
	var testContainer2 = document.getElementById('testContainer2');
	var ticket_logo = document.getElementById('ticket_logo1');
	var direction  = document.getElementById('direction');
	var arrows  = document.getElementById('arrows');
	
	
	controlContainer_ur.style.display = "none";
	
	if(testContainer.style.width == '38%'){
		
		testContainer.style.width = '100%';
		extra_info.style.display = 'none';
		
		
		ticket_img.style.width = '100%';
		tickets_details.style.width = '300px';
	
		testContainer2.style.width = '100%';
		ticket_logo.style.display = 'none';
		
		ticket_logo.style.width = '100%';
		ticket_logo.style.margin = '0px 0% 0px 0%';	
		direction.style.width = '100%';
		direction.style.marginTop = '10px';
		
		arrows.style.left = '300px';
		arrows.innerHTML = '<img src="assets/picto_4.png">';
		
	}
	else {
		if(tickets_details.style.display== 'block'){
			tickets.style.display = 'block';
			tickets_details.style.display = 'none';
		}
		else{
			if(content.style.display== 'none'){
				content.style.display = 'block';
				tickets.style.display = 'none';
				link.style.width='auto';
			
				searchNav_search_title.innerHTML ="RECHERCHER UN DEA"
				searchNav_search_back_picto.style.display = 'none';
				searchNav_search_picto.style.display = 'block';
			}
			else {
				content.style.display= 'none';
				tickets.style.display = 'none';
				link.style.width='auto';
				controlContainer_ur.style.display = "block";
			}	
		}
	}
	
	
	
}
function geo(){
	var link    = document.getElementById('searchNav_search');
	var content = document.getElementById('searchNav_content');
	var tickets = document.getElementById('tickets_content');
	
	var searchNav_search_title      = document.getElementById('searchNav_search_title');
	var searchNav_search_back_picto = document.getElementById('searchNav_search_back_picto');
	var searchNav_search_picto 		= document.getElementById('searchNav_search_picto');
	
	
	
	searchNav_search_title.innerHTML ="RETOUR"
	searchNav_search_back_picto.style.display = 'block';
	searchNav_search_picto.style.display = 'none';
	
	content.style.display= 'none';
	tickets.style.display = 'block';
	link.style.width='320px';
}
function ticket_info(){
	
	var link            = document.getElementById('searchNav_search');
	var content         = document.getElementById('searchNav_content');
	var tickets         = document.getElementById('tickets_content');
	var tickets_details = document.getElementById('tickets_details');
	
	tickets_details.style.display= 'block';
	tickets.style.display= 'none';
	
}
function big_window(){
	var tickets_details = document.getElementById('tickets_details');
	var testContainer = document.getElementById('testContainer');
	var ticket_img = document.getElementById('ticket_img');
	var extra_info = document.getElementById('extra_info');
	var testContainer2 = document.getElementById('testContainer2');
	var ticket_logo = document.getElementById('ticket_logo1');
	var direction  = document.getElementById('direction');
	var arrows  = document.getElementById('arrows');
	
	
	
	if(testContainer.style.width == '100%'){
		
		testContainer.style.width = '38%';
		extra_info.style.display= 'block';
		
		
		ticket_img.style.width = '60%';
		tickets_details.style.width = '60%';
	
		testContainer2.style.width= '60%';
		ticket_logo.style.display= 'block';
		ticket_logo.style.width= '20%';
		ticket_logo.style.margin= '10px 10% 10px 10%';	
		direction.style.width = '38%';
		direction.style.marginTop = '30px';
		arrows.style.left = '60%';	
		arrows.innerHTML = '<img src="assets/picto_5.png">';
		
		
		
	}
	else {
		testContainer.style.width = '100%';
		extra_info.style.display = 'none';
		
		
		ticket_img.style.width = '100%';
		tickets_details.style.width = '300px';
	
		testContainer2.style.width = '100%';
		ticket_logo.style.display = 'none';
		
		ticket_logo.style.width = '100%';
		ticket_logo.style.margin = '0px 0% 0px 0%';	
		direction.style.width = '100%';
		direction.style.marginTop = '10px';
		
		arrows.style.left = '300px';
		arrows.innerHTML = '<img src="assets/picto_4.png">';
	}
}
function big_img(){
	var img_bg  = document.getElementById('img_bg');
	
		img_bg.style.display = 'block';
		
	
	
}
function small_img(){
	var img_bg  = document.getElementById('img_bg');
	
		img_bg.style.display = 'none';
}







//]]>
	
	




