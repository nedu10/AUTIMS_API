'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'AutiMS API' }
})

//Login
Route.post('/api/login', 'TherapistController.login').validator('TherapistLogin').middleware(['guest'])
Route.get('/api/view_patient/:patient_id', 'TherapistController.viewPatient').middleware(['auth'])

//Therapist
Route.group(() => {
  Route.post('/register', 'TherapistController.register').validator('TherapistRegisteration')
  Route.post('/add_patient', 'TherapistController.addPatient').validator('PatientRegistration').middleware(['auth', 'isTherapist'])
  Route.get('/view_patients', 'TherapistController.viewTherapistPatient').middleware(['auth', 'isTherapist'])
  Route.put('/edit_patient/:patient_id', 'TherapistController.updatePatient').middleware(['auth', 'isTherapist'])
  Route.delete('/delete_patient/:patient_id', 'TherapistController.deletePatient').middleware(['auth', 'isTherapist'])
  Route.get('/', 'TherapistController.therapistProfile').middleware(['auth', 'isTherapist'])
  Route.get('/:user_id', 'TherapistController.getSingleTherapist')
  Route.put('/:user_id', 'TherapistController.update').middleware(['auth', 'isTherapist'])
  // Route.put('/change-password', 'UserController.changePassword').validator('ChangePassword').middleware(['auth'])
  // Route.put('/forget-password', 'UserController.forgetPassword').validator('ForgetPassword').middleware(['guest'])
  // Route.put('/reset-password', 'UserController.resetPassword')
}).prefix('/api/therapist')

//Parent
Route.group(() => {
  Route.post('/register', 'ParentController.register').validator('ParentRegistration')
  Route.post('/add_caregiver', 'ParentController.addCaregiver').validator('CaregiverRegistration').middleware(['auth', 'isParent'])
  Route.get('/view_patients/:parent_email', 'ParentController.viewParentAndCaregiverPatient').middleware(['auth'])
  Route.get('/', 'ParentController.parentProfile').middleware(['auth', 'isParent'])
  Route.get('/:user_id', 'ParentController.getSingleParent')
  Route.put('/:user_id', 'ParentController.update').middleware(['auth', 'isParent'])

}).prefix('/api/parent')

//Session report
Route.group(() => {
  Route.post('/:patient_id', 'SessionReportController.create').validator('SessionReportCreation').middleware(['auth', 'isTherapist'])
  Route.put('/:session_report_id', 'SessionReportController.edit').middleware(['auth', 'isTherapist'])
  Route.delete('/:session_report_id', 'SessionReportController.delete').middleware(['auth', 'isTherapist'])
  Route.get('/:patient_id', 'SessionReportController.patientSessionReport').middleware(['auth'])
  Route.get('/single_report/:session_report_id', 'SessionReportController.singleSessionReport').middleware(['auth'])

}).prefix('/api/session_report')

//Monthly report
Route.group(() => {
  Route.post('/:patient_id', 'MonthlyReportController.create').middleware(['auth', 'isTherapist'])
  Route.put('/:monthly_report_id', 'MonthlyReportController.edit').middleware(['auth', 'isTherapist'])
  Route.delete('/:monthly_report_id', 'MonthlyReportController.delete').middleware(['auth', 'isTherapist'])
  Route.get('/:patient_id', 'MonthlyReportController.patientMonthlyReport').middleware(['auth'])
  Route.get('/single_report/:monthly_report_id', 'MonthlyReportController.singleMonthlyReport').middleware(['auth'])

}).prefix('/api/monthly_report')

//Activity report
Route.group(() => {
  Route.post('/morning_activity/:patient_id', 'ActivityReportController.createMorningActivity').validator('ActivityListCreation').middleware(['auth', 'isTherapist'])
  Route.delete('/morning_activity/:morning_activity_id', 'ActivityReportController.deleteMorningActivity').middleware(['auth', 'isTherapist'])
  Route.post('/afternoon_activity/:patient_id', 'ActivityReportController.createAfternoonActivity').validator('ActivityListCreation').middleware(['auth', 'isTherapist'])
  Route.delete('/afternoon_activity/:afternoon_activity_id', 'ActivityReportController.deleteAfternoonActivity').middleware(['auth', 'isTherapist'])
  Route.post('/evening_activity/:patient_id', 'ActivityReportController.createEveningActivity').validator('ActivityListCreation').middleware(['auth', 'isTherapist'])
  Route.delete('/evening_activity/:evening_activity_id', 'ActivityReportController.deleteEveningActivity').middleware(['auth', 'isTherapist'])

}).prefix('/api/activity_list')

//Monthly report
Route.group(() => {
  Route.post('/:patient_id', 'ObservationReportController.create').middleware(['auth', 'isParentOrCaregiver'])
  Route.put('/:observation_report_id', 'ObservationReportController.edit').middleware(['auth', 'isParentOrCaregiver'])
  Route.delete('/:observation_report_id', 'ObservationReportController.delete').middleware(['auth', 'isParentOrCaregiver'])
  Route.get('/:patient_id', 'ObservationReportController.patientObservationReport').middleware(['auth'])
  Route.get('/single_report/:observation_report_id', 'ObservationReportController.singleObservationReport').middleware(['auth'])

}).prefix('/api/observation_report')
