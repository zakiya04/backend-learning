const sessionUser = new Map();

export function setUser(id,user){

  sessionUser.set(id,user);
};

export function getUser(id){

  sessionUser.get(id);
};

