import moment from 'moment';

export default (bookingsRepo) => {
  const bookingRepo = repository.bookingRepo
  const userRepo = repository.userRepo;

  function isValidDateFormat(date) {
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/; // Format YYYY-MM-DD
    return dateFormatRegex.test(date);
  }


  const listBookings = (_, res) => {
    res.send({
      data: bookingsRepo.listBookings()
    });
  };
 

  

  const createBookings = (req, res) => {
    try {
      const { rentDate, returnDate, user } = req.body;
      const existingUser = userRepo.getUserById(user);

      if (!existingUser) {
        return res.status(400).send({
          error: {
            message: "User not found",
          },
        });
      }
  
      if (moment(rentDate).isSameOrAfter(moment(returnDate))) {
        return res.status(400).send({
          error: {
            message: 'The rental date must be less than the return date',
          },
        });
      }
      if (!isValidDateFormat(rentDate) || !isValidDateFormat(returnDate)) {
        return res.status(400).send({
          error: {
            message: "Invalid date format",
          },
        });
      }

      const { book } = req.body;
  
      if (bookingRepo.isBookAlreadyRented(book, rentDate, returnDate)) {
        return res.status(400).send({
          error: {
            message: 'The book is rented during this period',
          },
        });
      }
  
  
  
      const booking = bookingRepo.createBooking(req.body);
      res.status(201).send({
        data: booking,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        error: {
          message: 'Error server',
        },
      });
    }
  };
  

  const updateBookings = (req, res) => {
    const id = req.params.id;
    const bookings = bookingsRepo.updateBookings(id, req.body);

    if (bookings) {
      return res.send({
        data: bookings
      });
    }

    res.status(404).send({
      error: `Bookings ${id} not found`
    });
  }

  const getBookings = (req, res) => {
    const id = req.params.id;
    const bookings = bookingsRepo.findBookings(id);

    if (bookings) {
      return res.send({
        data: bookings
      });
    }

    res.status(404).send({
      error: `Bookings ${id} not found`
    });
  }

  const deleteBookings = (req, res) => {
    const id = req.params.id;
    const deletedBookings = bookingsRepo.deleteBookings(id);

    if (deletedBookings) {
      return res.send({
        meta: {
          _deleted: deletedBookings
        }
      });
    }

    res.status(404).send({
      error: `Bookings ${id} not found`
    });
  }

  return {
    listBookings,
    createBookings,
    getBookings,
    updateBookings,
    deleteBookings
  };
}
