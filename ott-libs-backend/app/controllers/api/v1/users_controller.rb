class Api::V1::UsersController < ApplicationController

  def index
    render json: @users
  end

  def create
    @user = User.find_or_create_by(name: params[:name])
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

end
