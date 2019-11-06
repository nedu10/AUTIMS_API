'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TherapistSpecialization extends Model {
    therapist () {
        return this.belongsTo('App/Models/Therapist', 'therapist_email', 'email')
      }
}

module.exports = TherapistSpecialization
