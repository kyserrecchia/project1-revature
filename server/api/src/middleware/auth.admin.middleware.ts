
// change when roles change user.role.roleId
export function authAdminMiddleware(req, res, next) {
    const user = req.session.user;
    if (user.role === 'Admin') {
      next();
    } else {
      res.sendStatus(401);
    }
}