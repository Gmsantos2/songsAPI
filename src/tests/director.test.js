const request = require("supertest")
const app = require('../app')

const URL_DIRECTOR = '/directors'

const director = {
    firstName: "Manuel",
    lastName: "Sanchez",
    nationality: "Arg",
    image: "url",
    birthday: "2024-02-02"
  }

let directorId;

//POST
test("Post -> 'URL_DIRECTOR', should return status code 201, and res.body to be defined and res.body.firtsName = director.firstName", async () => {

  const res = await request(app)
    .post(URL_DIRECTOR)
    .send(director)

  directorId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(director.firstName)
})

//GETALL
test("Get -> 'URL_DIRECTOR', should return status code 200, res.body to be defined and res.body.length = 1", async () => {
  const res = await request(app)
    .get(URL_DIRECTOR)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

//GETONE
test("Get -> 'URL_DIRECTOR/:id', should return status code 200, res.body to be defined and res.body.name = genre.name", async () => {
  const res = await request(app)
    .get(`${URL_DIRECTOR}/${directorId}`)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(director.firstName)
})

//PUT
test("Put -> 'URL_DIRECTOR/:id', should return status code 200, res.body to be defined", async () => {
  const res = await request(app)
    .put(`${URL_DIRECTOR}/${directorId}`)
    .send({ firstName: "Josue" })

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe("Josue")
})

//DELETE
test("Delete -> 'URL_DIRECTOR/:id', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${URL_DIRECTOR}/${directorId}`)

  expect(res.statusCode).toBe(204)
})