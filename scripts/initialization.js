$(function() {
	
	$(window).on('hashchange', function() {
		var uri = decodeURI(window.location.hash); 
		render(uri);
	});

	$(window).trigger('hashchange');

	function clear() {
		$('.page').hide();
	}

	function render(url) {
		var temp = url.split('/')[0];
		$('.main-content .page').hide();

		var map = {
			'' : function() {
				renderFormPage();
			},

			'#board' : function() {
				renderBoardPage(null);
			}
		};

		if (map[temp]) {
			map[temp]();
		} else {
			renderErrorPage();
		}
	}

	function renderFormPage() {
		clear();
		$('.intro-form').show();
	}

	function renderBoardPage() {
		var noRows = 7,
			noColumns = 7;

		clear();
		$('.game-board').show();

	}

	function renderErrorPage() {
		clear();
		$('.error-page').show();
	}

	$("#paramForm").submit(function(event) {
		event.preventDefault();
	});

	Handlebars.registerHelper("button", function(row, col, context) {
		return new Handlebars.SafeString(
				"<input type='button' id='" + 
					row + "-" + col + "'  class='btn-box' onclick='setNewPosition()'/>" 
//					" data-toggle='modal' data-target='#myModal' />"
			);
	});

	$('[data-toggle="tooltip"]').tooltip();
});
