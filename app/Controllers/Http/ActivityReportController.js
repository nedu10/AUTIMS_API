'use strict'

const User = use('App/Models/User')
const MorningActivity = use('App/Models/MorningActivity')
const AfternoonActivity = use('App/Models/AfternoonActivity')
const EveningActivity = use('App/Models/EveningActivity')

class ActivityReportController {
    async createMorningActivity({request, response, auth, params}) {
        const {patient_id} = params
        const {activity_title} = request.post()


        try {

            const authUser = auth.current.user
            const therapist = await User.query().where("id", authUser.id).with('therapist').first()
            const therapistData = therapist.toJSON().therapist

            
            const morning_activity = new MorningActivity()
            morning_activity.patient_id = patient_id
            morning_activity.therapist_id = therapistData.id
            morning_activity.activity_title = activity_title
            
            const saveMorningActivity = await morning_activity.save()

            return response.status(201).json({
                status: 'Success',
                message: 'Activity is successfully created',
                data: saveMorningActivity
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
    async deleteMorningActivity({response, auth, params}) {
        const {morning_activity_id} = params
        try {

            const authUser = auth.current.user
            const therapist = await User.query().where("id", authUser.id).with('therapist').first()
            const therapistData = therapist.toJSON().therapist

            const morning_activity = await MorningActivity.query()
                                .where("id", morning_activity_id)
                                .andWhere('therapist_id', therapistData.id)
                                .delete()

            if (!morning_activity) {
                return response.status(404).json({
                    status: 'Failed',
                    message: 'Activity does not exist'
                })
            }

            return response.status(200).json({
                status: 'Success',
                message: 'Activity is successfully deleted',
                data: morning_activity
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
    async createAfternoonActivity({request, response, auth, params}) {
        const {patient_id} = params
        const {activity_title} = request.post()


        try {

            const authUser = auth.current.user
            const therapist = await User.query().where("id", authUser.id).with('therapist').first()
            const therapistData = therapist.toJSON().therapist

            
            const afternoon_activity = new AfternoonActivity()
            afternoon_activity.patient_id = patient_id
            afternoon_activity.therapist_id = therapistData.id
            afternoon_activity.activity_title = activity_title
            
            const saveAfternoonActivity = await afternoon_activity.save()

            return response.status(201).json({
                status: 'Success',
                message: 'Activity is successfully created',
                data: saveAfternoonActivity
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
    async deleteAfternoonActivity({response, auth, params}) {
        const {afternoon_activity_id} = params
        try {

            const authUser = auth.current.user
            const therapist = await User.query().where("id", authUser.id).with('therapist').first()
            const therapistData = therapist.toJSON().therapist

            const aftenoon_activity = await AfternoonActivity.query()
                                .where("id", afternoon_activity_id)
                                .andWhere('therapist_id', therapistData.id)
                                .delete()

            if (!aftenoon_activity) {
                return response.status(404).json({
                    status: 'Failed',
                    message: 'Activity does not exist'
                })
            }

            return response.status(200).json({
                status: 'Success',
                message: 'Activity is successfully deleted',
                data: aftenoon_activity
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
    async createEveningActivity({request, response, auth, params}) {
        const {patient_id} = params
        const {activity_title} = request.post()


        try {

            const authUser = auth.current.user
            const therapist = await User.query().where("id", authUser.id).with('therapist').first()
            const therapistData = therapist.toJSON().therapist

            
            const evening_activity = new EveningActivity()
            evening_activity.patient_id = patient_id
            evening_activity.therapist_id = therapistData.id
            evening_activity.activity_title = activity_title
            
            const saveEveningActivity = await evening_activity.save()

            return response.status(201).json({
                status: 'Success',
                message: 'Activity is successfully created',
                data: saveEveningActivity
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
    async deleteEveningActivity({response, auth, params}) {
        const {evening_activity_id} = params
        try {

            const authUser = auth.current.user
            const therapist = await User.query().where("id", authUser.id).with('therapist').first()
            const therapistData = therapist.toJSON().therapist

            const evening_activity = await EveningActivity.query()
                                .where("id", evening_activity_id)
                                .andWhere('therapist_id', therapistData.id)
                                .delete()

            if (!evening_activity) {
                return response.status(404).json({
                    status: 'Failed',
                    message: 'Activity does not exist'
                })
            }

            return response.status(200).json({
                status: 'Success',
                message: 'Activity is successfully deleted',
                data: evening_activity
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

module.exports = ActivityReportController
