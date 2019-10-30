'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Caregiver extends Model {
   
    parent () {
        return this.belongsTo('App/Models/Parent')
      }
      observation_reports () {
        return this.hasMany('App/Models/ObservationReport', 'email', 'creator_email')
      }
      user () {
        return this.belongsTo('App/Models/User', 'email', 'email')
      }
}

module.exports = Caregiver
