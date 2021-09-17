import {create} from '#services/userService'

export const registerUser = async (req, res, next) => {
  try {
    const createUser = await create(req.body)
    console.log('CREATE ', createUser);
    if (createUser) {
      res.json({
        status: 'Has been created',
        data: createUser
      })
    }
  } catch (error) {
    res.status(522).json({
      status: 'Error create user'
    })
  }
}