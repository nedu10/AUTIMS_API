'use strict'

const User = use('App/Models/User')
const Parent = use('App/Models/Parent')
const Patient = use('App/Models/Patient')
const Caregiver = use('App/Models/Caregiver')
const Hash = use('Hash')

class ParentController {
    async register({request, response}) {

        const {name, email, phone_no, gender, password, child_name, child_age, address, child_gender} = request.post()


        try {
            const user = new User()
            user.email = email
            user.user_type = "parent"
            user.password = password
            const saveUser = await user.save()
             
            if (!saveUser) {
                throw response.status(500).json({
                    status: 'Failed',
                    message: 'Internal server error'
                })
            }

            const parent = new Parent()
            parent.name = name
            parent.email = email
            parent.phone_no = phone_no
            parent.gender = gender
            parent.child_name = child_name,
            parent.child_age = child_age,
            parent.address = address,
            parent.child_gender = child_gender
            
            const saveParent = await parent.save()

            return response.status(201).json({
                status: 'Success',
                message: 'Parent is successfully registered',
                data: saveParent
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
    async getSingleParent({params, response}) {
        const {user_id} = params
        try {
            const get_parent = await User.query().where('id', user_id).andWhere('user_type', "parent").with('parent').first()
            if (!get_parent) {
                return response.status(200).json({
                    status: 'Failed',
                    message: 'Parent does not exist',
                })
            }
            return response.status(200).json({
                status: 'Success',
                message: 'Successfully fetch parent',
                data: get_parent
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
    async parentProfile({response, auth}) {
        try {
            const authUser = auth.current.user
            const parent = await User.query().where("id", authUser.id).with('parent').first()
            return response.status(200).json({
                status: 'Success',
                message: 'Successfully fetch profile',
                data: parent
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
        const {name, phone_no, gender, child_name, child_age, address, child_gender} = request.post()

        try {
            const user = await User.query().where("id", user_id).andWhere('user_type', "parent").first()
            // console.log('here >> ', user)
            if (!user) {
                return response.status(404).json({
                    status: 'Failed',
                    message: 'User not found'
                })
            }
            const parent = await Parent.query().where("email", user.email).first()
            
            // if (email) {
            //     const checkEmail = await User.findBy({email: email})
            //     if (user.email != email && checkEmail) {
            //         return response.status(401).json({
            //             status: 'Failed',
            //             message: 'Email aleady exist'
            //         })
            //     }
            // }
           

            parent.name = (name) ? name : parent.name
            parent.phone_no = (phone_no) ? phone_no : parent.phone_no
            parent.gender = (gender) ? gender : parent.gender
            parent.address = (address) ? address : parent.address
            parent.child_name = (child_name) ? child_name : parent.child_name
            parent.child_age = (child_age) ? child_age : parent.child_age
            parent.child_gender = (child_gender) ? child_gender : parent.child_gender

            
            const updateParent = await parent.save()

            return response.status(202).json({
                status: 'Success',
                message: 'Successfully Updated parent',
                data: updateParent
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
    async addCaregiver({request, auth, response}) {

        const {name, email, phone_no, relationship} = request.post()

        const confirmation_token = 'qwertyuiop'
        const password = 'AUTIMCAREGIVER'

        try {
            const authUser = auth.current.user
            const parent = await User.query().where("id", authUser.id).with('parent').first()
            const parentData = parent.toJSON().parent
            // console.log('ghghghg >> ', parent.toJSON().parent.child_name)

            const user = new User()
            user.email = email
            user.user_type = "caregiver"
            user.password = password
            const saveUser = await user.save()
             
            if (!saveUser) {
                throw response.status(500).json({
                    status: 'Failed',
                    message: 'Internal server error'
                })
            }

            const caregiver = new Caregiver()
            caregiver.name = name
            caregiver.parent_id = parentData.id
            caregiver.email = email
            caregiver.phone_no = phone_no
            caregiver.relationship = relationship
            caregiver.confirmation_token = confirmation_token
            caregiver.child_name = parentData.child_name,
            caregiver.child_age = parentData.child_age,
            caregiver.child_gender = parentData.child_gender
            
            const saveCaregiver = await caregiver.save()

            return response.status(201).json({
                status: 'Success',
                message: 'Caregiver is successfully created',
                data: saveCaregiver
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
    async viewParentAndCaregiverPatient({response, auth, params}){
        const {parent_email} = params
        try {

            const patients = await Patient.query().where("parent_email", parent_email).andWhere('is_deleted', false).with('therapist').with('parent').fetch()

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
}

module.exports = ParentController
