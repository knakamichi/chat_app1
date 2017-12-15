module Api
  class RelationshipsController < ApplicationController
    before_action :authenticate_user!

    def create
        @user = User.find(params[:followed_id])
      # params = 渡ってきた情報の中の[]にある名前の情報を探してくれ
        if @user != current_user
          follow = current_user.follow(@user)
          follow.save
          render json: follow
        end
    end

    def destroy
      @relationship = current_user.active_relationships.where(followed_id: current_user.id).first
      if @relationship
        @user = Relationship.find_by(follower_id: params[:id]) # params内の数値をfollower_idに当てはめて探せ
        current_user.unfollow(@user)
      else
        @user = Relationship.find_by(followed_id: params[:id]).followed
        current_user.unfollow(@user)
      end
      friends = current_user.friends
      render json: friends
    end
  end
end
