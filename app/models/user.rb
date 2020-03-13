# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
	validates :username, :password_digest, :session_token, presence: true, uniqueness: true
	validates :password, length: {minimum: 6, allow_nil: true}

	attr_reader :password

	has_and_belongs_to_many :channels
	has_many :messages,
	foreign_key: :sender_id,
	class_name: "Message"

	has_one_attached :avatar
	
	before_validation :ensure_session_token

	def ensure_session_token
		self.session_token ||= SecureRandom.urlsafe_base64
	end

	def password=(password)
		@password = password
		self.password_digest = BCrypt::Password.create(password)
	end

	def is_password?(password)
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	def reset_session_token!
		self.session_token = SecureRandom.urlsafe_base64
		self.save!
		self.session_token
	end

	def self.find_by_credentials(username, password)
		user = User.find_by(username: username)
		if user && user.is_password?(password)
			return user
		else
			return nil
		end
	end


end


# daisy = User.find_by_id(68)
# file = File.open('app/assets/images/user.jpg')
# daisy.avatar.attach(io: file, filename: 'user.jpg')
# daisy.avatar.attached?