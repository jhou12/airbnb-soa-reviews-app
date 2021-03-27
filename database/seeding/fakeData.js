let lorem = require('./loremipsum.js')

let ratings = function() {
  // min to max range inclusive: Math.floor(Math.random() * (max - min + 1)) + min
  let metrics = ['cleanliness', 'communication', 'checkIn', 'accuracy', 'location', 'value', 'overall']
  let allRatings = {}
  let max = 5.9
  let min = 2.5
  metrics.forEach(metric => {
    allRatings[metric] = Math.floor(Math.random() * (max - min + 1)) + min
  })
  // obj with 6 ratings
  return allRatings
}

let date = function() {
  let years = [2018, 2019, 2020]
  let randomYear = years[Math.floor(Math.random() * 3)]
  let randomMonth = Math.floor(Math.random() * 12)
  // array with year & month
  return [randomYear, randomMonth]
}

let description = function() {
  // string of 1 sentence
  return lorem.blurb.split('. ')[Math.floor(Math.random() * 115)] + '. '
}

let fullReview = function() {
  let review = {}
  review.ratings = ratings()
  review.date = date()
  review.description = description()
  return review
}

module.exports = {
  ratings,
  date,
  description,
  fullReview,
}