var $przycisk = $('button');
var $sub = $('input:submit');
var $produkt = $('input:text');
var tabela_produkt = ['jabłka', 'pomidory', 'masło', 'mleko'];


function pokaz()
{
	$('button').hide();
	$('input').fadeIn(700);
}
function klik(e)
{
	var its = e.target;
	var $tar = $(its);
	 
	if ($tar.is('.hot'))
	{
		$tar.removeClass('hot');
		$tar.addClass('cold');
		$tar.animate({ opacity: 0.5 }, 800, function() {$kopia = $tar.detach(); $kopia.appendTo('ul'); });
	} 
	else 
	{
		if ($tar.is('.cold'))
		{
			$tar.animate({ opacity: 0.0, paddingLeft: 0 }, 1200, function() {$tar.remove(); });
		}
		else
		{
			$tar.addClass('hot');
		}
	}
}
function dodaj(produkt) 
{
	
	var $list = $('ul');
	var $li = $('<li>' + produkt + '</li>');
	
	$list.append($li);
	$li.on('click', function(e) { klik(e); });
	$('input').hide();
	$przycisk.show();
}

$( function() 
{
	for (var i = 0; i < tabela_produkt.length; i++)
	{
		dodaj(tabela_produkt[i]);
	}
	$('input').hide();
	
	$przycisk.on('click', function() { pokaz(); });
	$sub.on('click', function(produkt) { if($produkt.val() != '') { dodaj($produkt.val()); $produkt.val(''); } preventDefault();  });
});
