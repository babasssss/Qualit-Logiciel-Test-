import bookRepo from './bookRepo.js';
import userRepo from './userRepo.js';
import bookingsRepo from './bookingsRepo.js';

export default (model) => ({
  userRepo: userRepo(model.User),
  bookRepo: bookRepo(model.Book),
  bookingsRepo: bookingsRepo(model.Bookings),
});
