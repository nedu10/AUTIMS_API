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
  return { greeting: 'Hello world in JSON' }
})

//Login
Route.post('/api/login', 'TherapistController.login').validator('TherapistLogin').middleware(['guest'])

//Therapist
Route.group(() => {
  Route.post('/register', 'TherapistController.register').validator('TherapistRegisteration')
  Route.post('/add_patient', 'TherapistController.addPatient').validator('PatientRegistration').middleware(['auth', 'isTherapist'])
  Route.get('/', 'TherapistController.therapistProfile').middleware(['auth', 'isTherapist'])
  Route.get('/:user_id', 'TherapistController.getSingleTherapist')
  // Route.post('/login', 'TherapistController.login').validator('TherapistLogin').middleware(['guest'])
  Route.put('/:user_id', 'TherapistController.update').middleware(['auth', 'isTherapist'])
  // Route.post('/login', 'UserController.login').validator('Login').middleware(['guest'])
  // Route.put('/change-password', 'UserController.changePassword').validator('ChangePassword').middleware(['auth'])
  // Route.put('/forget-password', 'UserController.forgetPassword').validator('ForgetPassword').middleware(['guest'])
  // Route.put('/reset-password', 'UserController.resetPassword')
}).prefix('/api/therapist')

//Parent
Route.group(() => {
  Route.post('/register', 'ParentController.register').validator('ParentRegistration')
  Route.post('/add_caregiver', 'ParentController.addCaregiver').validator('CaregiverRegistration').middleware(['auth', 'isParent'])
  Route.get('/', 'ParentController.parentProfile').middleware(['auth', 'isParent'])
  Route.get('/:user_id', 'ParentController.getSingleParent')
  Route.put('/:user_id', 'ParentController.update').middleware(['auth', 'isParent'])

}).prefix('/api/parent')
