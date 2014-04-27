//<![CDATA[
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
function initialize(elementId) {
	infoWindow = new google.maps.InfoWindow();
    var callback = function (data, status, xhr) {
        //data will be the xml returned from the server
        if (status == 'success') {
            createMap(elementId, data);
        }
    };
    //using jQuery to fire off an ajax request to load the xml,
    //using our callback as the success function
    $.ajax(
        {
            url : 'php/find_aed/initialMap.php',
            dataType : 'xml',
            success : callback
        }
    );
}
function createMap(elementId, xml) {
	var mapOptions = {
		mapTypeControl: false
	}
	var i, xmlMarker, lat, lng, latLng,
	map = new google.maps.Map(
		document.getElementById(elementId),mapOptions,
		{
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
	),
	infoWindow = new google.maps.InfoWindow(),
	xmlMarkers = xml.getElementsByTagName('marker'),
	markers = [],
	latlngs = [],
	bounds = new google.maps.LatLngBounds();


	
function createMarker(latlng, name, currentAvailability, description, address) {
	latlngs.push(latlng);
	var icon = customIcons[currentAvailability] || {};
	var marker = new google.maps.Marker({
		map: map,
		position: latlng,
		icon: icon.icon
	});
	google.maps.event.addListener(
		marker,
		"click",
		function () {
			if(currentAvailability == 1){
				dispo = "<div class='infoWindow_availabilityContainer'><div class='infoWindow_availabilityLeft' style='background-color:#105dfb;'></div><div class='infoWindow_availabilityCenter'><img src='assets/icon_dispo1.png' width='50' height='50'></div><div class='infoWindow_availabilityRight' style='background-color:#105dfb;'>DEA actuellement disponible</div></div>"
			}
			else if(currentAvailability == 0){
				dispo = "<div class='infoWindow_availabilityContainer'><div class='infoWindow_availabilityLeft' style='background-color:#ff1e10;'></div><div class='infoWindow_availabilityCenter'><img src='assets/icon_dispo2.png' width='50' height='50'></div><div class='infoWindow_availabilityRight' style='background-color:#ff1e10;'>DEA actuellement non disponible</div></div>"
			}
			else if(currentAvailability == 2){
				dispo = "<div class='infoWindow_availabilityContainer'><div class='infoWindow_availabilityLeft' style='background-color:#ffa710;'></div><div class='infoWindow_availabilityCenter'><img src='assets/icon_dispo3.png' width='50' height='50'></div><div class='infoWindow_availabilityRight' style='background-color:#ffa710;'>Disponibilité du DEA inconnue</div></div>"
			}
			else if(currentAvailability == 3){
				dispo = "<div class='infoWindow_availabilityContainer'><div class='infoWindow_availabilityLeft' style='background-color:#666666;'></div><div class='infoWindow_availabilityCenter'><img src='assets/icon_dispo4.png' width='50' height='50'></div><div class='infoWindow_availabilityRight' style='background-color:#666666;'>DEA situé dans un vehicule</div></div>"
			}
			var info = "<div class='infoWindow_container'><div class='infoWindow_name'><b>" + name + "</b></div> <div class='infoWindow_address' style='font-size:.9em;'>" + address + "</div><br />"+dispo+"<br/><div class='infoWindow_clickForDetails' style='font-size:.9em;'>Cliquez sur le pointeur pour plus de details</div></div>";
			infoWindow.setContent(info);
			infoWindow.open(map, marker);
		}
	);
	markers.push(marker);
}


for (i = 0; i < xmlMarkers.length; i++) {
	xmlMarker = xmlMarkers[i];
	//lat & lng in the xml file are strings, convert to Number
	lat = Number(xmlMarker.getAttribute('lat'));
	lng = Number(xmlMarker.getAttribute('lng'));
	latLng = new google.maps.LatLng(lat, lng);
	createMarker(
		latLng,
		xmlMarker.getAttribute('name'),
		xmlMarker.getAttribute('currentAvailability'), 
		xmlMarker.getAttribute('description'),
		xmlMarker.getAttribute('address')
	);
	}
	markerCluster = new MarkerClusterer(map, markers);
	for (i = 0; i < latlngs.length; i++) {
		bounds.extend(latlngs[i]);
	}
	map.fitBounds(bounds);
	return map;
}
google.maps.event.addDomListener(window,'load',function (){initialize('map');});
