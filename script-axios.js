$(document).ready(start);

function start(){
	prepWord();
	inputBar();
}

function prepWord() {
	$('#user-input').on('focus', function() {
		$(this).attr('placeholder','');
	});
	$('#user-input').on('blur', function() {
		$(this).attr('placeholder',"search here, or...");
	});
	$('#user-input').on('input',function() { 
		$('#search').empty();
		$(this).val();
		var noSpaceText = $(this).val().replace(/\s/,'%20');
		console.log(noSpaceText);
		searchWiki(noSpaceText);  
  	});  
}

function searchWiki(word) {
	var url = 'https://en.wikipedia.org/w/api.php';
	axios.get(url, {
		params: {
			action: 'opensearch',
			datatype: 'json',
			// limit: 5,
			search: word,
			origin: '*'
		}	
	})
	.then(function(response) {
		if (word != "") {
			for (var i = 0; i < response.data[1].length; i++) {
				var content = $('div#search').append(`<div class="title">${response.data[1][i].toUpperCase()}</div><div class="text">${response.data[2][i]}</div><a target="_blank" href="${response.data[3][i]}">more info here</a>`);
			}
		} else {
			$('div.title').remove();
		}		
	})
	.catch(function(error) {
    	console.log(error);
  	});
  	return;
}

// Remove search icon & random search and activate input bar
function inputBar(){
	$("i.fa.fa-search.fa-4x").on('click', function() {
		$('div.hidden').removeClass('hidden');
		$('section#search-icon').addClass('hidden');
		$('.inner-hi').addClass('hidden');
		$('.random a').removeClass('hidden');
		$('#user-input').css({
			letterSpacing: '3px',
			transition: '5s 2s all ease-out'
		});
	});
} 
