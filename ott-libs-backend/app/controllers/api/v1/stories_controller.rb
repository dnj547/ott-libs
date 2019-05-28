class Api::V1::StoriesController < ApplicationController

  def index
    render json: @stories
  end

  def create
    Story.create(full_story: params[:full_story], user_id: params[:user_id], recap: params[:recap])
  end

  def show
    @story = Story.find(params[:id])
    render json: @story
  end

end
