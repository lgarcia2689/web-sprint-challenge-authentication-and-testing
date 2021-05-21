const User = require('../users/users-model')

function restricted(req, res, next) {
    console.log('restricted')
    next()
  }

async function checkUsernameFree(req, res, next) {
  try{
    const users = await User.findBy({ username: req.body.username })
    if(!users.length) {
      next()
    }
    else next({message: "Username Taken", status: 422})
  }catch(err){
    next(err)
  }
}

async function checkUsernameExists(req, res, next) {
  const { username } = req.body

  const [user] = await User.findBy({ username})

  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' })
  } else {
    req.body.user = user
    next()
  }
}

function checkPasswordLength(req, res, next) {
  if(!req.body.password|| req.body.password.length<3){
    next({ message: "Password must be longer than 3 chars", status: 422 })
  }else{
    next()
  }
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength
}