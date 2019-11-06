'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TherapistSpecializationSchema extends Schema {
  up () {
    this.create('therapist_specializations', (table) => {
      table.increments()
      table.string('therapist_email').notNullable().references('email').inTable('therapists')
      table.string('specialization_title', 1000).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('therapist_specializations')
  }
}

module.exports = TherapistSpecializationSchema
