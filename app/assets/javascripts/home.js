$(document).ready (function() {

	$( "#todo" ).autocomplete({

		source: [{"label":"salt"},{"label":"sugar"}] });
    $('#add').click(function() {
                 var item = $('#todo')
                 $('ul').prepend("<li>"+item.val()+"</li>");
                 });
                 $('ul').on('click','li', function(){
                 $(this).remove();
                 });

});

