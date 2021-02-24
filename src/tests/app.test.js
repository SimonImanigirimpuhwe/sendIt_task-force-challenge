import app from '../app';
import { expect, use, request } from 'chai';
import http from 'chai-http';

use(http);

describe('Welcome Route', () => {
    it('should return a welcome message', (done) => {
        request(app)
        .get('/')
        .end((err, res) => {
            if (err) done (err)
            expect(res).have.status(200)
            expect(res.body.msg).to.match(/Welcome to To-Do API/i)
            done()
        })
    })
})
