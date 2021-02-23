import app from '../app';
import { expect, use, request } from 'chai';
import http from 'chai-http';

use(http);

describe('Signup', () => {
    it('Should signup a user', (done) => {
        request(app)
        .post('/users/signup')
        .send({
            firstName: 'test',
            lastName: 'Simon',
            email: 'simon@gmail.com',
            password: 'simon@123',
        })
        .end((err, res) => {
            if (err) done(err);
            expect(res).have.status(201)
            done()
        })
    });
    it ('should return 400 if one field is missing', (done) => {
        request(app)
        .post('/users/signup')
        .send({
            firstName: 'test',
            lastName: '',
            email: 'simon@gmail.com',
            password: 'simon@123',
        })
        .end((err, res) => {
            if (err) done(err);
            expect(res).have.status(400)
            expect(res.body.msg).to.match(/LastName is required/i)
            done()
        })
    })
});
describe('Login', () => {
    before((done) => {
        request(app)
        .post('/users/signup')
        .send({
            firstName: 'test',
            lastName: 'anyname',
            email: 'saved@gmail.com',
            password: 'test@123',
        })
        .end((err, res) => {
            if (err) done(err);
            expect(res).have.status(201)
            done()
        })
    });
    it ('should login a user when provided correct credentials', (done) => {
        request(app)
        .post('/users/login')
        .send({
            email: 'saved@gmail.com',
            password: 'test@123',
        })
        .end((err, res) => {
            if (err) done(err);
            expect(res).have.status(200)
            expect(res.body.msg).to.match(/Logged in successfully/i)
            done()
        })
    })
    it ('should return 400 if one field is invalid', (done) => {
        request(app)
        .post('/users/login')
        .send({
            email: 'saved@gmail.com',
            password: 'test@1235',
        })
        .end((err, res) => {
            if (err) done(err);
            expect(res).have.status(400)
            expect(res.body.msg).to.match(/Invalid email or password/i)
            done()
        })
    })
    it ('should return 400 if one field is missing', (done) => {
        request(app)
        .post('/users/login')
        .send({
            email: 'saved@gmail.com',
        })
        .end((err, res) => {
            if (err) done(err);
            expect(res).have.status(400)
            expect(res.body.msg).to.match(/is required/i)
            done()
        })
    })
})