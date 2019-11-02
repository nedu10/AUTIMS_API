// 'use strict'

// class MonthlyReportCreation {
//   get rules () {
//     return {
//       // validation rules
//       initial_assesment: 'required',
//       session_summary: 'required',
//       final_assesment: 'required'
//     }
//   }
//   get messages() {
//     return {
//       "initial_assesment.required": "Your initial assessment is required",
//       "session_summary.required": "Your Session summary is required",
//       "final_assesment.required": "Your final assessment is required"
//     }
//   }
//   async fails (errorMessages) {
//     return this.ctx.response.status(404).json({
//       status: "Failed",
//       message: errorMessages
//     })
//   }
// }

// module.exports = MonthlyReportCreation
