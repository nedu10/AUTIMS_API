'use strict'

const User = use('App/Models/User')
const MonthlyReport = use('App/Models/MonthlyReport')

class MonthlyReportController {
    async create({request, response, auth, params}) {
        const {patient_id} = params
        const {month, recap_base, recap_improv,  recap_comm, alt_base, alt_improv, alt_comm, motor_base,  motor_improv, motor_comm,
            self_base, self_improv, self_comm, behav_base, behav_improv,  behav_comm} = request.post()


        try {

            const authUser = auth.current.user
            const therapist = await User.query().where("id", authUser.id).with('therapist').first()
            const therapistData = therapist.toJSON().therapist

            
            const monthly_report = new MonthlyReport()
            monthly_report.patient_id = patient_id
            monthly_report.therapist_id = therapistData.id
            monthly_report.month = month
            monthly_report.recap_base = recap_base
            monthly_report.recap_improv = recap_improv
            monthly_report.recap_comm = recap_comm
            monthly_report.alt_base = alt_base
            monthly_report.alt_improv = alt_improv
            monthly_report.alt_comm = alt_comm
            monthly_report.motor_base = motor_base
            monthly_report.motor_improv = motor_improv
            monthly_report.motor_comm = motor_comm
            monthly_report.self_base = self_base
            monthly_report.self_improv = self_improv
            monthly_report.self_comm = self_comm
            monthly_report.behav_base = behav_base
            monthly_report.behav_improv = behav_improv
            monthly_report.behav_comm = behav_comm
            
            const saveMonthlyReport = await monthly_report.save()

            return response.status(201).json({
                status: 'Success',
                message: 'Successfully created',
                data: saveMonthlyReport
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
    async patientMonthlyReport({response, params}) {
        const {patient_id} = params
        try {
            const parent_monthly_report = await MonthlyReport.query().where("patient_id", patient_id).with('patient').fetch()


            return response.status(200).json({
                status: 'Success',
                message: 'monthly report is successfully fetched',
                data: parent_monthly_report
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
    async singleMonthlyReport({response, params}) {
        const {monthly_report_id} = params
        try {
            const monthly_report = await MonthlyReport.query().where("id", monthly_report_id).with('patient').first()


            return response.status(200).json({
                status: 'Success',
                message: 'Monthly report is successfully fetched',
                data: monthly_report
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
        const {monthly_report_id} = params

        const {month, recap_base, recap_improv,  recap_comm, alt_base, alt_improv, alt_comm, motor_base,  motor_improv, motor_comm,
            self_base, self_improv, self_comm, behav_base, behav_improv,  behav_comm} = request.post()


        try {

            const authUser = auth.current.user
            const therapist = await User.query().where("id", authUser.id).with('therapist').first()
            const therapistData = therapist.toJSON().therapist

            const monthly_report = await MonthlyReport.query()
                                .where("id", monthly_report_id)
                                .andWhere('therapist_id', therapistData.id)
                                .first()

            if (!monthly_report) {
                return response.status(404).json({
                    status: 'Failed',
                    message: 'Monthly Report does not exist'
                })
            }

            monthly_report.month = (month) ? month : monthly_report.month
            monthly_report.recap_base = (recap_base) ? recap_base : monthly_report.recap_base
            monthly_report.recap_improv = (recap_improv) ? recap_improv : monthly_report.recap_improv
            monthly_report.recap_comm = (recap_comm) ? recap_comm : monthly_report.recap_comm
            monthly_report.alt_base = (alt_base) ? alt_base : monthly_report.alt_base
            monthly_report.alt_improv = (alt_improv) ? alt_improv : monthly_report.alt_improv
            monthly_report.alt_comm = (alt_comm) ? alt_comm : monthly_report.alt_comm
            monthly_report.motor_base = (motor_base) ? motor_base : monthly_report.motor_base
            monthly_report.motor_improv = (motor_improv) ? motor_improv : monthly_report.motor_improv
            monthly_report.motor_comm = (motor_comm) ? motor_comm : monthly_report.motor_comm
            monthly_report.self_base = (self_base) ? self_base : monthly_report.self_base
            monthly_report.self_improv = (self_improv) ? self_improv : monthly_report.self_improv
            monthly_report.self_comm = (self_comm) ? self_comm : monthly_report.self_comm
            monthly_report.behav_base = (behav_base) ? behav_base : monthly_report.behav_base
            monthly_report.behav_improv = (behav_improv) ? behav_improv : monthly_report.behav_improv
            monthly_report.behav_comm = (behav_comm) ? behav_comm : monthly_report.behav_comm
            
            const saveMonthlyReport = await monthly_report.save()

            return response.status(201).json({
                status: 'Success',
                message: 'Successfully updated',
                data: saveMonthlyReport
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
        const {monthly_report_id} = params
        try {

            const authUser = auth.current.user
            const therapist = await User.query().where("id", authUser.id).with('therapist').first()
            const therapistData = therapist.toJSON().therapist

            const monthly_report = await MonthlyReport.query()
                                .where("id", monthly_report_id)
                                .andWhere('therapist_id', therapistData.id)
                                .delete()

            if (!monthly_report) {
                return response.status(404).json({
                    status: 'Failed',
                    message: 'Monthly Report does not exist'
                })
            }

            return response.status(200).json({
                status: 'Success',
                message: 'Successfully deleted',
                data: monthly_report
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

module.exports = MonthlyReportController
