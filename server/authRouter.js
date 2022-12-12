const Router = require('express')
const router = new Router()
const controller = require('./authController')
//const authMiddleware = require('./authMiddleware')

router.post('/registration', controller.registration)
router.post('/login', controller.login)
router.get('/users', controller.getUsers)
router.get('/users/:id',controller.getUserbyId)
router.post('/topics',controller.CreateTheme)
router.post('/messages',controller.CreateMessage)
router.get('/topics',controller.getTopics)
router.post('/SearchTopics',controller.getSearchTopics)
router.get('/messages/:id',controller.getAllMessagesById)

module.exports = router
