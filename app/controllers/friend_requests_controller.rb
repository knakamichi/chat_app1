  class FriendRequestsController < ApplicationController
    before_action :set_friend_request, except: [:index, :create]
    before_action :authenticate_user!

    # view incoming and outgoing friend requests
    def index
      # binding.pry
      @incoming = FriendRequest.where(friend: current_user)
      @outgoing = current_user.friend_requests
    end

    # send a friend request to another user
    def create
      friend = User.find(params[:friend_id])
      @friend_request = current_user.friend_requests.new(friend: friend)
      if @friend_request.save
        render :show, status: :created, location: @friend_request
      else
        render json: @friend_request.errors, status: :unprocessable_entity
      end
    end

    # to accept friend requests
    def update
      @friend_request.accept
      # head :no_content # = returns an http response 200 with no body
      redirect_to root_path
    end

  # to decline friend requests
    def destroy
      binding.pry
      @friend_request.destroy
      # head :no_content
      redirect_to root_path
    end

    private

    def set_friend_request
      @friend_request = FriendRequest.find(params[:id])
    end

  end
