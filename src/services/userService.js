import Sequelize from 'sequelize'
import libSequelize from '#lib/sequelize'
import tables from '#database/models'

const { Op } = Sequelize

// panggil nama modelnya contoh users nama model dari /database/models/users
const tbl_users = tables.users

const UserById = [
  'id',
  'name',
  'email',
  'username',
  'image',
  'createdAt',
  'updatedAt',
]

export const getOne = async (id) => {
  try {
    return tbl_users.findOne({
      attributes: UserById,
      where: {id},
      timestamps: false
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const create = async (data) => {
  const res = await tbl_users.create({
    name: data?.name,
    username: data?.username,
    email: data?.email,
    password: data?.password
  })
  return res
}

export const getAccount = async (account) => {
  return tbl_users.findOne({
    attributes: UserById.concat(['password']),
    where: {
      [Op.or]: {
        username: account,
        email: account
      }
    }
  })
}

export const isAccountExist = async (account) => tbl_users.count({
  where: { 
    [Op.or]: {
      username: account,
      email: account
    }
   }
})
