class IngredientsController < ApplicationController
  def index
  	full_ingredients = Ingredient.all
  	@ingredients = []

  	full_ingredients.each do |ingredient|
  		@ingredients << ingredient.name
  	end


  	respond_to do |format|
  		format.json {render json: @ingredients}
  	end
  end
end
