function loadTipueSearch() {
	$('#search').on('shown.bs.modal', function () {
		$('#tipue_search_input').focus();
	})
	$('.searchHint').focus(function(event) {
		$('#search').modal({})
	})
	$('.search').focus(function(event) {
		 $('#tipue_search_input').tipuesearch({
				 'mode' : 'json',
				 'show': 4,
				 'newWindow': false,
				 'contentLocation': '/tipuesearch_content.json'
			 });
	});
}