class Api::V1::RecapStoriesController < ApplicationController

  def show
    @recap_story = RecapStory.find(params[:id])
    render json: @recap_story
  end

end
