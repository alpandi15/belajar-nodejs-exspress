import Sequelize from 'sequelize'
import tables from '#database/models'

const { Op } = Sequelize

const tbl_comment = tables.comments

const Fields = [
  'id',
  'postId',
  'commentId',
  'content',
  'countLike',
  'countComment',
  'createdBy',
  'createdAt',
  'updatedAt',
]

export const getById = (id) => tbl_comment.findOne({
  attributes: Fields,
  where: {
    id
  }
})

export const dataExists = async (id) => {
  const exists = await getById(id)
  if (exists === null) {
    return false
  }
  return true
}

export const getMyList = (userId) => tbl_comment.findAll({
  attributes: Fields,
  where: {
    createdBy: userId
  }
})

export const getAll = () => tbl_comment.findAll({
  attributes: Fields
})

export const createData = async (data, userId) => tbl_comment.create({
  postId: data?.postId,
  commentId: data?.commentId || null,
  content: data?.content,
  createdBy: userId
})

export const updateData = (slug, data) => tbl_comment.update(
  {
    content: data?.content
  },
  {
    where: {
      slug
    }
  }
)

export const deleteById = (id) => tbl_comment.destroy({
  where: {
    id
  }
})
