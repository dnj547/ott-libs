class Api::V1::UsersController < ApplicationController

  def index
    render json: @users
  end

  def show
    @user = User.find(params[:name])
    render json: @user
  end

end
