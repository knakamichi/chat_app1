module Api
  class MessagesController < ApplicationController
  before_action :authenticate_user!

    def index
      if params[:id]
        to_id = User.find(params[:id])
        current_user_id = current_user.id
        message = Message.where(
          "(sender_id = ? and receiver_id = ?) or (sender_id = ? and receiver_id = ?)",
          current_user_id, to_id, to_id, current_user_id
        )
      end
      render json: message
    end

    def create
      if params[:content]
        @message = current_user.sent_messages.build(content: params[:content], receiver_id: params[:receiver_id])
        @message.save
        render json: @message
      elsif params[:image]
        @message = current_user.sent_messages.new(receiver_id: params[:receiver_id])
        @message.image = params[:image]
        @message.save
        render json: @message
      end
    end

    def destroy
      to_id = User.find(params[:id])
      message = Message.where(
        "(sender_id = ? and receiver_id = ?) or (sender_id = ? and receiver_id = ?)",
        current_user.id, to_id, to_id, current_user.id
      )
      message.destroy_all
      render json: message
    end
  end
end
