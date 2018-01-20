

$(document).delegate("#home-page", "pageinit", function() {
	console.log("emailvalidation");
	
	// To listen to the clicking event of sending email
	$("#newsletterSendEmail").on("click", function () {
		
		var userEmail = $('#newsletterInputEmail').val();
		var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		var errorText = $('.sendEmail-popup').find("p");
		
		if($.trim(userEmail).length === 0) {
			
			errorText.text( "Empty" );
			
			
		}else if(regex.test(userEmail) === true){
			
			errorText.text( "Valid" );
			
		}else {
			
			errorText.text( "Invalid" );
			
		}
		
	});
	
});

