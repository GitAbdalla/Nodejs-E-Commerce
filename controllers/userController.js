const asyncHandler = require('express-async-handler')
const {v4: uuidv4} = require('uuid')
const sharp = require('sharp')

const factory = require('./handlersFactory')
const {uploadSingleImage} = require('../middlewares/uploadImageMiddleware')
const User = require('../models/userModel')

exports.uploadUserImage = uploadSingleImage('profileImg')

exports.resizeImage = asyncHandler(async (req,res,next)=>{
    const filename = `user-${uuidv4()}-${Date.now()}.webp`

    await sharp(req.file.buffer)
    .resize(600,600)
    .toFormat('webp')
    .webp({quality:90})
    .toFile(`uploads/users/${filename}`)

    req.body.profileImg = filename
    next()
})

// @desc Get list of users
// @route GET /api/v1/users
// @access Private
exports.getusers = factory.getAll(User)

// @desc Get specific User by id
// @route GET /api/v1/users/:id
// @access Private
exports.getUser =factory.getOne(User)

// @desc Create User
// @route POST /api/v1/users
// @access Private
exports.createUser = factory.createOne(User)
// @desc Update User
// @route patch /api/v1/users/:id
// @access Private

exports.updateUser = factory.updateOne(User)

// @desc Delete User
// @route DELETE /api/v1/users/:id
// @access Private

exports.deleteUser = factory.deleteOne(User)