const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../server');

chai.use(chaihttp);

//give a test object
const testCustomer = {
    firstname: 'Francis',
    lastname: 'Ford Coppola',
    email: 'francis.ford@coppola.com',
    phone: '8975321'
}

//"should" is assertion style provided by chai library
const should = chai.should();

//test suites in mocha framework
//describe() to group test cases that have same target or functionality. 

//test DELETE ALL
describe('/DELETE ALL customers', () => {
    it('delete all customers', (done) => {
        chai.request(app)
            .delete('/api/customers')
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });
});

//test POST a customer
describe('/POST customer', ()=>{   
    // a test case is passed if all assertions return true.
    it('Add a new customer', (done)=>{
        //use chai-http request() function to send POST request. 
        //pass the app (our web server) to the request()
        chai.request(app)
            .post('/api/customers')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(testCustomer))
            .end((err, res) => {// assertions
                res.should.have.status(200);
                //response contains an object,
                res.body.should.be.a('object');
                // response has property "firstname"
                res.body.should.have.property('firstname');
                //done() indicates that callback is completed and the assertions are ready for the verification
                done();
            })
    })
});

// test GET
describe('/GET customers', () => {
    it('Fetch all customers', (done) => {
        chai.request(app)
            .get('/api/customers')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    });
});