module Api
  class RelationshipsController < ApplicationController

    def create
      @user = User.find(params[:followed_id])
      # params = 渡ってきた情報の中の[]にある名前の情報を探してくれ
      follow = current_user.follow(@user)
      render json: follow
    end

    def destroy
      @user = Relationship.find(params[:id]).followed
      unfollow = current_user.unfollow(@user)
      render json: unfollow
    end
  end
end
