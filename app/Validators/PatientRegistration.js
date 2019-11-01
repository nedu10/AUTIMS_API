'use strict'

class PatientRegistration {
  get rules () {
    return {
      // validation rules
      name: 'required',
      age: 'required',
      diagnosis: 'required',
      summary: 'required',
      parent_name: 'required',
      parent_phone: 'required',
      gender: 'required',
      parent_email: 'required|email',
    }
  }
  get messages() {
    return {
      "name.required": "Your Name is required",
      "age.required": "Your Age is required",
      "diagnosis.required": "Your diagnosis is required",
      "gender.required": "Your Gender is required",
      "summary.required": "Your summary is required",
      "parent_name.required": "Your parent_name is required",
      "parent_email.required": "Your Parent Email is required",
      "parent_email.email": "Please input a valid email"
    }
  }
  async fails (errorMessages) {
    return this.ctx.response.status(404).json({
      status: "Failed",
      message: errorMessages
    })
  }
}

module.exports = PatientRegistration
