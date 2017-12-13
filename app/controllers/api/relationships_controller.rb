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
      @user = Relationship.find(params[:id]).followed
      unfollow = current_user.unfollow(@user)
      render json: unfollow
    end
  end
end
