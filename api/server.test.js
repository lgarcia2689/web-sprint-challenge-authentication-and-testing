// Write your tests here
const request = require('supertest')
const server = require('../api/server')
const db = require('../data/dbConfig')
const bcrypt = require('bcryptjs')

test('sanity', () => {
  expect(true).toBe(true)
})



beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('users').truncate()
})
afterAll(async () => {
  await db.destroy()
})

const sue = { username: 'sue'}
describe('[POST] /api/auth/register', () => {
  test('creates a new user in the database', async () => {
    let res
      await db('users').insert(sue)
      res = await request(server).get('/api/users')
      expect(res.body).toHaveLength(1)

  })
  // test('new user passwords are saved correctly bcrypted', async () => {
  //   await request(server).post('/api/auth/register').send({ username: 'sue', password: '1234' })
  //   const sue = await db('users').where('username', 'sue').first()
  //   expect(bcrypt.compareSync('1234', sue.password)).toBeTruthy()
  // }, 500)
})