class Api::V1::RecapsController < ApplicationController

  def index
    @recaps = Recap.all
    render json: @recaps
  end

end
