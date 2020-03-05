require 'test_helper'

class Api::UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get api/sessons" do
    get api_users_api/sessons_url
    assert_response :success
  end

end
