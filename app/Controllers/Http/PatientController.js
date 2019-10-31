'use strict'

const Therapist = use('App/Models/Therapist')
const User = use('App/Models/User')
const Hash = use('Hash')

class PatientController {
    async create_patient({request, response, params}) {
        const {therapist_id} = params
        const {name, age, diagnoses, summary, parent_name, parent_email, parent_phone, gender, relationship, creation_time} = request.post()


        try {
            const user = new User()
            user.email = email
            user.user_type = "therapist"
            user.password = password
            const saveUser = await user.save()
             
            if (!saveUser) {
                throw response.status(500).json({
                    status: 'Failed',
                    message: 'Internal server error'
                })
            }

            const therapist = new Therapist()
            therapist.name = name
            therapist.email = email
            therapist.phone_no = phone_no
            therapist.gender = gender
            therapist.workplace = workplace,
            therapist.address = address
            
            const saveTherapist = await therapist.save()

            return response.status(201).json({
                status: 'Success',
                message: 'Therapist is successfully registered',
                data: saveTherapist
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
}

module.exports = PatientController
