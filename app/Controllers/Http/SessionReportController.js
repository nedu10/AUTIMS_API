'use strict'

const User = use('App/Models/User')
const SessionReport = use('App/Models/SessionReport')

class SessionReportController {
    async create({request, response, auth, params}) {
        const {patient_id} = params
        const {date, initial_assesment, session_summary,  final_assesment, other_notes} = request.post()


        try {

            const authUser = auth.current.user
            const therapist = await User.query().where("id", authUser.id).with('therapist').first()
            const therapistData = therapist.toJSON().therapist

            
            const session_report = new SessionReport()
            session_report.patient_id = patient_id
            session_report.therapist_id = therapistData.id
            session_report.date = date
            session_report.initial_assesment = initial_assesment
            session_report.session_summary = session_summary
            session_report.final_assesment = final_assesment
            session_report.other_notes = other_notes
            
            const saveSessionReport = await session_report.save()

            return response.status(201).json({
                status: 'Success',
                message: 'session report is successfully created',
                data: saveSessionReport
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
    async patientSessionReport({response, params}) {
        const {patient_id} = params
        try {
            const parent_session_report = await SessionReport.query().where("patient_id", patient_id).with('patient').fetch()


            return response.status(200).json({
                status: 'Success',
                message: 'session report is successfully fetched',
                data: parent_session_report
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
    async singleSessionReport({response, params}) {
        const {session_report_id} = params
        try {
            const session_report = await SessionReport.query().where("id", session_report_id).with('patient').first()


            return response.status(200).json({
                status: 'Success',
                message: 'session report is successfully fetched',
                data: session_report
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
        const {session_report_id} = params
        const {date, initial_assesment, session_summary,  final_assesment, other_notes} = request.post()


        try {

            const authUser = auth.current.user
            const therapist = await User.query().where("id", authUser.id).with('therapist').first()
            const therapistData = therapist.toJSON().therapist

            const session_report = await SessionReport.query()
                                .where("id", session_report_id)
                                .andWhere('therapist_id', therapistData.id)
                                .first()

            if (!session_report) {
                return response.status(404).json({
                    status: 'Failed',
                    message: 'Session Report does not exist'
                })
            }

            session_report.date = (date) ? date : session_report.date
            session_report.initial_assesment = (initial_assesment) ? initial_assesment : session_report.initial_assesment
            session_report.session_summary = (session_summary) ? session_summary : session_report.session_summary
            session_report.final_assesment = (final_assesment) ? final_assesment : session_report.final_assesment
            session_report.other_notes = (other_notes) ? other_notes : session_report.other_notes
            
            const saveSessionReport = await session_report.save()

            return response.status(201).json({
                status: 'Success',
                message: 'session report is successfully updated',
                data: saveSessionReport
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
        const {session_report_id} = params
        try {

            const authUser = auth.current.user
            const therapist = await User.query().where("id", authUser.id).with('therapist').first()
            const therapistData = therapist.toJSON().therapist

            const session_report = await SessionReport.query()
                                .where("id", session_report_id)
                                .andWhere('therapist_id', therapistData.id)
                                .delete()

            if (!session_report) {
                return response.status(404).json({
                    status: 'Failed',
                    message: 'Session Report does not exist'
                })
            }

            return response.status(200).json({
                status: 'Success',
                message: 'session report is successfully deleted',
                data: session_report
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

module.exports = SessionReportController
