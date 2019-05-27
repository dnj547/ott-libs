class Api::V1::UsersController < ApplicationController

  def index
    render json: @users
  end

  # def new
  #   @user = User.new
  # end

  def create
    @user = User.create(name: params[:name])
  end

  def show
    @user = User.find(params[:name])
    render json: @user
  end
  #
  # private
  #
  # def user_params
  #   params.require(:name)
  # end

end
