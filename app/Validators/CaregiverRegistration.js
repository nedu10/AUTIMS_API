'use strict'

class CaregiverRegistration {
  get rules () {
    return {
      // validation rules
      name: 'required',
      phone_no: 'required',
      email: 'required|email',
    }
  }
  get messages() {
    return {
      "name.required": "Your Name is required",
      "phone_no.required": "Your Phone Number is required",
      "email.required": "Your Email is required",
      "email.email": "Please input a valid email"
    }
  }
  async fails (errorMessages) {
    return this.ctx.response.status(404).json({
      status: "Failed",
      message: errorMessages
    })
  }
}

module.exports = CaregiverRegistration
