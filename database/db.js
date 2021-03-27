const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv').config()

const sequelize = new Sequelize({
  dialect: 'mysql',
  username: process.env.SQL_USER,
  password: process.env.SQL_PASS,
  database: process.env.SQL_DB,
  logging: false,
})

sequelize.authenticate()
.then(() => console.log('Sequelize connected.'))
.catch(e => console.log('Unable to connect Sequelize', e))

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: Sequelize.TEXT,
  photo: Sequelize.TEXT,
}, { timestamps: false
})

const Review = sequelize.define('Review', {
  reviewId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  year: Sequelize.INTEGER,
  month: Sequelize.INTEGER,
  description: Sequelize.TEXT,
  cleanliness: Sequelize.INTEGER,
  communication: Sequelize.INTEGER,
  checkIn: Sequelize.INTEGER,
  accuracy: Sequelize.INTEGER,
  location: Sequelize.INTEGER,
  value: Sequelize.INTEGER,
  overall: Sequelize.INTEGER,
  propertyId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
}, { timestamps: false
})

const ReviewAvg = sequelize.define('ReviewAvg', {
  reviewAvgId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  avgCleanliness: Sequelize.DECIMAL(10,1),
  avgCommunication: Sequelize.DECIMAL(10,1),
  avgCheckIn: Sequelize.DECIMAL(10,1),
  avgAccuracy: Sequelize.DECIMAL(10,1),
  avgLocation: Sequelize.DECIMAL(10,1),
  avgValue: Sequelize.DECIMAL(10,1),
  avgOverall: Sequelize.DECIMAL(10,2),
  propertyId: Sequelize.INTEGER,
}, { timestamps: false
})

sequelize.sync()
.then(() => console.log('Tables synced.'))
.catch(e => console.log('sync error:',e))

let reviews50 = async (id) => {
  try {
    let allProps = {}
    let propAvg = await ReviewAvg.findOne({
      where: { propertyId: id },
      raw: true,
    })
      allProps.averages = propAvg
      let propReviews = await Review.findAll({
        where: { propertyId: id },
        raw: true,
        order: [
          ['year', 'DESC'],
          ['month', 'DESC'],
        ],
      })
      allProps.reviews = propReviews
      let userPromises = []
      propReviews.forEach(review => {
        let user = User.findOne({
          where: { userId: review.userId + 1},
          raw: true,
        })
        userPromises.push(user)
      })
      let userArray = await Promise.all(userPromises)
      allProps.users = userArray
      let numReviews = await Review.count({
        where: { propertyId: id },
      })
      allProps.reviewCount = numReviews
      return allProps
  } catch(e) {
    console.log('db reviews50 error:', e)
  }
}

let overall = async (id) => {
  try {
    let overallRating = await ReviewAvg.findOne({ where: { propertyId: id }})
    return overallRating
  } catch(e) {
    console.log('db overall rating error:', e)
  }
}

let total = async (id) => {
  try {
    let totalReviews = await Review.count({ where: { propertyId: id }})
    return totalReviews
  } catch(e) {
    console.log('db total reviews error:', e)
  }
}

module.exports = {
  sequelize,
  User,
  Review,
  ReviewAvg,
  reviews50,
  overall,
  total,
}