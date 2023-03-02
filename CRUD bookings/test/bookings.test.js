import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';

chai.use(chaiHttp);

// IMPORTANT : For Mocha working, always use function () {}
// (never () => {})
describe('Bookingings', function () {
  it('GET /bookings should return a success response with all bookings', function (done) {
    chai.request(api)
    .get('/bookings')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: [
          {
            idBooking: '1236545796533',
            rentDate: '2023-03-02',
            returnDate: '2023-06-21',
            book: 'Livre',
            user: '9782743007080',
          },
          {
            idBooking: '1234567345843',
            rentDate: '2019-08-15',
            returnDate: '2019-11-29',
            book: 'Film',
            user: '9782743007080',
          }
        ]
      });
      done();
    });
  });
  it('POST /bookings should create the booking and return a success response with the booking', function (done) {
    const booking = {
      idBooking: '1234567345843',// TODO MIDIFIER DONNEES POUR ADD EN POST
      rentDate: '2019-08-15',
      returnDate: '2019-11-29',
      book: 'Film',
      user: '9782743007080',
    };
    chai.request(api)
    .post('/bookings')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(201);
      chai.expect(res.body).to.deep.equal({
        data: booking
      });
      done();
    });
  });

  it('GET /bookings/:id should return a success response with found booking', function (done) {
    chai.request(api)
    .get('/bookings/9782746035966')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: {
          idBooking: '1236545796533',
          rentDate: '2023-03-02',
          returnDate: '2023-06-21',
          book: 'Livre',
          user: '9782743007080',
        }
      });
      done();
    });
  });
  it('GET /bookings/:id should return not found response if the booking does not exists', function (done) {
    chai.request(api)
    .get('/bookings/1234567899999')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'Booking 1234567899999 not found'
      });
      done();
    });
  });
  it('PUT /bookings/:id should return a success response with found booking', function (done) {
    const booking = {
      idBooking: '1236545796533',
      rentDate: '2023-03-02',
      returnDate: '2023-06-21',
      book: 'FILM',// Modify Livre in FILM
      user: '9782743007080',
    };
    chai.request(api)
    .put('/bookings/1236545796533')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: {
          idBooking: '1236545796533',
          rentDate: '2023-03-02',
          returnDate: '2023-06-21',
          book: 'FILM',// Modify Livre in FILM
          user: '9782743007080',
        }
      });
      done();
    });
  });
  it('PUT /bookings/:id should return not found response if the booking does not exists', function (done) {
    const booking = {
      idBooking: '354567345678',
      rentDate: '2023-03-02',
      returnDate: '2023-06-21',
      book: 'FILM',// Modify Livre in FILM
      user: '9782743007080',
    };
    chai.request(api)
    .put('/bookings/354567345678')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'Booking 354567345678 not found'
      });
      done();
    });
  });

  it('DELETE /bookings/:id should return a success response', function (done) {
    chai.request(api)
    .delete('/bookings/1236545796533')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        meta: {
          _deleted: {
            idBooking: '1236545796533',
            rentDate: '2023-03-02',
            returnDate: '2023-06-21',
            book: 'Livre',
            user: '9782743007080',
          }
        }
      });
      done();
    });
  });
  it('DELETE /bookings/:id should return not found response if the booking does not exists', function (done) {
    chai.request(api)
    .delete('/bookings/1234567899999')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'Booking 1234567899999 not found'
      });
      done();
    });
  });
});
