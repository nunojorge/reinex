$(document).ready (function() {
    var animating = false;

    $('.Button').click(function(){

        var $this = $(this);
        $this.toggleClass('Button');
        if($this.hasClass('Button')){
            $this.text('Open');
            if(animating) return;
            var door = $('.door');
            animating = true;
            closeDoor(door, -90);
        } else {
            if(animating) return;
            var door = $('.door');
            animating = true;
            openDoor(door, 5);
            $this.text('Close');
        }
    });
    function openDoor(door, angle) {
        if(angle <= -120) {
            animating = false;
            return;
        }
        door.css('-webkit-transform', 'perspective(200px) rotateY( '+angle+'deg )');
        setTimeout(function() {
            openDoor(door, angle-=5);
            },
        100);
    }

    function closeDoor(door, angle) {
        if(angle > 0) {
            animating = false;
            return;
        }
        door.css('-webkit-transform', 'perspective(200px) rotateY( '+angle+'deg )');
        setTimeout(function() {
            closeDoor(door, angle+=5);
        }, 100);
    }
    function removeRecipesAndExercises() {
        $( "li" ).remove( '.child' );
    }
    var ingredientList = new Array();

    $('ul').on('click','span', function(){
        removeRecipesAndExercises();
        $(this).closest('li').remove();
        var ingredientWithX = $(this).closest('li').text();
        var ingredientWithoutX = ingredientWithX.substring(0, ingredientWithX.length - 2 );
        var index = ingredientList.indexOf(ingredientWithoutX);
        ingredientList.splice(index, 1);
        ingredientList.splice(index - 1,1);
    });
    $('#add').click(function() {
        removeRecipesAndExercises();
        var item = $("#one-ingredient").val();
        $('ul').prepend("<li>"+item+"<span> x</span></li>");
        ingredientList.push("&allowedIngredient[]=");
        ingredientList.push(item);
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
                    $('.recipes-list').prepend("<li class='child'><img src='"+image+"' alt='"+name+"' height='25' width='25'><a href='"+url+"' target='_blank'>"+name+"</a><button id='addRecipeToUser' type='button'>+</button></li>");

                    var grams =  0;
                    var kcals = 0;
                    var IUs = 0;
                    for (var i = 0; i < data.nutritionEstimates.length; i++) {
                        if (!data.nutritionEstimates[i].unit.abbreviation) {
                            continue;
                        }
                        else if(data.nutritionEstimates[i].unit.abbreviation === "kcal"){
                            kcals = kcals + data.nutritionEstimates[i].value;

                        }
                        else if(data.nutritionEstimates[i].unit.abbreviation === "g"){
                            grams = grams + data.nutritionEstimates[i].value ;
                        }
                        else if(data.nutritionEstimates[i].unit.abbreviation === "IU"){
                            IUs = IUs + data.nutritionEstimates[i].value;
                        }

                    }
                    var calsToBurn = ( grams /7.716) + ( kcals/1000 );
                    $('.exercises-list').prepend("<li class='child'>Calories to burn: "+calsToBurn+"</li>");
                    }
                    );
                }
            }
        );
    });
});