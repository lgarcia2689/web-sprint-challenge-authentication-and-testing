const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../users/users-model')
const {
  checkPasswordLength,
  checkUsernameExists,
  checkUsernameFree
}= require('./auth-middleware')

  router.post('/register', checkPasswordLength, checkUsernameFree, (req, res, next) =>{
    const {username, password} = req.body
    const hash = bcrypt.hashSync(password, 8)

    User.add({username, password: hash})
      .then(saved => {
        res.status(201).json(saved)
      })
      .catch(err =>{next(err)})
  })

  router.post('/login',checkUsernameExists,checkPasswordLength,(req, res, next) => {
    const { user, password } = req.body
    if (user && bcrypt.compareSync(password, user.password)){
      req.user = user
      res.json({message: `Welcome ${user.username}`})
    }else{
      next({status: 401, message: 'Invalid credentials'})
    }
  })

router.get('/logout', (req, res, next) =>{
  res.json('logout')
})

module.exports = router;
