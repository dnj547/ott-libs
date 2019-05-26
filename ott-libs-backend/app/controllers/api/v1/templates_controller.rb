class Api::V1::TemplatesController < ApplicationController

  def index
    render json: @templates
  end

end
