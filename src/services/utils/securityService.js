import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import project from '#config/project.config'

export const generatePassword = async (password) => {
  return bcrypt.hash(password, 10)
}

export function generateToken(obj, time = 10) {
  return jwt.sign(obj, project.jwt_secret, {
    expiresIn: project.jwt_expired || time // in seconds
  })
}
  
export const isValidPassword = (password, userPassword) => {
  return bcrypt.compare(password, userPassword)
}