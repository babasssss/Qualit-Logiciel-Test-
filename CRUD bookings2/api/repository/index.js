import bookRepo from './bookRepo.js';
import userRepo from './userRepo.js';
import bookingsRepo from './bookingsRepo.js'

export default (model) => ({
  bookRepo: bookRepo(model.Book),
  userRepo: userRepo(model.User),
  bookingsRepo: bookingsRepo(model.Bookings)
});
