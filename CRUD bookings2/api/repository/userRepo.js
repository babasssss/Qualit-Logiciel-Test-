export default (User) => {
  const users = [
    new User('9782743007080' ,'DUPONT' ,'Antoine' ,'1999-04-05' ,'23 allee Jean-Moulin 49400 Saumur', '0634567895','antoine.dupont@gmail.com'),
    new User('8274300809707' ,'SOREAU' ,'Bastien' ,'1978-12-21' ,'72 rue du Maréchal 37500 Chinon', '0645345679' ,'soreau.bastien@gmail.com')
  ];

  const listUsers = () => {
    return users;
  };

  const createUser = (user) => {
    users.push(new User(
      user.id,
      user.lastName,
      user.firstName,
      user.birthDate,
      user.address,
      user.phone,
      user.email,
    ));
    return user;
  }

  const findUser = (id) => {
    return users.find((user) => user.idUser === id);
  }

  const updateUser = (id, user) => {
    let foundUserIdx = 0;
    users.forEach((user, idx) => {
      if (user.idUser === id) {
        foundUserIdx = idx;
      }
    });
    
    if (foundUserIdx > 0) {
      users[foundUserIdx] = new User(
        user.idUser,
        user.lastName,
        user.firstName,
        user.birthDate,
        user.address,
        user.phone,
        user.email,
      );
      return user;
    }
    return null;
  }

  const deleteUser = (id) => {
    let deletedUser = null;
    users.forEach((user, idx) => {
      if (user.idUser === id) {
        deletedUser = Object.assign({}, user);
        users.splice(idx, 1);
      }
    });
    return deletedUser;
  }

  return {
    listUsers,
    createUser,
    findUser,
    updateUser,
    deleteUser
  };
};
