'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActivityListSchema extends Schema {
  up () {
    this.create('activity_lists', (table) => {
      table.increments()
      table.integer('patient_id').notNullable().unsigned().references('id').inTable('patients')
      table.integer('therapist_id').notNullable().unsigned().references('id').inTable('therapists')
      table.string('activity_period', 254).notNullable()
      table.string('activity_title').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('activity_lists')
  }
}

module.exports = ActivityListSchema
