'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class Therapist extends Model {
  
  user () {
    return this.belongsTo('App/Models/User', 'email', 'email')
  }
  therapist_specializations () {
    return this.hasMany('App/Models/TherapistSpecialization', "email", 'therapist_email')
  }
  patients () {
    return this.hasMany('App/Models/Patient', 'id', 'therapist_id')
  }
  session_reports () {
    return this.hasMany('App/Models/SessionReport', 'id', 'therapist_id')
  }
  monthly_reports () {
    return this.hasMany('App/Models/MonthlyReport', 'id', 'therapist_id')
  }
  morning_activities () {
    return this.hasMany('App/Models/MorningActivity')
  }
  afternoon_activities () {
    return this.hasMany('App/Models/AfternoonActivity')
  }
  evening_activities () {
    return this.hasMany('App/Models/EveningActivity')
  }
  patient_therapists () {
    return this.hasMany('App/Models/PatientTherapist', 'id', 'therapist_id')
  }
}

module.exports = Therapist
