'use strict'

const User = use('App/Models/User')
const ObservationReport = use('App/Models/ObservationReport')

class ObservationReportController {
    async create({request, response, auth, params}) {
        const {patient_id} = params
        const {date, title, summary,  suggestions} = request.post()


        try {

            const authUser = auth.current.user
            const creator = await User.query().where("id", authUser.id).with('parent').with('caregiver').first()

            const parentData = creator.toJSON().parent
            const caregiverData = creator.toJSON().caregiver

            const observation_report = new ObservationReport()

            if (parentData) {
                observation_report.patient_id = patient_id
                observation_report.creator_id = parentData.id
                observation_report.date = date
                observation_report.title = title
                observation_report.summary = summary
                observation_report.suggestions = suggestions
            }

            if (caregiverData) {
                observation_report.patient_id = patient_id
                observation_report.creator_id = caregiverData.id
                observation_report.date = date
                observation_report.title = title
                observation_report.summary = summary
                observation_report.suggestions = suggestions
            }
            
            const saveObservationReport = await observation_report.save()

            return response.status(201).json({
                status: 'Success',
                message: 'observation report is successfully created',
                data: saveObservationReport
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
    async singleObservationReport({response, params}) {
        const {observation_report_id} = params
        try {
            const observation_report = await ObservationReport.query().where("id", observation_report_id).with('patient').first()


            return response.status(200).json({
                status: 'Success',
                message: 'Observation report is successfully fetched',
                data: observation_report
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
    async patientObservationReport({response, params}) {
        const {patient_id} = params
        try {
            const parent_observation_report = await ObservationReport.query().where("patient_id", patient_id).with('patient').fetch()


            return response.status(200).json({
                status: 'Success',
                message: 'observation report is successfully fetched',
                data: parent_observation_report
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
    async edit({request, response, auth, params}) {
        const {observation_report_id} = params
        const {date, title, summary,  suggestions} = request.post()


        try {

            const authUser = auth.current.user
            const creator = await User.query().where("id", authUser.id).with('parent').with('caregiver').first()

            const parentData = creator.toJSON().parent
            const caregiverData = creator.toJSON().caregiver

            const creator_id = (parentData) ? parentData.id : (caregiverData) ? caregiverData.id : null

            const observation_report = await ObservationReport.query()
                                .where("id", observation_report_id)
                                .andWhere('creator_id', creator_id)
                                .first()

            if (!observation_report) {
                return response.status(404).json({
                    status: 'Failed',
                    message: 'Observation Report does not exist'
                })
            }

            observation_report.date = (date) ? date : observation_report.date
            observation_report.title = (title) ? title : observation_report.title
            observation_report.summary = (summary) ? summary : observation_report.summary
            observation_report.suggestions = (suggestions) ? suggestions : observation_report.suggestions
            
            const saveObservationReport = await observation_report.save()

            return response.status(202).json({
                status: 'Success',
                message: 'Observation report is successfully updated',
                data: saveObservationReport
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
    async delete({response, auth, params}) {
        const {observation_report_id} = params
        try {

            const authUser = auth.current.user
            const creator = await User.query().where("id", authUser.id).with('parent').with('caregiver').first()

            const parentData = creator.toJSON().parent
            const caregiverData = creator.toJSON().caregiver

            const creator_id = (parentData) ? parentData.id : (caregiverData) ? caregiverData.id : null

            const observation_report = await ObservationReport.query()
                                .where("id", observation_report_id)
                                .andWhere('creator_id', creator_id)
                                .delete()


            if (!observation_report) {
                return response.status(404).json({
                    status: 'Failed',
                    message: 'Observation Report does not exist'
                })
            }

            return response.status(200).json({
                status: 'Success',
                message: 'Observation report is successfully deleted',
                data: observation_report
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

module.exports = ObservationReportController
