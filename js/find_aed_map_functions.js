//<![CDATA[

var customIcons = {
  0: {
    icon: 'assets/pointer_1.png'
  },
  1: {
    icon: 'assets/pointer_2.png'
  },
  2: {
    icon: 'assets/pointer_3.png'
  },
  3: {
    icon: 'assets/pointer_4.png'
  }
};


function load() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(50.286343, 5.793865),
    zoom: 8,
    mapTypeId: 'roadmap'
  });
 
  
  var infoWindow = new google.maps.InfoWindow;
  // Change this depending on the name of your PHP file
  downloadUrl("php/find_aed/initialMap.php", function(data) {
    var xml = data.responseXML;
    var markers = xml.documentElement.getElementsByTagName("marker");
    for (var i = 0; i < markers.length; i++) {
      var name = markers[i].getAttribute("name");
      var address = markers[i].getAttribute("address");
	  var description = markers[i].getAttribute("description");
      var date = markers[i].getAttribute("date");
	  var currentAvailability = markers[i].getAttribute("currentAvailability");
	  var dispo;
	  if(currentAvailability == 1){
		  dispo = "<div class='infoWindow_availabilityContainer'><div class='infoWindow_availabilityLeft' style='background-color:#105dfb;'></div><div class='infoWindow_availabilityCenter'><img src='assets/icon_dispo1.png' width='50' height='50'></div><div class='infoWindow_availabilityRight' style='background-color:#105dfb;'>DEA actuellement disponible</div></div>"
	  }
	  else if(currentAvailability == 0){
		  dispo = "<div class='infoWindow_availabilityContainer'><div class='infoWindow_availabilityLeft' style='background-color:#ff1e10;'></div><div class='infoWindow_availabilityCenter'><img src='assets/icon_dispo2.png' width='50' height='50'></div><div class='infoWindow_availabilityRight' style='background-color:#ff1e10;'>DEA actuellement non disponible</div></div>"
	  }
	  else if(currentAvailability == 2){
		  dispo = "<div class='infoWindow_availabilityContainer'><div class='infoWindow_availabilityLeft' style='background-color:#ffa710;'></div><div class='infoWindow_availabilityCenter'><img src='assets/icon_dispo3.png' width='50' height='50'></div><div class='infoWindow_availabilityRight' style='background-color:#ffa710;'>Disponibilité du DEA inconnue</div></div>"
	  }
	  else if(currentAvailability == 2){
		  dispo = "<div class='infoWindow_availabilityContainer'><div class='infoWindow_availabilityLeft' style='background-color:#666666;'></div><div class='infoWindow_availabilityCenter'><img src='assets/icon_dispo14.png' width='50' height='50'></div><div class='infoWindow_availabilityRight' style='background-color:#666666;'>DEA situé dans un vehicule</div></div>"
	  }
      var point = new google.maps.LatLng(
          parseFloat(markers[i].getAttribute("lat")),
          parseFloat(markers[i].getAttribute("lng")));
      var html = "<div class='infoWindow_container'><div class='infoWindow_name'><b>" + date + "</b></div> <div class='infoWindow_address' style='font-size:.9em;'>" + address+ "</div><br />"+dispo+"<br/><div class='infoWindow_clickForDetails' style='font-size:.9em;'>Cliquez sur le pointeur pour plus de details</div></div>" ;
      var icon = customIcons[currentAvailability] || {};
      var marker = new google.maps.Marker({
        map: map,
        position: point,
        icon: icon.icon
      });
      bindInfoWindow(marker, map, infoWindow, html);	
    }
  });  
}

function bindInfoWindow(marker, map, infoWindow, html) {
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
}


function downloadUrl(url, callback) {
  var request = window.ActiveXObject ?
      new ActiveXObject('Microsoft.XMLHTTP') :
      new XMLHttpRequest;

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
    }
  };

  request.open('GET', url, true);
  request.send(null);
}

function doNothing() {}

//]]>
