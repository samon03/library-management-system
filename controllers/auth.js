const Librarian = require('../models/librarian');

exports.getAllAdmins = (req, res) => {
    Librarian.find()
     .then((val) => {
        res.send(val);
     }).catch(err => {
        console.log(`Cannot get all books ${JSON.stringify(err, undefined, 2)}`);
     });
};

exports.addAdmin =  (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    var librarian = new Librarian({
        name: name,
        password: password
    }); 

    console.log(name + ' ' + password);

    librarian.save()
    .then((val) => {
        res.send(val);
    }).catch(err => {
        console.log("Invalid");
    });
}