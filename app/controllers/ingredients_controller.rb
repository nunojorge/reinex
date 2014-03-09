class IngredientsController < ApplicationController
  def index
  	@ingredients = Ingredient.all
  	respond_to do |format|
  		format.json {render json: @ingredients}
  	end
  end
end
