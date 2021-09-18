import crypto from 'crypto'

export const generatePassword = async (password) => {
  const salt = await getRandomString(65)
  return sha512(password, salt)
}

export function sha512(password, salt) {
  const hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  return hash.digest('hex')
}

export const getRandomString = (length) => crypto.randomBytes(Math.ceil(length / 2))
  .toString('hex')
  .slice(0, length)