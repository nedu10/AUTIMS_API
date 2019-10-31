'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CaregiverSchema extends Schema {
  up () {
    this.create('caregivers', (table) => {
      table.increments()
      table.integer('parent_id').notNullable().unsigned().references('id').inTable('parents')
      table.string('name', 254).notNullable()
      table.string('email', 254).notNullable().unique().notNullable().references('email').inTable('users')
      table.string('phone_no', 254).notNullable()
      table.string('relationship', 1000)
      table.string('confirmation_token', 1000)
      table.string('child_name', 254).notNullable()
      table.string('child_age', 64).notNullable()
      table.string('child_gender', 64).notNullable()
      table.string('img_url', 1000)
      table.timestamps()
    })
  }

  down () {
    this.drop('caregivers')
  }
}

module.exports = CaregiverSchema
