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
    return this.hasMany('App/Models/TherapistSpecialization', "id", 'therapist_id')
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
  activity_list () {
    return this.hasOne('App/Models/ActivityList', 'id', 'therapist_id')
  }
  patient_therapists () {
    return this.hasMany('App/Models/PatientTherapist', 'id', 'therapist_id')
  }
}

module.exports = Therapist
