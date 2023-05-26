
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
            message: "Invalid phone number.",
          },
        });
      }

     if (!ValidDateFormat(birthDate)) {
      return res.status(400).send({
        error: {
          message: "Invalid birth date.",
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

    const { lastName, firstName, birthDate, address, phone, email } = req.body;

    if (!ValidDateFormat(birthDate)) {
    return res.status(400).send({
      error: {
        message: "Invalid birth date.",
        },
      });
    }
    if (!ValidPhoneNumber(phone)) {
      return res.status(400).send({
        error: {
          message: "Invalid phone number.",
        }, 
      });
    }



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
      res.status(200).send({
        message: "User has been successfully deleted",
        meta: {
          _deleted: deletedUser
        }
      });
    } else {
      res.status(404).send({
        message: "User was not found"
      })
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
