class Api::V1::RecapsController < ApplicationController

  def index
    render json: @recaps
  end

  def show
    @recap = Recap.find(params[:id])
    render json: @recap
  end

end
