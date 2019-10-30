'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TherapistSchema extends Schema {
  up () {
    this.create('therapists', (table) => {
      table.increments()
      table.string('name', 254).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('phone_no', 254).notNullable()
      table.string('workplace', 1000).notNullable()
      table.string('address', 1000).notNullable()
      table.string('gender', 64).notNullable()
      table.string('password', 60).notNullable()
      table.string('img_url', 1000)
      table.timestamps()
    })
  }

  down () {
    this.drop('therapists')
  }
}

module.exports = TherapistSchema
