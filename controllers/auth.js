const User = require('../models/user');

exports.getAllUsers = (req, res) => {
    User.find()
     .then((val) => {
        res.send(val);
     }).catch(err => {
        console.log(`Cannot find users`);
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
         res.end('<a href='+'/login'+'>Login</a>');
      }).catch(err => {
         console.log("Cannot signup");
      });

    console.log(email + ' ' + password + ' ' + role + ' user: ' + user);
}

exports.getLogin = (req,res) => {
    if(req.session.email) {
        if(req.session.role === "librarian")
        {
            res.write(`<h1>Hello ${req.session.role}, ${req.session.email} </h1><br>`);
        }
        if(req.session.role === "student")
        {
            res.write(`<h1>Hello ${req.session.role}, ${req.session.email} </h1><br>`);
        }
        res.end('<a href='+'/logout'+'>Logout</a>');
    }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href='+'/login'+'>Login</a>');
    }
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
  
    User.findOne({ email: email })
      .then(user => {
            if(user.email == email && user.password == password)
            {
                req.session.isLoggedIn = true;
                req.session.user = user;
                req.session.role = role;
                
                return req.session.save(err => {
                    if(req.session.role === 'librarian')
                      res.redirect('/admin');
                    else
                      res.redirect('/library');                 
                });
            }
            else 
            {
                res.write('<h4> User not exist! Please signup first.</h4>');
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

  
