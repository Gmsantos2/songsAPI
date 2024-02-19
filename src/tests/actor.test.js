const request = require("supertest")
const app = require('../app')

const URL_ACTORS = '/actors'

const actor = {
  firstName: "Franco",
  lastName: "Fernandez",
  nationality: "Mex",
  image: "url",
  birthday: "2024-02-02"
}


let actorId;

//POST
test("Post -> 'URL_ACTORS', should return status code 201, and res.body to be defined and res.body.firstName = actor.firstName", async () => {

  const res = await request(app)
    .post(URL_ACTORS)
    .send(actor)

  actorId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actor.firstName)
})

//GETALL    
test("Get -> 'URL_ACTORS', should return status code 200, res.body to be defined and res.body.length = 1", async () => {
  const res = await request(app)
    .get(URL_ACTORS)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

//GETONE
test("Get -> 'URL_ACTORS/:id', should return status code 200, res.body to be defined and res.body.firstName = actor.firstName", async () => {
  const res = await request(app)
    .get(`${URL_ACTORS}/${actorId}`)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actor.firstName)
})

//PUT
test("Put -> 'URL_ACTORS/:id', should return status code 200, res.body to be defined", async () => {
  const res = await request(app)
    .put(`${URL_ACTORS}/${actorId}`)
    .send({ firstName: "Eder" })

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe("Eder")
})

//DELETE
test("Delete -> 'URL_ACTORS/:id', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${URL_ACTORS}/${actorId}`)

  expect(res.statusCode).toBe(204)
})