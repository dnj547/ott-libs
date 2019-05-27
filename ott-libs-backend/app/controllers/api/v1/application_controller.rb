class Api::V1::ApplicationController < ActionController::API

  before_action :grab_all

  def grab_all
    @users = User.all
    @recaps = Recap.all
    @stories = Story.all
  end

end
