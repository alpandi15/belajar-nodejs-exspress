const success = {code: '000', message: 'success', detail: 'Success'}
const error = {code: '001', message: 'error', detail: 'Unprocessable Entity'}
const internal_error = {code: '002', message: 'internal_error', detail: 'Internal Server Error'}

const session_expired_or_errors = {code: '101', message: 'session_expired_or_errors', detail: 'Session expired or session error'}
const account_is_exist = {code: '102', message: 'account_is_exist', detail: 'Account is Exists'}
const wrong_password = {code: '103', message: 'wrong_password', detail: 'Wrong Passsword'}

const not_found = {code: '201', message: 'not_found', detail: 'Data not found'}

export default {
  success,
  error,
  internal_error,
  session_expired_or_errors,
  account_is_exist,
  wrong_password,
  not_found
}