'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Therapist = use('App/Models/Therapist')

class TherapistAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response, auth }, next) {
    // call next to advance the request
    const authUser = await auth.getUser()

    try {
      const checkAuthUserType = await UserType.query().where('id', authUser.user_type_id).first()
      if (checkAuthUserType.title == 'kasuwa_admin') {
        return await next()
      } else {
        return response.status(401).json({
          status: 'Failed',
          message: 'UnAuthorized access'
        })
      }
    } catch (error) {
      console.log(error)
      return response.status(500).json({
        status: 'Failed',
        message: 'Internal server error'
      })
    }

  }
}

module.exports = TherapistAuth
