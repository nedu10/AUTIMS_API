'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AfternoonActivitySchema extends Schema {
  up () {
    this.create('afternoon_activities', (table) => {
      table.increments()
      table.integer('patient_id').notNullable().unsigned().references('id').inTable('patients')
      table.integer('therapist_id').notNullable().unsigned().references('id').inTable('therapists')
      table.string('activity_title').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('afternoon_activities')
  }
}

module.exports = AfternoonActivitySchema
