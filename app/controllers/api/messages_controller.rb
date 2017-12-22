module Api
  class MessagesController < ApplicationController
  before_action :authenticate_user!

    def index
      to_id = User.find(params[:id])
      current_user_id = current_user.id
      message = Message.where(
        "(sender_id = ? and receiver_id = ?) or (sender_id = ? and receiver_id = ?)",
        current_user_id, to_id, to_id, current_user_id
      )
      # @messages = Message.all.where(
      #   'sender_id IN (?) AND receiver_id IN (?)',
      #   [@message.sender_id, @message.receiver_id],
      #   [@message.sender_id, @message.receiver_id]
      # )
      render json: message
    end

    # def new
    #   @message = current_user.sent_messages.build
    # end

    def create
      if params[:content]
        # message = Message.new(sender_id: current_user.id, reciever_id: friend_id, content: content)
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

    private

      # def message_params
      #   # params[:message] があればその値を、なければ {} として評価される。
      #   params.require(:message, {}).permit(:contents, :sender_id, :receiver_id, :image)
      # end
  end

end
