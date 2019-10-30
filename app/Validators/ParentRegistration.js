'use strict'

class ParentRegistration {
  get rules () {
    return {
      // validation rules
      name: 'required',
      phone_no: 'required',
      child_name: 'required',
      child_age: 'required',
      child_gender: 'required',
      address: 'required',
      gender: 'required',
      password: 'required',
      email: 'required|email|unique:parents',
    }
  }
  get messages() {
    return {
      "name.required": "Your Name is required",
      "phone_no.required": "Your Phone Number is required",
      "child_name.required": "Your child_name is required",
      "gender.required": "Your Gender is required",
      "child_age.required": "Your child_age is required",
      "address.required": "Your address is required",
      "child_gender.required": "Your child_gender is required",
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

module.exports = ParentRegistration
