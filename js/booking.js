$(document).on('pageshow', '#booking-page', function () {
	
	var calculateAmount;
	var amount = 470;
	$("#totalAmount").text("£ 4.70");
	
	
	$('#select-choice-mini').bind("change", function(event, ui) {
		calculateAmount = 0;
		var ticketSelected = $(this).find('option:selected');
		
		var ticketValueSelected = ticketSelected.val();
		
		calculateAmount = amount * ticketValueSelected;
		console.log(calculateAmount);
		calculateAmount = calculateAmount / 100;
		$("#totalAmount").text("£ " + calculateAmount.toFixed(2));
		calculateAmount = calculateAmount * 100;
	});
	
	calculateAmount = amount;
	
	var handler = StripeCheckout.configure({
  key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
  locale: 'auto',
  token: function(token) {
 
  }
});

document.getElementById('payBtn').addEventListener('click', function(e) {
	
  handler.open({
    name: 'Voyage',
    description: 'Ticket Payment',
	currency: 'GBN',
    zipCode: true,
	currency: 'GBP',
    amount: calculateAmount
  });
  e.preventDefault();
});

// Close Checkout on page navigation:
window.addEventListener('popstate', function() {
  handler.close();
});

});