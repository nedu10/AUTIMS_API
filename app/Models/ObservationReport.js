'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ObservationReport extends Model {
      patient () {
        return this.belongsTo('App/Models/Patient')
      }
      parent () {
        return this.belongsTo('App/Models/Parent', 'creator_email', 'email')
      }
      caregiver () {
        return this.belongsTo('App/Models/Caregiver', 'creator_email', 'email') // changed caregiver to Caregiver
      }
}

module.exports = ObservationReport
