
 function init_map() {
		var myLocation = new google.maps.LatLng(33.642913,72.963696);
		  
        var mapOptions = {
          center: myLocation,
          zoom: 17
        };
		
		var marker = new google.maps.Marker({
			position: myLocation,
			title:"Codistan"});
			
        var map = new google.maps.Map(document.getElementById("map-container"),
            mapOptions);
		
		marker.setMap(map);	

      }
	  
      google.maps.event.addDomListener(window, 'load', init_map);