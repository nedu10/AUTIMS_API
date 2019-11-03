'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MorningActivity extends Model {
    therapist () {
        return this.belongsTo('App/Models/Therapist')
      }
      patient () {
        return this.belongsTo('App/Models/Patient')
      }
}

module.exports = MorningActivity
