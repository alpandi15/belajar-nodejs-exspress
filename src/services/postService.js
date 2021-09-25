import Sequelize from 'sequelize'
import tables from '#database/models'

const { Op } = Sequelize

const tbl_posts = tables.posts

const Fields = [
  'id',
  'slug',
  'content',
  'countLike',
  'countComment',
  'createdBy',
  'createdAt',
  'updatedAt',
]

export const getById = (id) => tbl_posts.findOne({
  attributes: Fields,
  where: {
    id
  }
})

export const getBySlug = (slug) => tbl_posts.findOne({
  attributes: Fields,
  where: {
    slug
  }
})

export const dataExists = async (slug) => {
  const exists = await getBySlug(slug)
  if (exists === null) {
    return false
  }
  return true
}

export const getMyList = (userId) => tbl_posts.findAll({
  attributes: Fields,
  where: {
    createdBy: userId
  }
})

export const getAll = () => tbl_posts.findAll({
  attributes: Fields
})

export const createData = async (data, userId) => tbl_posts.create({
  slug: data?.slug,
  content: data?.content,
  createdBy: userId
})

export const updateData = (slug, data) => tbl_posts.update(
  {
    content: data?.content
  },
  {
    where: {
      slug
    }
  }
)

export const deleteById = (id) => tbl_posts.destroy({
  where: {
    id
  }
})

export const deleteBySlug = (slug) => tbl_posts.destroy({
  where: {
    slug
  }
})