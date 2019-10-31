'use strict'

const Therapist = use('App/Models/Therapist')
const User = use('App/Models/User')
const Hash = use('Hash')

class TherapistController {
    async register({request, response}) {
        const {name, email, phone_no, workplace, address, gender, password} = request.post()

        console.log('im here >> ', email)

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
}

module.exports = TherapistController
