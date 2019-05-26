class Api::V1::UserRecapsController < ApplicationController

  def show
    @user_recap = UserRecap.find(params[:id])
    render json: @user_recap
  end

end
