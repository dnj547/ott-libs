class Api::V1::UserRecapsController < ApplicationController

  def index
    render json: @user_recaps
  end

  def show
    @user_recap = UserRecap.find(params[:id])
    render json: @user_recap
  end

end
