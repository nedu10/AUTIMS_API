'use strict'

class TherapistLogin {
  get rules () {
    return {
      // validation rules
      password: 'required',
      email: 'required|email',
    }
  } 
  get messages() {
    return {
      "email.required": "Your Email is required",
      "email.email": "Please input a valid email",
      "password.required": "Your Password is required"
    }
  }
  async fails (errorMessages) {
    return this.ctx.response.status(404).json({
      status: "Failed",
      message: errorMessages
    })
  }
}

module.exports = TherapistLogin
