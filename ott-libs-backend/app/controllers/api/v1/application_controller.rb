class Api::V1::ApplicationController < ActionController::API
  
  before_action :grab_all

  def grab_all
    @users = User.all
    @recaps = Recap.all
    @stories = Story.all
    @templates = Template.all
    @recap_stories = RecapStory.all
    @user_recaps = UserRecap.all
  end

end
