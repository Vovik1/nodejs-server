/* eslint-disable no-unused-vars */
process.env.NODE_ENV = 'test';
const request = require('supertest');
const chai = require('chai');
const server = require('../server');

const should = chai.should();
const { expect } = chai;
let lectureId;

function loginUser(auth) {
  return (done) => {
    request(server)
      .post('/api/user/signin')
      .send({
        email: 'someone2@gmail.com',
        password: 'someone2',
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        auth.token = res.headers['access-token'];
        return done();
      });
  };
}
const auth = {};
before(loginUser(auth));

describe('POST /api/lecture', () => {
  it('should require authorization', (done) => {
    request(server)
      .post('/api/lectures')
      .expect(401)
      .end((err) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('it should not POST a lecture without description', (done) => {
    const lecture = {
      title: 'The JS is cool',
      author: 'J.R.R. Tolkien',
      videoUrl: 'https://www.youtube.com/watch?v=IDHfvpsYShs',
    };
    request(server)
      .post('/api/lectures')
      .set('Access-Token', auth.token)
      .send(lecture)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('description');
        res.body.errors.description.should.have
          .property('kind')
          .eql('required');
        done();
      });
  });

  it('it should POST a lecture ', (done) => {
    const lecture = {
      title: 'Javascript for begginers',
      author: 'J.R.R. Tolkien',
      videoUrl: 'https://www.youtube.com/watch?v=IDHfvpsYShs',
      description: 'Javascript is cool',
    };
    request(server)
      .post('/api/lectures')
      .set('Access-Token', auth.token)
      .send(lecture)
      .expect(201)
      .end((err, res) => {
        lectureId = res.body._id;
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.should.have.property('author');
        res.body.should.have.property('description');
        done();
      });
  });
});

describe('/GET/:id lecture', () => {
  it('it should GET a lecture by the given id', (done) => {
    request(server)
      .get(`/api/lectures/${lectureId}`)
      .set('Access-Token', auth.token)
      .expect(200)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.should.have.property('description');
        res.body.should.have.property('id').eql(lectureId);
        done();
      });
  });
});

describe('/PUT/:id lecture', () => {
  it('it should UPDATE a lecture given the id', (done) => {
    request(server)
      .put(`/api/lectures/${lectureId}`)
      .set('Access-Token', auth.token)
      .send({ title: 'Learning some Java' })
      .expect(200)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('title').eql('Learning some Java');
        done();
      });
  });
});

describe('/DELETE/:id lecture', () => {
  it('it should DELETE a lecture by given id', (done) => {
    request(server)
      .delete(`/api/lectures/${lectureId}`)
      .set('Access-Token', auth.token)
      .expect(204)
      .end((err, res) => {
        if (err) throw err;
        // res.body.should.be.a('object');
        done();
      });
  });
});
