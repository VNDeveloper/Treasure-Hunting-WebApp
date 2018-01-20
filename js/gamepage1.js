$(document).on('pagebeforeshow', '#playgame1-page', function(){ 
	
	var map;
 
	map = new google.maps.Map(document.getElementById('map'), {
				
		center: {lat: -33.92, lng: 151.25},
		zoom: 13,
		maxZoom: 18,
		minZoom: 10,
		
	});
	
	
		  
	
});

