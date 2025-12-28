import jwt from 'jsonwebtoken';

const secret = "!password&$";

export function setUser(user){

return jwt.sign({
  id: user.id,
  email: user.email,
},secret)
};

export function getUser(token){

if(!token) return null;

return jwt.verify(token,secret)

};

