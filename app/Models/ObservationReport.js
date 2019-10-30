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
        return this.belongsTo('App/Models/caregiver', 'creator_email', 'email')
      }
}

module.exports = ObservationReport
