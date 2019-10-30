'use strict'

class TherapistRegisteration {
  get rules () {
    return {
      // validation rules
      name: 'required',
      phone_no: 'required',
      workplace: 'required',
      address: 'required',
      gender: 'required',
      password: 'required',
      email: 'required|email|unique:therapists',
    }
  }
  get messages() {
    return {
      "name.required": "Your Name is required",
      "phone_no.required": "Your Phone Number is required",
      "workplace.required": "Your Workplace is required",
      "gender.required": "Your Gender is required",
      "address.required": "Your Address is required",
      "password.required": "Your Password is required",
      "email.required": "Your Email is required",
      "email.email": "Please input a valid email",
      "email.unique": "This Email already exist"
    }
  }
  async fails (errorMessages) {
    return this.ctx.response.status(404).json({
      status: "Failed",
      message: errorMessages
    })
  }
}

module.exports = TherapistRegisteration
