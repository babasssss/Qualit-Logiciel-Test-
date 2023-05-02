
export default (Bookings) => {
  const bookings = [
    new Bookings('1236545796533', '2023-03-02', '2023-06-21', 'Livre', '9782743007080'),
    new Bookings('1234567345843', '2019-08-15', '2019-11-29', 'Film', '9782743007080')
  ];

  const listBookings = () => {
    return bookings;
  };

  const createBookings = (bookings) => {
    bookings.push(new Bookings(
      bookings.idBooking,
      bookings.rentDate,
      bookings.returnDate,
      bookings.book,
      bookings.user,
    ));
    return bookings;
  }

  const findBookings = (id) => {
    return bookings.find((bookings) => bookings.idBookings === id);
  }

  const updateBookings = (id, bookings) => {
    let foundBookingsIdx = 0;
    bookings.forEach((bookings, idx) => {
      if (bookings.isbn13 === id) {
        foundBookingsIdx = idx;
      }
    });
    
    if (foundBookingsIdx > 0) {
      bookings[foundBookingsIdx] = new Bookings(
        bookings.idBooking,
        bookings.rentDate,
        bookings.returnDate,
        bookings.book,
        bookings.user,
      );
      return bookings;
    }

    return null;
  }

  const deleteBookings = (id) => {
    let deletedBookings = null;
    bookings.forEach((bookings, idx) => {
      if (bookings.isbn13 === id) {
        deletedBookings = Object.assign({}, bookings);
        bookings.splice(idx, 1);
      }
    });

    return deletedBookings;
  }

  return {
    listBookings,
    createBookings,
    findBookings,
    updateBookings,
    deleteBookings
  };
};
