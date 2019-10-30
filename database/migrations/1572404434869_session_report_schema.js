'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SessionReportSchema extends Schema {
  up () {
    this.create('session_reports', (table) => {
      table.increments()
      table.integer('patient_id').notNullable().unsigned().references('id').inTable('patients')
      table.integer('therapist_id').notNullable().unsigned().references('id').inTable('therapists')
      table.string('date', 255).defaultTo(Date.now())
      table.string('initial_assesment')
      table.string('session_summary')
      table.string('final_assesment')
      table.string('other_notes')
      table.timestamps()
    })
  }

  down () {
    this.drop('session_reports')
  }
}

module.exports = SessionReportSchema
