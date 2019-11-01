'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PatientSchema extends Schema {
  up () {
    this.create('patients', (table) => {
      table.increments()
      table.integer('therapist_id').notNullable().unsigned().references('id').inTable('therapists')
      table.string('name', 254).notNullable()
      table.string('phone_no', 254)
      table.string('age', 64).notNullable()
      table.string('gender', 64).notNullable()
      table.string('diagnosis').notNullable()
      table.string('summary').notNullable()
      table.string('parent_name', 254).notNullable()
      table.string('parent_phone', 254).notNullable()
      table.string('parent_email').notNullable().references('email').inTable('parents')
      table.string('relationship', 254)
      table.string('creation_time', 255).defaultTo(Date.now())
      table.boolean('parent_verified').defaultTo(false)
      table.boolean('is_deleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('patients')
  }
}

module.exports = PatientSchema
