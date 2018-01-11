class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]

  def new
    super
  end

  def create
    super
  end

  def edit
    super
  end

  def update
    super
  end

  def destroy
    super
  end

  def cancel
    super
  end

  protected

    def configure_sign_up_params
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :email, :password, :password_confirmation])
    end

    def configure_account_update_params
      devise_parameter_sanitizer.permit(:account_update, keys: [:name, :email, :password, :password_confirmation])
    end

    def after_sign_up_path_for(resource)
      root_path
    end

    def after_inactive_sign_up_path_for(resource)
      signup_path
    end

    def update_resource(resource, params)
      resource.update_without_password(params)
    end

    def after_update_path_for(resource)
      current_user
    end

end
