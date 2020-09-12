const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('home', {
    some: 'data',
    features: [
      {
        title: 'feature1.title',
        description: 'feature1.description'
      },
      {
        title: 'feature2.title',
        description: 'feature2.description'
      },
      {
        title: 'feature3.title',
        description: 'feature3.description'
      }
    ]
  })
})

module.exports = router
