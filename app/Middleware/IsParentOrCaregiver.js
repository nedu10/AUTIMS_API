'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')

class IsParentOrCaregiver {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response, auth }, next) {
    // call next to advance the request
    const authUser = await auth.getUser()
    // console.log('im checking my id >> ', authUser.id)

    try {
      const checkAuthUserType = await User.query().where('id', authUser.id).with('parent').with('caregiver').first()
      if ((checkAuthUserType.user_type == 'parent') || (checkAuthUserType.user_type == 'caregiver') ) {
        if(checkAuthUserType.user_type == 'caregiver' ){
          if (checkAuthUserType.caregiver.confirmation_token = null) {
            return await next()
          } else {
            return response.status(401).json({
              status: 'Failed',
              message: 'UnAuthorized access'
            })
          }
        }
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

module.exports = IsParentOrCaregiver
