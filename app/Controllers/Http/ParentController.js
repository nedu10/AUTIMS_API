'use strict'

const User = use('App/Models/User')
const Parent = use('App/Models/Parent')
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
}

module.exports = ParentController
