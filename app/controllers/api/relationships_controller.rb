module Api
  class RelationshipsController < ApplicationController

    def create
      binding.pry
      user = User.find(params[:followed_id])
      # params = 渡ってきた情報の中の[]にある名前の情報を探してくれ
      current_user.follow(user)
      render :json
    end

    def destroy
      user = Relationship.find(params[:id]).followed
      current_user.unfollow(user)
      render :json
    end
  end
end
