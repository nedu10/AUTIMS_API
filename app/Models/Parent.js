'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Parent extends Model {
    static boot () {
        super.boot()
    
        /**
         * A hook to hash the parent password before saving
         * it to the database.
         */
        this.addHook('beforeSave', async (parentInstance) => {
          if (parentInstance.dirty.password) {
            parentInstance.password = await Hash.make(parentInstance.password)
          }
        })
      }
    
      //hide password when rendering parent data
      
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
      
    caregivers () {
        return this.hasMany('App/Models/Caregiver')
      }
      patient () {
        return this.hasOne('App/Models/Patient')
      }
      patient_therapists () {
        return this.hasMany('App/Models/PatientTherapist')
      }
}

module.exports = Parent
