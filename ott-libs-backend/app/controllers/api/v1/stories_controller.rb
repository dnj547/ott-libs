class Api::V1::StoriesController < ApplicationController

  def index
    render json: @stories
  end

  def create

  end

  def show
    @story = Story.find(params[:id])
    render json: @story
  end

end
