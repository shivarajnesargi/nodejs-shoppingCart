$("[name='cardNumber']").change(function(){
	var input = $("[name='cardNumber']");
	if(input.val().substring(0, 1) == 4) {
		$('#cardlogo').addClass('fa-cc-visa');
	}
	if(input.val().substring(0, 2) == 34 || input.val().substring(0, 2) == 37) {
		$('#cardlogo').addClass('fa-cc-amex');
	}
	if(input.val().substring(0, 2) == 51 || input.val().substring(0, 2) == 52 || input.val().substring(0, 2) == 53 || input.val().substring(0, 2) == 54 || input.val().substring(0, 2) == 55) {
		$('#cardlogo').addClass('fa-cc-mastercard');
	}
	if(input.val().substring(0, 4) == 6011 || input.val().substring(0, 2) == 65) {
		$('#cardlogo').addClass('fa-cc-discover');
	}
	else if(input.val().length === 0) {
		$('#cardlogo').removeClass('fa-cc-visa fa-cc-amex fa-cc-mastercard fa-cc-discover');
	};
});

Stripe.setPublishableKey('pk_test_XZ8g0KLAxWOtXym355NDUfb0');

  var $form = $('#payment-form');

$form.submit(function(event){
	console.log("IN submit")
	console.log('20'+$('#cardExpiry').val().substring(3,5));
	console.log($('#cardExpiry').val().substring(0,2));
	$('#payment-errors').addClass('hidden');
	$form.find('button').prop('disabled', true);
	Stripe.card.createToken({
  number: $('#cardNumber').val(),
  cvc: $('#cardCVC').val(),
  exp_month: $('#cardExpiry').val().substring(0,2),
  exp_year: '20'+$('#cardExpiry').val().substring(3,5)
}, stripeResponseHandler);
	return false;
});

function stripeResponseHandler(status, response) {

	console.log("IN stripeResponseHandler");
  if (response.error) { // Problem!

    // Show the errors on the form
    $('#payment-errors').text(response.error.message);
    $('#payment-errors').removeClass('hidden');
    $form.find('button').prop('disabled', false); // Re-enable submission

  } else { // Token was created!

    // Get the token ID:
    var token = response.id;

    // Insert the token into the form so it gets submitted to the server:
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));

    // Submit the form:
    $form.get(0).submit();

  }
}

