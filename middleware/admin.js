module.exports = function(req, res, next) {
    // 401 Unauthorize
    // 403 Forbidden
    if (!req.user.isAdmin) return res.status(403).send('Acces Denied.');
    next()
    }
    