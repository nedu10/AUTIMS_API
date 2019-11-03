'use strict'

class ActivityListCreation {
  get rules () {
    return {
      // validation rules
      activity_title: 'required'
    }
  }
  get messages() {
    return {
      "activity_title.required": "Your Activity title is required"
    }
  }
  async fails (errorMessages) {
    return this.ctx.response.status(404).json({
      status: "Failed",
      message: errorMessages
    })
  }
}

module.exports = ActivityListCreation
