
	json.id @user.id
	json.username @user.username
	json.nickname @user.nickname
	json.profession @user.profession
	json.avatar @user.avatar.attached? ? url_for(@user.avatar) : nil
