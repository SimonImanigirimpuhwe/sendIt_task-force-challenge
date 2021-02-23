import app from '../app';
import { expect, use, request } from 'chai';
import http from 'chai-http';

use(http);

let token;
let todoId;
describe('To-Dos', () => {
    before((done) => {
        request(app)
        .post('/users/signup')
        .send({
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@gmail.com',
            password: 'John@123',
        })
        .then((res) => {
            token = res.body.token
            expect(res).have.status(201)
            done()
        })
        .catch((err) => {
            throw new Error(err)
        })
    });
    describe('Create To-Do', () => {
        it ('should create a To-Do item', (done) => {
            request(app)
            .post('/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Tile of todo',
                description: 'Desription of todo',
                priority: 'LOW',
            })
            .end((err, res) => {
                if (err) done (err)
                todoId = res.body.newTodo.id
                expect(res).have.status(201)
                expect(res.body.msg).to.match(/New To-Do created/i)
                done()
            })
        });
        it ('should return 400 if one field is missing', (done) => {
            request(app)
            .post('/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Tile of todo',
                description: 'Desription of todo',
            })
            .end((err, res) => {
                if (err) done (err)
                expect(res).have.status(400)
                expect(res.body.msg).to.match(/is required/i)
                done()
            })
        });
        it ('should return 401 if wrong headers or no token provided', (done) => {
            request(app)
            .post('/todos')
            .set('Authorization', token)
            .send({
                title: 'Tile of todo',
                description: 'Desription of todo',
            })
            .end((err, res) => {
                if (err) done (err)
                expect(res).have.status(401)
                expect(res.body.msg).to.match(/Access Dinied, please login/i)
                done()
            })
        });
        it ('should return 403 if Unauthorized', (done) => {
            request(app)
            .post('/todos')
            .send({
                title: 'Tile of todo',
                description: 'Desription of todo',
            })
            .end((err, res) => {
                if (err) done (err)
                expect(res).have.status(403)
                expect(res.body.msg).to.match(/Unauthorized/i)
                done()
            })
        });
    });

    describe(' /GET all', () => {
        it('should get all To-Do', (done) => {
            request(app)
            .get('/todos')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done (err)
                expect(res).have.status(200)
                expect(res.body.msg).to.match(/All To-Do retrieved/i)
                done()
            }) 
        });
    })
    describe(' /GET/:id  Single To-Do', () => {
        it('should return a specified To-Do', (done) => {
            request(app)
            .get(`/todos/${todoId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done (err)
                expect(res).have.status(200)
                expect(res.body.msg).to.match(/Single To-Do retrieved/i)
                expect(res.body).to.has.ownProperty('uniqueTodo')
                done()
            }) 
        });
    })
    describe(' /PUT/:id  Update To-Do', () => {
        it('should update a specified To-Do', (done) => {
            request(app)
            .put(`/todos/${todoId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                priority: 'MEDIUM',
            })
            .end((err, res) => {
                if (err) done (err)
                expect(res).have.status(200)
                expect(res.body.msg).to.match(/To-Do updated successfully/i)
                expect(res.body).to.has.ownProperty('updatedTodo')
                done()
            }) 
        });
        it('should should return 400 if send empty field', (done) => {
            request(app)
            .put(`/todos/${todoId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                priority: '',
            })
            .end((err, res) => {
                if (err) done (err)
                expect(res).have.status(400)
                expect(res.body.msg).to.match(/cannot be empty/i)
                done()
            }) 
        });
        it('should should return 404 if To-Do not found', (done) => {
            const id = (new Array(10).join('a')).length
            request(app)
            .put(`/todos/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                priority: 'HIGH',
            })
            .end((err, res) => {
                if (err) done (err)
                expect(res).have.status(404)
                expect(res.body.msg).to.match(/No To-Do with such id/i)
                done()
            }) 
        });
    });
    describe('/DELETE Delete To-Do', () => {
        it ('should delete a specified To-Do', (done) => {
            request(app)
            .delete(`/todos/${todoId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done (err)
                expect(res).have.status(200)
                expect(res.body.msg).to.match(/To-Do deleted successfully/i)
                done()
            }) 
        })
        it ('should return 404 if specified To-Do was not found', (done) => {
            const id = (new Array(10).join('a')).length
            request(app)
            .delete(`/todos/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done (err)
                expect(res).have.status(404)
                expect(res.body.msg).to.match(/No To-Do with such id/i)
                done()
            }) 
        })
    })
})