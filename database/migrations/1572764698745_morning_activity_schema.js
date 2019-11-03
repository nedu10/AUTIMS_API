'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MorningActivitySchema extends Schema {
  up () {
    this.create('morning_activities', (table) => {
      table.increments()
      table.integer('patient_id').notNullable().unsigned().references('id').inTable('patients')
      table.integer('therapist_id').notNullable().unsigned().references('id').inTable('therapists')
      table.string('activity_title').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('morning_activities')
  }
}

module.exports = MorningActivitySchema
