module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    if(req.session.isLoggedIn && req.session.user.role === "student") {
        next();
    }
    // if(!req.session.isLoggedIn && req.session.user.role != "student") {
    //     res.write("<h1>Welcome Invalid </h1><br>");
    // }
}