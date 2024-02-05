const Actor = require("./Actor")
const Director = require("./Director")
const Genre = require("./Genre")
const Movie = require("./Movie")

//pivot: movieGenre
Movie.belongsToMany(Genre, {through: 'movieGenre'})
Genre.belongsToMany(Movie, {through: 'movieGenre'})

//pivot: movieActor
Movie.belongsToMany(Actor, {through: 'movieActor'})
Actor.belongsToMany(Movie, {through: 'movieActor'})

//pivot: movieDirector
Movie.belongsToMany(Director, {through: 'movieDirector'})
Director.belongsToMany(Movie, {through: 'movieDirector'})