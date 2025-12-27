import { getUser } from "../service/auth.service";

export async function restictUserLoggedInOnly(req, res, next){
  const userId = req.cookies.uuid;

  if(!userId){
    return res.redirect('/login')
  }
  const user = getUser(userId);

  if(!user) return res.redirect('/login');

  req.user = user;
  next();
};

export async function checkAuth(req, res, next){
  const userId = req.cookies.uuid;

  const user = getUser(userId);

  req.user = user;
  next();
};

