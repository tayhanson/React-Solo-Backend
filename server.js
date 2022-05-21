const express = require('express');
const PORT = process.env.PORT || 3001;
const cors = require('cors')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
const models = require('./models');

app.use(express.json());
app.use(cors())



app.post('/login', async (req, res) => {

const { email, password } = req.body;

  models.User.findOne({
    where: { email: email }
  }).then((user) => {
    if (!user) {
      res.json({ error: 'no user with that email was found' })
      return;
    }

    bcrypt.compare(password, user.password, (err, match) => {
      if (match) {
        res.json({ email: user.firstName, success: true })
        // res.redirect('/')
      } else {
        res.json({ error: 'incorrect password' })
      }
    })
  })
})

// app.post('/signup', async (req, res) => {
  
//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const email = req.body.email;
//     const password = req.body.password;

//     console.log(firstName)
//     console.log(lastName)
//     console.log(email)
//     console.log(password)

//     let user = await models.User.create({
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         password: password
//     });

//     console.log(user);
// })
app.post('/signup', (req, res) => {

    const { firstName, lastName, email, password } = req.body;
    
        if (!firstName || !lastName || !email || !password) {
        res.json({ error: 'First Name, Last Name, Email, and Password required.' })
        return;
      }
    console.log(firstName)
    console.log(lastName)
    console.log(email)
    console.log(password)
    
      bcrypt.hash(password, 5, (err, hash) => {
        models.User.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hash
        }).then((user) => {
          req.session.user = user;
          res.json({
            success: true,
            email: email,
            user_id: user.id
          })
        }).catch(e => {
          let errors = [];
    
          e.errors.forEach((error) => {
            errors.push(error.message)
          })
    
          res.json({ error: errors })
        })
      })
    })

app.post('/language', (req, res) => {

  const language = req.body.language;
  const tutorial_url = req.body.tutorial_url;

  console.log(language)

  models.Languages.findOne({
    where: {
      languages: language
    }
  }).then((lang) =>
  {
    console.log(lang)
    if (lang)
    {
      res.json({
        success: false,
        language: lang,
        message: "Already added loser"
      })
    } else {
      models.Languages.create({
        languages: language,
        tutorial_url: tutorial_url
      }).then((language) => {
          res.json({
            success: true,
            language: language
          })
        }
      )
    }

  }).catch((err) => {
    res.json({
      success: false,
      message: "Error occurred"
    })
  }
  );
})

app.get('/language', (req, res) =>{
  models.Languages.findAll({
    limit: 5
  }).then((languages) =>
  {
    // const langArray = []
    // languages.forEach((lang) => {
    //   langArray.push(lang);
    // });

    res.json({
      success: true,
      languages: languages
    })
  })
})

app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    res.redirect('/login');
    return;
  }

  let user = req.session.user;

  models.User_Languages.findAll({
    where: {
      user_id: user.id
    },
    include: models.Languages
  }).then(User_Languages => {
    res.render('dashboard', { locals: { user: user.email, User_Languages: User_Languages } });
  })
})



app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
})

app.get('/languages', (req, res) => {
  models.Languages.findAll().then((Languages) => {
    res.json(Languages);
  })
})


app.listen(PORT , () => {
    console.log(`server is started on port ${PORT}`)
})