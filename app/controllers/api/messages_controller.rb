module Api
  class MessagesController < ApplicationController

    def index
      @messages = Message.all
      render json: @messages
    end

    def create
      content = params[:content]
      message = Message.new
      message.content.save
    end
  end

end
