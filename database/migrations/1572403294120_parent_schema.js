'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ParentSchema extends Schema {
  up () {
    this.create('parents', (table) => {
      table.increments()
      table.string('name', 254).notNullable()
      table.string('email', 254).notNullable().unique().notNullable().references('email').inTable('users')
      table.string('phone_no', 254).notNullable()
      table.string('gender', 64).notNullable()
      table.string('child_name', 254).notNullable()
      table.string('child_age', 64).notNullable()
      table.string('child_gender', 64).notNullable()
      table.string('img_url', 1000)
      table.timestamps()
    })
  }

  down () {
    this.drop('parents')
  }
}

module.exports = ParentSchema
