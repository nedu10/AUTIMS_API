'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Caregiver extends Model {
    static boot () {
        super.boot()
    
        /**
         * A hook to hash the caregiver password before saving
         * it to the database.
         */
        this.addHook('beforeSave', async (caregiverInstance) => {
          if (caregiverInstance.dirty.password) {
            caregiverInstance.password = await Hash.make(caregiverInstance.password)
          }
        })
      }
    
      //hide password when rendering caregiver data
      
      static get hidden () {
        return ['password']
      }
    
    
      /**
       * A relationship on tokens is required for auth to
       * work. Since features like `refreshTokens` or
       * `rememberToken` will be saved inside the
       * tokens table.
       *
       * @method tokens
       *
       * @return {Object}
       */
      tokens () {
        return this.hasMany('App/Models/Token')
      }

    parent () {
        return this.belongsTo('App/Models/Parent')
      }
      observation_reports () {
        return this.hasMany('App/Models/ObservationReport')
      }
}

module.exports = Caregiver
