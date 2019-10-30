'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PatientTherapistSchema extends Schema {
  up () {
    this.create('patient_therapists', (table) => {
      table.increments()
      table.integer('patient_id').notNullable().unsigned().references('id').inTable('patients')
      table.integer('therapist_id').notNullable().unsigned().references('id').inTable('therapists')
      table.integer('parent_id').notNullable().unsigned().references('id').inTable('parents')
      table.boolean('parent_verified').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('patient_therapists')
  }
}

module.exports = PatientTherapistSchema
