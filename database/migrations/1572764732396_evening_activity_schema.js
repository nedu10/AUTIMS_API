'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EveningActivitySchema extends Schema {
  up () {
    this.create('evening_activities', (table) => {
      table.increments()
      table.integer('patient_id').notNullable().unsigned().references('id').inTable('patients')
      table.integer('therapist_id').notNullable().unsigned().references('id').inTable('therapists')
      table.string('activity_title').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('evening_activities')
  }
}

module.exports = EveningActivitySchema
