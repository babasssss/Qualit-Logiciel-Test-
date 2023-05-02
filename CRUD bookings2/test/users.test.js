import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';
/*
 * utilisation de la depandance UUID
 * Methode 1
 * 1.
 * 2. const { v4: uuidv4 } = require('uuid'); 
 * 3. const uuid = uuidv4();
*/

chai.use(chaiHttp);
/*
 *
 * Methode 2
 * 
*/
function generateUUID() {
  let uuid = '', i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}
const uuid = generateUUID();


describe('Users', function () {


  it('GET /users should return a success response with all users', function (done) {
    chai.request(api)
    .get('/users')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: [
          {
            idUser: '9782743007080',
            lastName: 'DUPONT',
            firstName: 'Antoine',
            birthDate: '1999-04-05',
            address: '23 allee Jean-Moulin 49400 Saumur',
            phone: '0634567895',
            email:'antoine.dupont@gmail.com'
          },
          {
            idUser: '8274300809707',
            lastName: 'SOREAU',
            firstName: 'Bastien',
            birthDate: '1978-12-21',
            address: '72 rue du Maréchal 37500 Chinon',
            phone: '0645345679',
            email: 'soreau.bastien@gmail.com'
          }
        ]
      });
      done();
    });
  });
  it('POST /users should create the user and return a success response with the user', function (done) {
    const user = {
      idUser: uuid,
      lastName: 'CHABAL',
      firstName: 'Sébastien',
      birthDate: '1977-12-08',
      address: '12  rue du petit rond 44000 Nantes',
      phone: '0678543235',
      email:'sebatien.chabl@gmail.com'
    };
    chai.request(api)
    .post('/users')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(201);
      chai.expect(res.body).to.deep.equal({
        data: user
      });
      done();
    });
  });
  it('GET /users/:id should return a success response with found user', function (done) {
    chai.request(api)
    .get('/users/8274300809707')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: {
          idUser: '8274300809707',
          lastName: 'SOREAU',
          firstName: 'Bastien',
          birthDate: '1978-12-21',
          address: '72 rue du Maréchal 37500 Chinon',
          phone: '0645345679',
          email: 'soreau.bastien@gmail.com'
        }
      });
      done();
    });
  });
  it('GET /users/:id should return not found response if the user does not exists', function (done) {
    chai.request(api)
    .get('/users/'+uuid)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'User '+uuid+' not found'
      });
      done();
    });
  });
  it('PUT /users/:id should return a success response with found user', function (done) {
    const user = {
      idUser: '8274300809707',
      lastName: 'Taveau',
      firstName: 'Simon',
      birthDate: '1978-12-21',
      address: '72 rue du Maréchal 37500 Chinon',
      phone: '0645345679',
      email: 'soreau.bastien@gmail.com'
    };
    chai.request(api)
    .put('/users/8274300809707')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: {
          idUser: '8274300809707',
          lastName: 'Taveau',
          firstName: 'Simon',
          birthDate: '1978-12-21',
          address: '72 rue du Maréchal 37500 Chinon',
          phone: '0645345679',
          email: 'soreau.bastien@gmail.com'
        }
      });
      done();
    });
  });
  it('PUT /users/:id should return not found response if the book does not exists', function (done) {
    const user = {
      idUser: '1234567899999',
      lastName: 'Taveau',
      firstName: 'Simon',
      birthDate: '1978-12-21',
      address: '72 rue du Maréchal 37500 Chinon',
      phone: '0645345679',
      email: 'soreau.bastien@gmail.com'
    };
    chai.request(api)
    .put('/users/1234567899999')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'User 1234567899999 not found'
      });
      done();
    });
  });

  it('DELETE /users/:id should return a success response', function (done) {
    chai.request(api)
    .delete('/users/9782743007080')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        meta: {
          _deleted: {
            idUser: '9782743007080',
            lastName: 'DUPONT',
            firstName: 'Antoine',
            birthDate: '1999-04-05',
            address: '23 allee Jean-Moulin 49400 Saumur',
            phone: '0634567895',
            email:'antoine.dupont@gmail.com'
          }
        }
      });
      done();
    });
  });
  it('DELETE /users/:id should return not found response if the user does not exists', function (done) {
    chai.request(api)
    .delete('/users/1234567899999')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'User 1234567899999 not found'
      });
      done();
    });
  });
});
