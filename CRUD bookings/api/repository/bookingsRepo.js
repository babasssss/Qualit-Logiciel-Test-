
export default (Booking) => {
  const bookingsData = [
    new Booking('1236545796533', '2023-03-02', '2023-06-21', '9782744005084', '9782743007080'),
    new Booking('1234567345843', '2019-08-15', '2019-11-29', '9782746035966', '9782743007080')
  ];

  const listBookings = () => {
    return bookingsData;
  };

  const createBookings = (bookings) => {
    bookingsData.push(new Booking(
      bookings.idBooking,
      bookings.rentDate,
      bookings.returnDate,
      bookings.book,
      bookings.user,
    ));
    return bookings;
  }

  const findBookings = (id) => {
    return bookingsData.find((bookings) => bookings.idBooking === id);
  }

  const updateBookings = (id, bookings) => {
    let foundBookingsIdx = 0;
    bookingsData.forEach((bookings, idx) => {
      if (bookings.isbn13 === id) {
        foundBookingsIdx = idx;
      }
    });
    
    if (foundBookingsIdx > 0) {
      bookingsData[foundBookingsIdx] = new Booking(
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
    bookingsData.forEach((bookings, idx) => {
      if (bookings.isbn13 === id) {
        deletedBookings = Object.assign({}, bookings);
        bookingsData.splice(idx, 1);
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
