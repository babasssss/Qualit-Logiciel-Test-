import moment from 'moment';

export default (bookingsRepo) => {
  const bookingRepo = repository.bookingRepo
  const userRepo = repository.userRepo;

  function ValidDateFormat(date) {
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
      if (!ValidDateFormat(rentDate) || !ValidDateFormat(returnDate)) {
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
    const { id } = req.params;
    const { rentDate, returnDate, user } = req.body;
  
    // Vérifier si le livre est déjà loué pendant la période demandée
    if (bookingRepo.isBookAlreadyRented(req.body.book, req.body.rentDate, req.body.returnDate)) {
      console.log("Error: The book is already rented during the requested period.");
      return res.status(400).send({
        error: {
          message: 'The book is already rented during the requested period.',
        },
      });
    }
  
    // Vérifier si l'utilisateur existe
    const existingUser = userRepo.getUserById(user);
    if (!existingUser) {
      console.log("Error: User not found");
      return res.status(400).send({
        error: {
          message: "User not found",
        },
      });
    }
  
    // Vérifier le format des dates
    if (!ValidDateFormat(rentDate) || !ValidDateFormat(returnDate)) {
      console.log("Error: Invalid date format");
      return res.status(400).send({
        error: {
          message: "Invalid date format. Use 'YYYY-MM-DD' format.",
        },
      });
    }
  
    // Vérifier la cohérence des dates
    if (moment(rentDate).isSameOrAfter(moment(returnDate))) {
      console.log("Error: Rent date must be before return date");
      return res.status(400).send({
        error: {
          message: 'Rent date must be before return date',
        },
      });
    }
  
    // Mettre à jour la réservation
    const updatedBooking = bookingRepo.updateBooking(id, req.body);
    res.status(200).send({
      data: updatedBooking,
    });
  }


  const deleteBooking = (req, res) => {
    const { id } = req.params;
  
    // Vérifier si la réservation existe
    const existingBooking = bookingRepo.getBookingById(id);
    if (!existingBooking) {
      console.log("Error: Booking not found");
      return res.status(400).send({
        error: {
          message: "Booking not found",
        },
      });
    }
  
    // Supprimer la réservation
    bookingRepo.deleteBooking(id);
    res.status(200).send({
      message: "Booking deleted successfully",
    });
  };



  return {
    listBookings,
    createBookings,
    getBookings,
    updateBookings,
    deleteBooking
  };
}
