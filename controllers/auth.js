const { check, validationResult } = require('express-validator');

const User = require('../models/user');

exports.getAllUsers = (req, res) => {
    User.find()
     .then((val) => {
        res.send(val);
     }).catch(err => {
        console.log(`Cannot find users`);
     });
};

exports.getSignup = (req, res, next) => {
    res.render('signup', {
      path: '/signup',
      auth: req.session.isLoggedIn,
      role: req.session.role,
      oldInput: {
        email: '',
        password: '',
        role: ''
      },
      validationErrors: []
    });
  };

  exports.getLogin = (req, res, next) => {
    res.render('login', {
      path: '/login',
      auth: req.session.isLoggedIn,
      role: req.session.role,
      oldInput: {
        email: '',
        password: '',
        role: ''
      }
    });
  };  

exports.postSignup = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    req.session.email = email;
    req.session.password = password;
    req.session.role = role;

    var user = new User({
        email: email,
        password:  password,
        role: role
    }); 
    user.save()
      .then((val) => {
         res.write('<h1>Successfully Registered!</h1>');
         res.end('<a href='+'/login'+'>Login Now</a>');
      }).catch(err => {
         console.log("Cannot signup");
      });

    // console.log(email + ' ' + password + ' ' + role + ' user: ' + user);
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
  
    User.findOne({ email: email, password: password, role: role })
      .then(user => {
            if(user.email == email && user.password == password && user.role == role)
            {
                req.session.isLoggedIn = true;
                req.session.user = user;
                req.session.role = role;

                return req.session.save(err => {
                     res.redirect('/');                  
                });
            }
            else 
            {
              res.redirect('/login');
            }
      }).catch(() => {
        console.log("User not found!");
        res.redirect('/signup');
      });
       
  }

exports.logout = (req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/login');
    });
}

  
