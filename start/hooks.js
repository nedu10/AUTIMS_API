'use strict'

const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted( () => {
    const View = use('View')
    const Env = use('Env')

    View.global('appUrl', path => {
        const APP_URL = Env.get('APP_URL','127.0.0.1')

        return path ? `${APP_URL}/${path}` : APP_URL
    })

})