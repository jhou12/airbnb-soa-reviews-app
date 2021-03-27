const db = require('../db.js')
const fakeData = require('./fakeData.js')
const names = require('./names.js')

db.sequelize.sync({force: true})
.then(() => {
console.log('Tables synced, starting seed...')

let TOTAL_HOUSES = 100
let TOTAL_REVIEWS = 50

let namesArray = names.list.split(', ')
let namesPromises = []
namesArray.forEach((name, index) => {
  let prom = db.User.create({name: name, photo: index})
  namesPromises.push(prom)
})
Promise.all(namesPromises)

let reviewsArray = []
for (let i = 0; i < TOTAL_HOUSES; i++) {
        for (let r = 0; r < TOTAL_REVIEWS; r++) {
          let review = fakeData.fullReview()
          let randomUser = Math.floor(Math.random() * 100)
          let entry = db.Review.create({
            year: review.date[0],
            month: review.date[1],
            description: review.description,
            cleanliness: review.ratings.cleanliness,
            communication: review.ratings.communication,
            checkIn: review.ratings.checkIn,
            accuracy: review.ratings.accuracy,
            location: review.ratings.location,
            value: review.ratings.value,
            overall: review.ratings.overall,
            propertyId: i,
            userId: randomUser,
            })
            reviewsArray.push(entry)
        }
      }
      Promise.all(reviewsArray)
      .then(() => {
        return db.Review.findAll({ order: db.sequelize.col('propertyId')})
      })
      .then(() => {
        for (let i = 0; i < TOTAL_HOUSES; i++) {
          db.Review.findAll({where: { propertyId: i }, raw: true})
          .then(data => {
            let avgCleanlinessSum = 0
            let avgCommunicationSum = 0
            let avgCheckInSum = 0
            let avgAccuracySum = 0
            let avgLocationSum = 0
            let avgValueSum = 0
            let avgOverallSum = 0
            for (let r = 0; r < TOTAL_REVIEWS; r++) {
              avgCleanlinessSum += data[r].cleanliness
              avgCommunicationSum += data[r].communication
              avgCheckInSum += data[r].checkIn
              avgAccuracySum += data[r].accuracy
              avgLocationSum += data[r].location
              avgValueSum += data[r].value
              avgOverallSum += data[r].overall
            }
            let avgCleanliness = avgCleanlinessSum / TOTAL_REVIEWS
            let avgCommunication = avgCommunicationSum / TOTAL_REVIEWS
            let avgCheckIn = avgCheckInSum / TOTAL_REVIEWS
            let avgAccuracy = avgAccuracySum / TOTAL_REVIEWS
            let avgLocation = avgLocationSum / TOTAL_REVIEWS
            let avgValue = avgValueSum / TOTAL_REVIEWS
            let avgOverall = avgOverallSum / TOTAL_REVIEWS

            db.ReviewAvg.create({
                avgCleanliness,
                avgCommunication,
                avgCheckIn,
                avgAccuracy,
                avgLocation,
                avgValue,
                avgOverall,
                propertyId: i,
            })
          })
        }
      })
})
.catch(err => console.log('Table sync error:', err))