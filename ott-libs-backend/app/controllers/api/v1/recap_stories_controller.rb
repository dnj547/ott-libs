class Api::V1::RecapStoriesController < ApplicationController

  def index
    render json: @recap_stories
  end

  def show
    @recap_story = RecapStory.find(params[:id])
    render json: @recap_story
  end

end
