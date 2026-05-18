interface AuthLikeError {
  code?: string;
  message?: string;
  status?: number;
}

const authErrorMessages: Record<string, string> = {
  anonymous_provider_disabled: "Anonymous sign-in is not enabled.",
  captcha_failed: "The security check failed. Please try again.",
  email_address_invalid: "Enter a valid email address.",
  email_address_not_authorized: "This email address is not allowed to sign in.",
  email_exists: "An account with this email already exists. Try logging in.",
  email_not_confirmed: "Please confirm your email before logging in.",
  email_provider_disabled: "Email login is not enabled for this project.",
  invalid_credentials: "Email or password is incorrect.",
  over_email_send_rate_limit: "Too many emails were sent. Please wait and try again.",
  over_request_rate_limit: "Too many attempts. Please wait a moment and try again.",
  phone_not_confirmed: "Please confirm your phone number before logging in.",
  provider_disabled: "This sign-in method is not enabled.",
  request_timeout: "The request timed out. Please try again.",
  signup_disabled: "New signups are currently disabled.",
  user_already_exists: "An account with this email already exists. Try logging in.",
  user_banned: "This account cannot sign in.",
  user_not_found: "Email or password is incorrect.",
  validation_failed: "Check your details and try again.",
  weak_password: "Choose a stronger password.",
};

export function getAuthErrorMessage(error: AuthLikeError) {
  if (error.code && authErrorMessages[error.code]) {
    return authErrorMessages[error.code];
  }

  if (error.message?.toLowerCase().includes("already registered")) {
    return "An account with this email already exists. Try logging in.";
  }

  if (error.message?.toLowerCase().includes("password")) {
    return "Check your password and try again.";
  }

  return "Something went wrong. Please try again.";
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
