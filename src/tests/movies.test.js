require("../models")
const request = require("supertest")
const app = require('../app')
const Actor = require("../models/Actor")
const Director = require("../models/Director")
const Genre = require("../models/Genre")

let movieId

const URL_MOVIES = '/movies'

const movie = {
    name: 'Fast and furious',
    image: 'url',
    synopsis: 'Some text'
}

//POST
test("Post -> 'URL_MOVIES', should return status code 201, res.body to be defined and res.body.name = movie.name", async () => {

    const res = await request(app)
        .post(URL_MOVIES)
        .send(movie)

    movieId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)

})

//GETALL
test("GET -> 'URL_MOVIES', should return status code 200 and res.body.length === 1", async () => {
    const res = await request(app)
        .get(URL_MOVIES)


    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

})

//GETONE
test("GET ONE -> 'URL_MOVIES/:id', should return status code 200 and res.body.name === movie.name", async () => {
    const res = await request(app)
        .get(`${URL_MOVIES}/${movieId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

//PUT
test("PUT -> 'URL_MOVIES/:id', should return status code 200 and res.body.name === movie.name", async () => {

    const res = await request(app)
        .put(`${URL_MOVIES}/${movieId}`)
        .send({ name: "Pokemon" })

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("Pokemon")
})

//POST
test("Post -> 'URL_MOVIES/:id/actors', should return status code 200, res.boy to be defined and res.body.length = 1", async () => {

    const result = await Actor.create({
        firstName: "Franco",
        lastName: "Fernandez",
        nationality: "Mex",
        image: "url",
        birthday: "2024-02-02"
    })

    const res = await request(app)
        .post(`${URL_MOVIES}/${movieId}/actors`)
        .send([result.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)
    expect(res.body).toHaveLength(1)

    await result.destroy()
})

//POST
test("Post -> 'URL_MOVIES/:id/directors', should return status code 200, res.boy to be defined and res.body.length = 1", async () => {


    const result = await Director.create({
        firstName: "Manuel",
        lastName: "Sanchez",
        nationality: "Arg",
        image: "url",
        birthday: "2024-02-02"
      })

    const res = await request(app)
        .post(`${URL_MOVIES}/${movieId}/directors`)
        .send([result.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)
    expect(res.body).toHaveLength(1)

    await result.destroy()

})

//POST 
test("Post -> 'URL_MOVIES/:id/genres', should return status code 200, res.boy to be defined and res.body.length = 1", async () => {


    const result = await Genre.create({
        name: "Comedia"
      })

    const res = await request(app)
        .post(`${URL_MOVIES}/${movieId}/genres`)
        .send([result.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)
    expect(res.body).toHaveLength(1)

    await result.destroy()

})
//DELETE
test("Delete 'URL_MOVIES', should return status code 204", async () => {
    const res = await request(app)
        .delete(`${URL_MOVIES}/${movieId}`)

    expect(res.statusCode).toBe(204)

})