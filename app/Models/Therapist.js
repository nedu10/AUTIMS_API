'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class Therapist extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the Therapist password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (therapistInstance) => {
      if (therapistInstance.dirty.password) {
        therapistInstance.password = await Hash.make(therapistInstance.password)
      }
    })
  }

  //hide password when rendering therapist data
  
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
  therapist_specializations () {
    return this.hasMany('App/Models/TherapistSpecialization')
  }
  patients () {
    return this.hasMany('App/Models/Patient')
  }
  session_reports () {
    return this.hasMany('App/Models/SessionReport')
  }
  monthly_reports () {
    return this.hasMany('App/Models/MonthlyReport')
  }
  activity_list () {
    return this.hasOne('App/Models/ActivityList')
  }
  patient_therapists () {
    return this.hasMany('App/Models/PatientTherapist')
  }
}

module.exports = Therapist
