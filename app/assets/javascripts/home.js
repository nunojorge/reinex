/*$(document).ready (function() {
        // function set_metadata(word, array){
        // 	alert(word);
        // }
        function log( message ) {
            $( "<div/>" ).text( message ).prependTo( "#log" );
            $( "#log" ).attr( "scrollTop", 0 );
        }

        $( "#ingredient" ).autocomplete({
            source: function( request, response ) {
                $.ajax({
                    url: "http://api.yummly.com/v1/api/metadata/ingredient?_app_id=24d6787a&_app_key=96f1d514381c608c7a935da725cbb2f2",
                    dataType: "jsonp",
                    data: {
                        name_startsWith: request.term
                    },
                    jsonpCallback: 'set_metadata',

                    success: function( data ) {
                    	console.log(data);
                    	console.log(data[0])


                    	// for Matt: why is data only the first parameter of the response?

                        // response( $.map( data.result, function( item ) {
                        //     return {
                        //         label: item.tags,
                        //         value: item.tags
                        //     }
                        // }));
                    }
                });
            },
            minLength: 2,
            select: function( event, ui ) {
                log( ui.item ?
                    "Selected: " + ui.item.label :
                    "Nothing selected, input was " + this.value);
            },
            open: function() {
                $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
            },
            close: function() {
                $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
            }
        });
    });*/

	$(document).ready (function() {
		var ingredientList = new Array();
		$( "#ingredient" ).autocomplete({
			source: [
			"salt",
			"garlic",
			"cognac",
			"sugar",
			"butter",
			"onion",
			"eggs",
			"water",
			"pepper",
			"black pepper",
			"garlic cloves",
			"all-purpose flour",
			"milk",
			"flour",
			"brown sugar",
			"lemon juice",
			"unsalted butter",
			"tomatoes",
			"vanilla extraxt",
			"carrots",
			"baking soda",
			"extra-virgin olive oil",
			"vanilla",
			"green onions"]
		});
		$('#add').click(function() {
			var item = $('#ingredient');
			$('ul').prepend("<li>"+item.val()+"<span> x</span></li>");
			ingredientList.push("&allowedIngredient[]=");
			ingredientList.push(item.val());

		});
		$('ul').on('click','span', function(){
			$(this).closest('li').remove();
			var ingredientWithX = $(this).closest('li').text();
			var ingredientWithoutX = ingredientWithX.substring(0, ingredientWithX.length - 2 );
			var index = ingredientList.indexOf(ingredientWithoutX);
			ingredientList.splice(index, 1);
			ingredientList.splice(index - 1,1);
		});
		$('#getRecipes').click(function() {
			var allowedIngredientList = ingredientList.join("");
			var urlOne = "http://api.yummly.com/v1/api/recipes?_app_id=24d6787a&_app_key=96f1d514381c608c7a935da725cbb2f2";
			var urlTwo = urlOne + allowedIngredientList;
			$.ajax({
  				dataType: "jsonp",
  				url: urlTwo,
  				}).done(function (data ) {
  					var listOfIds = new Array();
  					for (var i=0; i< 5; i++){
  						listOfIds[i] = data.matches[i].id;
  					}
     				for(var i=0; i<5; i++){
					 	var urlA="http://api.yummly.com/v1/api/recipe/";
					 	var urlC="?_app_id=24d6787a&_app_key=96f1d514381c608c7a935da725cbb2f2";
					 	var urlB=listOfIds[i];
					 	var urlD = urlA+urlB+urlC;
					 	$.ajax({
					 		dataType: "jsonp",
					 		url: urlD,
					 		}).done(function (data) {
								var name = data.name;
								var url = data.source.sourceRecipeUrl;
								var image = data.images[0].hostedSmallUrl;
								$('ol').prepend("<li><img src='"+image+"' alt='"+name+"' height='25' width='25'><a href='"+url+"' target='_blank'>"+name+"</a></li>");
					 		}
						);
					}
				}
			);

		});
	});