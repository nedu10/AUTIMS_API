'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Parent extends Model {
    
      user () {
        return this.belongsTo('App/Models/User', 'email', 'email')
      }
      
    caregivers () {
        return this.hasMany('App/Models/Caregiver', 'id', 'parent_id')
      }
      patient () {
        return this.hasOne('App/Models/Patient', 'email', 'parent_email')
      }
      patient_therapists () {
        return this.hasMany('App/Models/PatientTherapist', 'id', 'parent_id')
      }
      observation_reports () {
        return this.hasMany('App/Models/ObservationReport', 'id', 'creator_id')
      }
}

module.exports = Parent
