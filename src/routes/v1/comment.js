import express from 'express'
import {findOne, findAll, findMyList, create, update, destroy, validation} from '../../controllers/comment/commentController'
import {requireAuth} from '../../middleware/authenticate'
import {apiVersion} from '../version'

const router = express.Router()
const prefix = {
  withSlug: `${apiVersion}/comment/:slug`,
  noParams: `${apiVersion}/comment`,
  myData: `${apiVersion}/my-comment`,
}

router.get(prefix.withSlug, findOne)
router.put(prefix.withSlug, [requireAuth, validation('update')], update)
router.delete(prefix.withSlug, requireAuth, destroy)
router.get(prefix.noParams, findAll)
router.post(prefix.noParams, [requireAuth, validation('create')], create)
router.get(prefix.myData, requireAuth, findMyList)

export default router
