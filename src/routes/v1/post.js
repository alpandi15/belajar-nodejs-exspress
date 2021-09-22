import express from 'express'
import {findOne, findAll, findMyList, create, update, destroy, validation} from '../../controllers/post/postController'
import {requireAuth} from '../../middleware/authenticate'
import {apiVersion} from '../version'

const router = express.Router()
const prefix = {
  withSlug: `${apiVersion}/post/:slug`,
  noParams: `${apiVersion}/post`,
  myData: `${apiVersion}/my-post`,
}

router.get(prefix.withSlug, findOne)
router.put(prefix.withSlug, [requireAuth, validation('update')], update)
router.delete(prefix.withSlug, requireAuth, destroy)
router.get(prefix.noParams, findAll)
router.post(prefix.noParams, [requireAuth, validation('create')], create)
router.get(prefix.myData, requireAuth, findMyList)

export default router
