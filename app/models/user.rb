class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :active_relationships,                           # looks for the Relationhip model
            class_name: "Relationship",
            foreign_key: "follower_id",                   # id to connect two different tables; looks for the "follower_id"column
            dependent: :destroy
  has_many :passive_relationships,
            class_name:  "Relationship",
            foreign_key: "followed_id",
            dependent: :destroy
  has_many :following, through: :active_relationships, source: :followed       # railsはfollowingを見てrelationshipsテーブルのfollowed_idを使って対象のユーザーの集合を取得してくる（名前をfollowed に置き換えておいて、しかし元はfolloweds)
  has_many :followers, through: :passive_relationships, source: :follower    # followers に値する集合の取得

  def self.search(search)
    where("name LIKE ?", "%#{search}%")
  end

  def friends
      following + followers  # user.friendsのようにしてuserの全ての友達にアクセス可能
  end

  # Follows a user.
  def follow(other_user)
    active_relationships.create(followed_id: other_user.id)
  end

  # Unfollows a user.
  def unfollow(other_user)
    active_relationships.find_by(followed_id: other_user.id).destroy
  end

  # Returns true if the current user is following the other user.
  def following?(other_user)
    following.include?(other_user)
  end

end
