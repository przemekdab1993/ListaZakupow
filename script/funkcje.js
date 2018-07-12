var $button = $('button');
var $submit = $('input:submit');
var $product = $('input:text');
var buf_3;

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
		//UKRYCIE I USUNIĘCIE Z LISTY ELEMENTU ZAŁATWIONEGO //
		if ($target.is('.cold'))
		{
			localStorage.removeItem($target.attr('id'));
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
function add_product(product, k) 
{
	var $list = $('ul');
	var $li = $('<li id="storage_' + k + '">' + product + '</li>');
	$list.append($li);
	
	$li.on('click', function(e) { click_product(e); });
	$('input').hide();
	$button.show();
}

$( function() 
{
	// WYPISANIE ELEMENTÓW LISTY Z PAMIĘCI //
	var i = 0;
	var k = 0;
	while( i < localStorage.length)
	{
		if (localStorage.getItem('storage_'	+ k))
		{
			add_product(localStorage.getItem('storage_' + k), k);
			i++;
			k++;
		} else
		{
			k++;
		}
	buf_3 = k;
	}
		
	$('input').hide();
	
	$button.on('click', function() { show_form(); });
	$submit.on('click', function() {
		if($product.val() != '') { 
			buf_3++;
			add_product($product.val(), buf_3);
			localStorage.setItem('storage_' + buf_3 , $product.val()); 
			$product.val('');
		} 
		preventDefault(); 
	});
});
