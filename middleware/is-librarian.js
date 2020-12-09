module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    if(req.session.isLoggedIn && req.session.user.role === "librarian") {
        next();
    }
}