'use strict'

const Therapist = use('App/Models/Therapist')
const User = use('App/Models/User')
const Patient = use('App/Models/Patient')
const TherapistSpecialization = use('App/Models/TherapistSpecialization')
const Hash = use('Hash')
const Mail = use('Mail')

class TherapistController {
    async register({request, response}) {
        const {name, email, phone_no, workplace, address, gender, password, specialization} = request.post()
        // console.log('i am getting specialization >> ', typeof specialization)
        // console.log('i am getting specialization >> ', specialization)
        const js_specialization = specialization

        // console.log('im here >> ', email)

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

            if (js_specialization.length > 0) {
                for (let i = 0; i < js_specialization.length; i++) {
                    const therapist_specialization = new TherapistSpecialization()
                    therapist_specialization.specialization_title = js_specialization[i]
                    therapist_specialization.therapist_email = email
                    await therapist_specialization.save()
                }
                
            }

            //send creation email to user to verify that he/she has created an account
            await Mail.send('emails.registration_email', therapist.toJSON(), message => {
                message
                  .to(therapist.email)
                  .from('autims@admin.com')
                  .subject('Thank you for creating an account with autims')
              })


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
    async getSingleTherapist({params, response}) {
        const {user_id} = params
        try {
            const get_therapist = await User.query().where('id', user_id).andWhere('user_type', "therapist").with('therapist').first()
            if (!get_therapist) {
                return response.status(200).json({
                    status: 'Failed',
                    message: 'Therapist does not exist',
                })
            }
            return response.status(200).json({
                status: 'Success',
                message: 'Successfully fetch therapist',
                data: get_therapist
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
    async login({ request, response, auth}) {
        
        const {email, password} = request.post()
        try {
            const checkLoginUser = await User.query().where("email", email).first()

            if (!checkLoginUser) {
                return response.status(400).json({
                    status: 'Failed',
                    message: 'Invalid Credentials',
                    details: 'User does not exist'
                })
            }
            const verifyPassword = await Hash.verify(password, checkLoginUser.password)

            if (!verifyPassword) {
                return response.status(400).json({
                    status: 'Failed',
                    message: 'Wrong password'
                })
            }

            const loginUser = await auth.generate(checkLoginUser, true)

            return response.status(202).json({
                status: 'Success',
                message: 'Successfully logged in',
                token: loginUser
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
    async therapistProfile({response, auth}) {
        try {
            const authUser = auth.current.user
            const therapist = await User.query().where("id", authUser.id).with('therapist').first()
            return response.status(200).json({
                status: 'Success',
                message: 'Successfully fetch profile',
                data: therapist
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
    async update({request, params, response}) {
        const {user_id} = params
        const {name, phone_no, workplace, address, gender} = request.post()

        try {
            const user = await User.query().where("id", user_id).first()
            const therapist = await Therapist.query().where("email", user.email).first()
            
            // if (email) {
            //     const checkEmail = await User.findBy({email: email})
            //     if (user.email != email && checkEmail) {
            //         return response.status(401).json({
            //             status: 'Failed',
            //             message: 'Email aleady exist'
            //         })
            //     }
            // }
           

            therapist.name = (name) ? name : therapist.name
            therapist.phone_no = (phone_no) ? phone_no : therapist.phone_no
            therapist.workplace = (workplace) ? workplace : therapist.workplace
            therapist.gender = (gender) ? gender : therapist.gender
            therapist.address = (address) ? address : therapist.address
            
            const updateTherapist = await therapist.save()

            return response.status(202).json({
                status: 'Success',
                message: 'Successfully Updated user',
                data: updateTherapist
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
    async addPatient({request, response, auth}) {
        const {name, parent_email, phone_no,  age, gender, diagnosis, summary, parent_phone, parent_name, relationship, creation_time} = request.post()


        try {

            const authUser = auth.current.user
            const therapist = await User.query().where("id", authUser.id).with('therapist').first()
            const therapistData = therapist.toJSON().therapist

            const checkParent = await User.query().where("email", parent_email).first()

            if (!checkParent) {
                return response.status(404).json({
                    status: 'Failed!',
                    message: 'Parent does not exist'
                })
            }
            
            const patient = new Patient()
            patient.name = name
            patient.parent_email = parent_email
            patient.phone_no = phone_no
            patient.therapist_id = therapistData.id
            patient.age = age
            patient.gender = gender
            patient.diagnosis = diagnosis
            patient.summary = summary
            patient.parent_phone = parent_phone
            patient.parent_name = parent_name
            patient.relationship = relationship
            patient.creation_time = creation_time
            
            const savePatient = await patient.save()

            return response.status(201).json({
                status: 'Success',
                message: 'Patient is successfully created',
                data: savePatient
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
    async viewPatient({response, auth, params}){
        const {patient_id} = params
        try {
            const patient = await Patient.query()
                                .where("id", patient_id)
                                .andWhere('is_deleted', false)
                                .with('therapist')
                                .with('parent')
                                .with('monthly_reports')
                                .with('session_reports')
                                .with('morning_activities')
                                .with('afternoon_activities')
                                .with('evening_activities')
                                .with('observation_reports')
                                .first()
                                
            return response.status(200).json({
                status: 'Success',
                message: 'successfully fetch patient',
                data: patient
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
    async viewTherapistPatient({response, auth}){
        try {
            const authUser = auth.current.user
            const therapist = await User.query().where("id", authUser.id).with('therapist').first()
            const therapistData = therapist.toJSON().therapist

            const patients = await Patient.query().where("therapist_id", therapistData.id).andWhere('is_deleted', false).with('therapist').with('parent').fetch()

            return response.status(200).json({
                status: 'Success',
                message: 'successfully fetch patients',
                data: patients
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
    //To be continued
    async updatePatient({request, params, response, auth}) {
        const {patient_id} = params
        const {name, parent_email, phone_no,  age, gender, diagnosis, summary, parent_phone, parent_name, relationship, creation_time} = request.post()

        try {

            const authUser = auth.current.user
            const therapist = await User.query().where("id", authUser.id).with('therapist').first()
            const therapistData = therapist.toJSON().therapist

            const patient = await Patient.query()
                                .where("id", patient_id)
                                .andWhere('is_deleted', false)
                                .andWhere('therapist_id', therapistData.id)
                                .first()
            
            // if (email) {
            //     const checkEmail = await User.findBy({email: email})
            //     if (user.email != email && checkEmail) {
            //         return response.status(401).json({
            //             status: 'Failed',
            //             message: 'Email aleady exist'
            //         })
            //     }
            // }

            if (!patient) {
                return response.status(404).json({
                    status: 'Failed',
                    message: 'Patient does not exist'
                })
            }
           

            patient.name = (name) ? name : patient.name
            patient.phone_no = (phone_no) ? phone_no : patient.phone_no
            patient.parent_email = (parent_email) ? parent_email : patient.parent_email
            patient.gender = (gender) ? gender : patient.gender
            patient.age = (age) ? age : patient.age,
            patient.diagnosis = (diagnosis) ? diagnosis : patient.diagnosis
            patient.summary = (summary) ? summary : patient.summary
            patient.parent_phone = (parent_phone) ? parent_phone : patient.parent_phone
            patient.parent_name = (parent_name) ? parent_name : patient.parent_name,
            patient.relationship = (relationship) ? relationship : patient.relationship
            patient.creation_time = (creation_time) ? creation_time : patient.creation_time
            
            const updatePatient = await patient.save()

            return response.status(202).json({
                status: 'Success',
                message: 'Successfully Updated user',
                data: updatePatient
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
    async deletePatient({response, params, auth}) {
        const {patient_id} = params
        try {

            const authUser = auth.current.user
            const therapist = await User.query().where("id", authUser.id).with('therapist').first()
            const therapistData = therapist.toJSON().therapist

            const patient = await Patient.query()
                                .where("id", patient_id)
                                .andWhere('is_deleted', false)
                                .andWhere('therapist_id', therapistData.id)
                                .first()

            if (!patient) {
                return response.status(404).json({
                    status: 'Failed',
                    message: 'Patient does not exist'
                })
            }

            patient.is_deleted = true

            const deletePatient = await patient.save()

            return response.status(202).json({
                status: 'Success',
                message: 'Successfully Deleted patient',
                data: deletePatient
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
    async removeSpecialization({response, params,auth}){
        const {therapist_specialization_id} = params
        try {
            const authUser = auth.current.user
            const therapist_specialization = await TherapistSpecialization.query()
                                .where("id", therapist_specialization_id)
                                .andWhere('therapist_email', authUser.email)
                                .first()

            if (!therapist_specialization) {
                return response.status(404).json({
                    status: 'Failed',
                    message: 'Specialization does not exist'
                })
            }

            therapist_specialization.delete()

            return response.status(200).json({
                status: 'Success',
                message: 'Successfully Deleted Specialization'
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

module.exports = TherapistController
