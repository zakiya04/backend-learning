const sessionUser = new Map();

export function setUser(id,user){

  return sessionUser.set(id,user);
};

export function getUser(id){

 return  sessionUser.get(id);
};

