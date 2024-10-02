const express = require('express')
const { getusers, getUser, uploadUserImage, resizeImage, createUser, updateUser, deleteUser } = require('../controllers/userController')





// const {
//     getUsers,
//     getUser,
//     createUser,
//     updateUser,
//     deleteUser,
//     uploadUserImage,
//     resizeImage
// } = require('../controllers/userController')

const router = express.Router()

router.get('/', getusers)
router.get('/:id', getUser)
router.post('/', uploadUserImage, resizeImage ,createUser)
router.put('/:id',uploadUserImage , resizeImage, updateUser)
router.delete('/:id',deleteUser)

module.exports = router