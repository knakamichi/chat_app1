class Message < ActiveRecord::Base
  # belongs_to :user
  belongs_to :sender, :class_name=>"User", :foreign_key=>"sender_id"
  belongs_to :receiver, :class_name=>"User", :foreign_key=>"receiver_id"
  validates :sender_id, presence: true
  validates :receiver_id, presence: true
  # validates :content, presence: true

  mount_uploader :image, ImageUploader
  validates_processing_of :image
  validate :image_size_validation

  private
    def image_size_validation
      errors[:image] << "should be less than 500KB" if image.size > 0.5.megabytes
    end
end
