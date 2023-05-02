
export default (bookingsRepo) => {
  const listBookings = (_, res) => {
    res.send({
      data: bookingsRepo.listBookings()
    });
  };

  const createBookings = (req, res) => {
    const bookings = bookingsRepo.createBookings(req.body);
    res.status(201).send({
      data: bookings
    });
  }

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
