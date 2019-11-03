'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ObservationReportSchema extends Schema {
  up () {
    this.create('observation_reports', (table) => {
      table.increments()
      table.integer('patient_id').notNullable().unsigned().references('id').inTable('patients')
      table.integer('creator_id').notNullable()
      table.string('date', 255).defaultTo(Date.now())
      table.string('title').notNullable()
      table.string('summary').notNullable()
      table.string('suggestions')
      table.timestamps()
    })
  }

  down () {
    this.drop('observation_reports')
  }
}

module.exports = ObservationReportSchema
