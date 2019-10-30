'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Patient extends Model {
    therapist () {
        return this.belongsTo('App/Models/Therapist')
      }
      parent () {
        return this.belongsTo('App/Models/Parent','parent_email', 'email')
      }
      session_reports () {
        return this.hasMany('App/Models/SessionReport')
      }
      monthly_reports () {
        return this.hasMany('App/Models/MonthlyReport')
      }
      activity_list () {
        return this.hasOne('App/Models/ActivityList')
      }
      patient_therapist () {
        return this.hasOne('App/Models/PatientTherapist')
      }
      observation_reports () {
        return this.hasMany('App/Models/ObservationReport')
      }
}

module.exports = Patient
