class Api::V1::UsersController < ApplicationController

  def index
    @stories = Story.all
    @users = User.all
    render json: @users
  end

end
