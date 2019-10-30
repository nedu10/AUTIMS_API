'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PatientTherapist extends Model {
    therapist () {
        return this.belongsTo('App/Models/Therapist')
      }
      patient () {
        return this.belongsTo('App/Models/Patient')
      }
      parent () {
        return this.belongsTo('App/Models/Parent')
      }
}

module.exports = PatientTherapist
