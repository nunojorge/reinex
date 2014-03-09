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
			alert(item.val()+" is added and the array looks like this: "+ingredientList.join(""));

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
			alert(urlTwo);
			$.ajax({
  				dataType: "jsonp",
  				url: urlTwo ,
  				}).done(function (data ) {
  					alert(data.totalMatchCount);


  			});
			 /*$.getJSON(urlTwo, function(matches) {
              $('#recipes').html('<p> First ID: ' + matches[0].id + '</p>');
              $('#recipes').append('<p>second ID : ' + matches[1].id+ '</p>');
              $('#recipes').append('<p> Third ID: ' + matches[2].id+ '</p>');
           });*/

		});
	});