'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MonthlyReportSchema extends Schema {
  up () {
    this.create('monthly_reports', (table) => {
      table.increments()
      table.integer('patient_id').notNullable().unsigned().references('id').inTable('patients')
      table.integer('therapist_id').notNullable().unsigned().references('id').inTable('therapists')
      table.string('month', 255).defaultTo(Date.now())
      table.string('recap_base')
      table.string('recap_improv')
      table.string('recap_comm')
      table.string('alt_base')
      table.string('alt_improv')
      table.string('alt_comm')
      table.string('motor_base')
      table.string('motor_improv')
      table.string('motor_comm')
      table.string('self_base')
      table.string('self_improv')
      table.string('self_comm')
      table.string('behav_base')
      table.string('behav_improv')
      table.string('behav_comm')
      table.timestamps()
    })
  }

  down () {
    this.drop('monthly_reports')
  }
}

module.exports = MonthlyReportSchema
