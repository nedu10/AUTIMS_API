'use strict'

class CaregiverController {
<<<<<<< Updated upstream
=======
    async activateCaregiver ({ response, params, request}) {
        const {confirmation_key} = params
        const {password} = request.post()
        try {

            // console.log('confirmation key >> ', confirmation_key)
            const get_caregiver = await Caregiver.query().where('confirmation_token', confirmation_key).first()

            if (!get_caregiver) {
                throw response.status(500).json({
                    status: 'Failed',
                    message: 'Caregiver is already activated'
                })
            }

            // console.log('caregiver >> ', get_caregiver)

            const get_user = await User.query().where('email', get_caregiver.email).first()

            get_user.password = password

            get_caregiver. confirmation_token = null

            const save_user_data = await get_user.save()

            const save_edited_caregiver = await get_caregiver.save()
            return response.status(202).json({
                status: 'Success',
                message: 'Caregiver is successfully activated',
                data: save_edited_caregiver
            })
        } catch (error) {
            console.log(error)
            return response.status(500).json({
                status: 'Failed',
                message: 'Failed Internal server error',
                error: error
            })
        }
    }
>>>>>>> Stashed changes
}

module.exports = CaregiverController
