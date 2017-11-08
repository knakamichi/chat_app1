module Api
  class Messagescontroller < ApplicationController

    def index
      @messages = Message.all
      render json: @messages
    end
  end


end
