class Api::V1::StoriesController < ApplicationController

  def index
    @recaps = Story.all.group_by {|story| [story.user_id, story.recap]}
    @sorted_recaps = @recaps.sort_by {|key, value| key[0]}
    @sorted_recaps.flatten!(1)
    render json: @sorted_recaps
  end

  def create
    Story.create(full_story: params[:full_story], user_id: params[:user_id], recap: params[:recap])
  end

  def show
    @story = Story.find(params[:id])
    render json: @story
  end

end
