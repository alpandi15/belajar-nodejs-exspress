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

export const extractToken = (req) => {
  if (req?.headers?.authorization) {
    const headersParams = req?.headers?.authorization.split(' ')
    if (headersParams[0] === 'Bearer')
      return headersParams[1]
    return null
  }
  return null
}

export const extractTokenProfile = (req) => {
  try {
    const jwtToken = extractToken(req)
    return jwt.verify(jwtToken, project.jwt_secret)
  } catch (error) {
    throw new Error(error.stack)
  }
}