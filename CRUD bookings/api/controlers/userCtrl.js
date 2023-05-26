
export default (userRepo) => {

  const userRepo = userRepo.userRepo

  const ValidDateFormat = (dateString) => {
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/; // Format YYYY-MM-DD
    return dateFormatRegex.test(dateString);
  };
  
  const ValidPhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^(\+|00)?(33|0)[1-9][0-9]{8}$/; // Format +33XXXXXXXXX or 0XXXXXXXXX
    return phoneNumberRegex.test(phoneNumber);
  };
  

  const listUsers = (_,res) => {
    res.send({
      data:userRepo.listUsers()
    })
  }

  const createUser = (req, res) => {
    const { birthDate, phone } = req.body;

    
      if (!ValidPhoneNumber(phone)) {
        return res.status(400).send({
          error: {
            message: "Invalid phone number. The phone number must start with '+33', '0033' or '0', followed by exactly 9 digits.",
          },
        });
      }

     if (!ValidDateFormat(birthDate)) {
      return res.status(400).send({
        error: {
          message: "Invalid birth date format. Use 'YYYY-MM-DD' format.",
        },
      });
    }

    const user = userRepo.createUser(req.body);
    res.status(201).send({
      data:user,
    });

  }

  const updateUser = (req, res) => {
    const id = req.params.id;
    const user = userRepo.updateUser(id, req.body);

    if (user) {
      return res.send({
        data: user
      });
    }

    res.status(404).send({
      error: `User ${id} not found`
    });
  }

  const getUser = (req, res) => {
    const id = req.params.id;
    const user = userRepo.findUser(id);

    if (user) {
      return res.send({
        data: user
      });
    }

    res.status(404).send({
      error: `User ${id} not found`
    });
  }

  const deleteUser = (req, res) => {
    const id = req.params.id;
    const deletedUser = userRepo.deleteUser(id);

    if (deletedUser) {
      return res.send({
        meta: {
          _deleted: deletedUser
        }
      });
    }

    res.status(404).send({
      error: `User ${id} not found`
    });
  }

  return {
    listUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
  };
}
