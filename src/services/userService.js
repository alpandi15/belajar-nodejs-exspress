import Sequelize from 'sequelize'
import libSequelize from '#lib/sequelize'
import tables from '#database/models'

const { Op } = Sequelize

// panggil nama modelnya contoh users nama model dari /database/models/users
const tbl_users = tables.users

export const create = async (data) => {
  const res = await tbl_users.create({
    name: 'Tester',
    username: 'tester',
    email: 'tester@gmail.com',
    password: 'Ini di password'
  })
  return res
}
