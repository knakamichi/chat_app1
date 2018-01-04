class User < ActiveRecord::Base
  mount_uploader :image, AvatarUploader
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :lastseenable
  include DateTimezone
  has_many :friend_requests, dependent: :destroy
  has_many :pending_friends, through: :friend_requests, source: :friend
  has_many :friendships, dependent: :destroy
  has_many :friends, through: :friendships
  has_many :sent_messages, :class_name => "Message", :foreign_key => "sender_id"
  has_many :received_messages, :class_name => "Message", :foreign_key => "receiver_id"
  validates_integrity_of  :image
  validates_processing_of :image

  def self.search(search)
    where("name LIKE ?", "%#{search}%")
  end

  def remove_friend(friend, current_user_id)
    current_user = User.where(id: current_user_id)
    friends = Friendship.where(friend_id: friend, user_id: current_user)
    friends.destroy(friends)
  end

  private
    def image_size_validation
      errors[:image] << "should be less than 500KB" if image.size > 0.5.megabytes
    end
end
