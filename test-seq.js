const db = require('./models');

db.User.findAll().then((results) => {
    console.log(results)
})
