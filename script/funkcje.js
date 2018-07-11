var $button = $('button');
var $submit = $('input:submit');
var $product = $('input:text');

var tabela_produkt = ['jabłka', 'pomidory', 'masło', 'mleko'];

// UKRYCIE PRZYCISKU I POKAZANIE FORMULAŻA DODAJĄCEGO NOWY PRODUKT //
function show_form()
{
	$button.hide();
	$('input').fadeIn(700);
}
// REAKCJA NA KLIKNIĘCIE ELEMENTU LISTY //
function click_product(e)
{
	var its = e.target;
	var $target = $(its);
	 
	 // ZMIANA Z WAŻNEGO STATUSU NA ZAŁATWIONY //
	if ($target.is('.hot'))
	{
		$target.removeClass('hot');
		$target.addClass('cold');
		$target.animate({ opacity: 0.5 }, 800, function() {
			var $buf = $target.detach(); 
			$buf.appendTo('ul'); 
		});
	} 
	else 
	{
		//UKRYWANIE NA LIŚCIE ELEMENTU ZAŁATWIONEGO //
		if ($target.is('.cold'))
		{
			$target.animate({ opacity: 0.0, paddingLeft: 0 }, 1200, function() {$target.remove(); });
		}
		//ZMIANA Z NORMALNEGO NA WAŻNY STATUS //
		else	
		{
			$target.addClass('hot');
		}
	}
}
// DODAWANIE NOWEGO PUNKTU DO LISTY //
function add_product(product) 
{
	var $list = $('ul');
	var $li = $('<li>' + product + '</li>');
	$list.append($li);
	
	$li.on('click', function(e) { click_product(e); });
	$('input').hide();
	$button.show();
}

$( function() 
{
	// WYPISANIE ELEMENTÓW LISTY Z PAMIĘCI //
	for (var i = 0; i < tabela_produkt.length; i++)
	{
		add_product(tabela_produkt[i]);
	}
	$('input').hide();
	
	$button.on('click', function() { show_form(); });
	$submit.on('click', function() {
		
		if($product.val() != '') { 
			add_product($product.val()); 
			$product.val('');
		} 
		preventDefault(); 
	});
});
