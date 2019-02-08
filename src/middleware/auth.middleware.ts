
// change when roles change user.role.roleId
export function authMiddleware(req, res, next) {
    const user = req.session.user;
    if (user.role === 'Admin' || user.role === 'Finance-Manager') {
      next();
    } else {
      res.sendStatus(401);
    }
}

