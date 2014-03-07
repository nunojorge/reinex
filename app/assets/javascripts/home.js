$(document).ready (function() {

	$( "#ingredient" ).autocomplete({
      source: function( request, response ) {
        $.ajax({
          url: "http://api.yummly.com/v1/api/metadata/ingredient?_app_id=24d6787a&_app_key=96f1d514381c608c7a935da725cbb2f2",
          dataType: "jsonp",
          success: function( data ) {
            response( $.map( data.ingredient, function( item ) {
              return {
                label: item.searchValue,
                value: item.description
              }
            }));
          }
        });
      },
      minLength: 2,
      select: function( event, ui ) {
        log( ui.item ?
          "Selected: " + ui.item.label :
          "Nothing selected, input was " + this.value);
      }
    });
  });