var locations = [
	['SS Great Britain', 'location1', -33.890542, 151.274856]
];

	function initMap() {}

	$(document).on('pageshow', '#searchGame-page', function initMap() {

		var map;

		map = new google.maps.Map(document.getElementById('map'), {

			center: {
				lat: -33.92,
				lng: 151.25
			},
			zoom: 13,
			maxZoom: 18,
			minZoom: 10,

		});

		var infowindow = new google.maps.InfoWindow();

		var marker, i;

		for (i = 0; i < locations.length; i++) {
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(locations[i][2], locations[i][3]),
				map: map
			});

			google.maps.event.addListener(marker, 'click', (function (marker, i) {
				return function () {
					infowindow.setContent(locations[i][0]);
					infowindow.open(map, marker);

					$('#pointOfInterestList li').each(function (index) {

						if (this.id == locations[i][1]) {

							this.click();

						}

					});

				}
			})(marker, i));
		}


		//Dynamicly create the point of interest base on the amount of marker
		var output = '<ul id="pointOfInterestList">';

		for (i = 0; i < locations.length; i++) {

			output += '<li class="pointOfInterestListItem" id="' + locations[i][1] + '"><p><img src="Images/Icon/poiLeftIcon.png" alt="trainIcon"><span>' + locations[i][0] + '</span></p></li>';

			console.log("list id" + locations[i][1]);
		}

		output += "</ul>";

		document.getElementById("displayListOfPOI").innerHTML = output;

		//connect to Json
		$.getJSON('locationInfoArray.json', function (data) {

			console.log(data.locations[0].id);
			// Listen to click event of the list
			$('#pointOfInterestList li').click(function () {

				var index;

				for (var i = 0; i < data.locations.length; i++) {

					if (data.locations[i].id == this.id) {;

						index = i;

					}

				}

				console.log("index " + index);
				$('#TitleOfPOI').text(data.locations[index].name);
				$('.singleImage img').attr('src', data.locations[index].picture);
				$('.markerDifficult img').attr('src', data.locations[index].difficulty);
				$('.markerFavourite img').attr('src', data.locations[index].favourite);
				$('#markerPointText').text(data.locations[index].points);
				$('#rewards').text(data.locations[index].reward);
				$('.buttonArea a').attr('href', data.locations[index].gamepage);
				$('.buttonArea .ui-btn').css("background-color", '#114c5f');
				$('.buttonArea .ui-btn').css("color", '#f3e9d2');

				$('.pointOfInterestListItem').css("background-color", '#114c5f');
				$('.pointOfInterestListItem').css("color", '#f3e9d2');
				$('.pointOfInterestListItem').css("padding", '2px 0 2px 20px');
				$(this).css("background-color", '#f3e9d2');
				$(this).css("color", '#114c5f');
				$(this).css("padding", '4px 0 4px 20px');

			});

		});
	});


	var favourite = [];
	$(document).on('pagehide', '#playgame1-page', function () {

		$('.slickArea').slick('unslick');

	});

$(document).on('pageinit', '#playgame1-page', function () {

	// To see whether the user has already add the location to the favourite list
		$.each(favourite, function (index, value) {

			if (favourite.length === 0) {

				console.log("The favourite list is empty");
				$('#addFavouriteBtnLoc1').removeClass('ui-disabled');

			} else if (favourite[index] == "location1") {

				$('#addFavouriteBtnLoc1').addClass('ui-disabled');

			} else {

				$('#addFavouriteBtnLoc1').remove('ui-disabled');

			}

		});


});

	$(document).on('pageshow', '#playgame1-page', function () {

		var gameMap1;
		console.log(favourite);
		gameMap1 = new google.maps.Map(document.getElementById('gameMap'), {

			center: {
				lat: -33.92,
				lng: 151.25
			},
			zoom: 13,
			maxZoom: 18,
			minZoom: 10,

		});



		$('#addFavouriteBtnLoc1').click(function () {

			favourite.push('location1');
			$(this).addClass('ui-disabled');
			console.log(favourite);

		});

		//slider plugin

		$('.slickArea').slick({

			dots: true,
			infinite: false,
			speed: 300,
			slidesToShow: 3,
			slidesToScroll: 3,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true,
						dots: true
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}

  ]

		});



		//gallery plugin
		$(".swipebox").swipebox({

			hideCloseButtonOnMobile: false,

		});



	});

	var favouriteListMapArray = [];
	$(document).on('pagehide', '#favourites-page', function () {

		favouriteListMapArray = [];
		favourite = [];

	});
	//Favourite jquery area
	$(document).on('pageshow', '#favourites-page', function () {

		console.log("favourite in favourite" + favourite);

		//To check if the favourite list is empty or not
		if (favourite.length == 0) {

			//debug
			console.log("no one add to favourite");

		} else {

			//Create the row for the array list
			for (var b = 0; b < favourite.length; b++) {

				favouriteListMapArray.push([]);

			}

			//To search for user favourite whether or not exist in the current locations
			for (var i = 0; i < locations.length; i++) {

				match = false;

				for (var j = 0; j < favourite.length; j++) {


					if (locations[i][1] == favourite[j]) {

						match = true;

					}

				}

				if (match) {

					//If there is a match push the value into the same row
					for (var c = 0; c < 4; c++) {

						favouriteListMapArray[i].push(locations[i][c]);

					}

				}


			}

		}

		console.log("favouriteListMap " + favouriteListMapArray);
		console.log("location " + locations);
		var favMap;

		//To create the map base on the user input
		favMap = new google.maps.Map(document.getElementById('favMap'), {

			center: {
				lat: -33.92,
				lng: 151.25
			},
			zoom: 13,
			maxZoom: 18,
			minZoom: 10,

		});

		var infowindow = new google.maps.InfoWindow();

		var marker, i;

		for (i = 0; i < favouriteListMapArray.length; i++) {
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(favouriteListMapArray[i][2], favouriteListMapArray[i][3]),
				map: favMap
			});

			google.maps.event.addListener(marker, 'click', (function (marker, i) {
				return function () {
					infowindow.setContent(favouriteListMapArray[i][0]);
					infowindow.open(favMap, marker);

					$('#pointOfInterestList li').each(function (index) {

						if (this.id == favouriteListMapArray[i][1]) {

							this.click();

						}

					});


				}
			})(marker, i));
		}

		//Dynamicly create the point of interest base on the amount of marker
		var output = '<ul id="favpointOfInterestList">';

		for (i = 0; i < favouriteListMapArray.length; i++) {

			output += '<li class="favpointOfInterestListItem" id="' + favouriteListMapArray[i][1] + '"><p><img src="Img/poiLeftIcon.png" alt="trainIcon"><span>' + favouriteListMapArray[i][0] + '</span></p></li>';

			console.log("list id" + favouriteListMapArray[i][1]);
		}

		output += "</ul>";

		document.getElementById("displayFavourite").innerHTML = output;

		//connect to Json
		$.getJSON('locationInfoArray.json', function (data) {

			var index;
			// Listen to click event of the list
			$('#favpointOfInterestList li').click(function () {


				for (var i = 0; i < data.locations.length; i++) {

					if (data.locations[i].id == this.id) {;

						index = i;

					}

				}

				$('#favTitleOfPOI').text(data.locations[index].name);
				$('.favsingleImage img').attr('src', data.locations[index].picture);
				$('.favmarkerDifficult img').attr('src', data.locations[index].difficulty);
				$('.favmarkerFavourite img').attr('src', data.locations[index].favourite);
				$('#favmarkerPointText').text(data.locations[index].points);
				$('#favRewards').text(data.locations[index].reward);
				$('#favPlay').attr('href', data.locations[index].gamepage);
				$('#favRemove').attr('href', data.locations[index].id);

				$('.favpointOfInterestListItem').css("background-color", '#114c5f');
				$('.favpointOfInterestListItem').css("color", '#f3e9d2');
				$('.favpointOfInterestListItem').css("padding", '2px 0 2px 20px');
				$(this).css("background-color", '#f3e9d2');
				$(this).css("color", '#114c5f');
				$(this).css("padding", '4px 0 4px 20px');


			});

		});


	});
