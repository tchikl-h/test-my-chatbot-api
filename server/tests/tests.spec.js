const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../built/server').default;
const companyProperties = ["id", "name", "description", "created_at", "date_update", "deleted_at"];
const chatbotProperties = ["id", "project_name", "description", "container_mode", "dialogflow_project_id", "dialogflow_client_email", "dialogflow_private_key", "companyId", "created_at", "date_update", "deleted_at"];
const userProperties = ["id", "name", "chatbotIds", "companyId", "created_at", "date_update", "deleted_at"];
const testProperties = ["id", "name", "description", "chatbotId", "created_at", "date_update", "deleted_at"];


chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

describe('test-my-chatbot API', function() {
    this.timeout(10000)
    var server;

    before(done => {
        setTimeout(function() {
            server = app.listen(3001, () => {
                console.log("Server launched !");
            });
            done();
        }, 3000);
    });

    describe('GET getCompanies, getChatbots, getUsers, getTests', function() {
        it('[getCompanies] it should GET all the companies (200)', async () => {
            try {
                const res = await chai.request(server).get('/v1/companies')
                res.should.have.status(200);
            } catch (err) {
                throw err;
            }
        });

        it('[getCompanies] it should GET all the companies, check response length and check keys', async () => {
            try {
                const res = await chai.request(server).get('/v1/companies')
                res.body.should.be.a('array');
                res.body.length.should.be.eql(3);
                res.body.every(company => expect(company).to.have.all.keys(companyProperties))
            } catch (err) {
                throw err;
            }
        });

        it('[getChatbots] it should GET all the chatbots (200)', async () => {
            try {
                const res = await chai.request(server).get('/v1/chatbots')
                res.should.have.status(200);
            } catch (err) {
                throw err;
            }
        });

        it('[getChatbots] it should GET all the chabtots, check response length and check keys', async () => {
            try {
                const res = await chai.request(server).get('/v1/chatbots')
                res.body.should.be.a('array');
                res.body.length.should.be.eql(9);
                res.body.every(chatbot => expect(chatbot).to.have.all.keys(chatbotProperties))
            } catch (err) {
                throw err;
            }
        });

        it('[getUsers] it should GET all the users (200)', async () => {
            try {
                const res = await chai.request(server).get('/v1/users')
                res.should.have.status(200);
            } catch (err) {
                throw err;
            }
        });

        it('[getUsers] it should GET all the users, check response length and check keys', async () => {
            try {
                const res = await chai.request(server).get('/v1/users')
                res.body.should.be.a('array');
                res.body.length.should.be.eql(9);
                res.body.every(user => expect(user).to.have.all.keys(userProperties))
            } catch (err) {
                throw err;
            }
        });

        it('[getTests] it should GET all the tests (200)', async () => {
            try {
                const res = await chai.request(server).get('/v1/tests')
                res.should.have.status(200);
            } catch (err) {
                throw err;
            }
        });

        it('[getTests] it should GET all the tests, check response length and check keys', async () => {
            try {
                const res = await chai.request(server).get('/v1/tests')
                res.body.should.be.a('array');
                console.log(res.body);
                res.body.length.should.be.eql(18);
                res.body.every(test => expect(test).to.have.all.keys(testProperties))
            } catch (err) {
                throw err;
            }
        });
    });

    describe('GET getChatbotsByCompany, getUsersByCompany, getChatbotsByUser, getTestsByChatbot', function() {
        it('[getChatbotsByCompany] it should GET all the chatbots from Amazon (200)', async () => {
            try {
                const res = await chai.request(server).get('/v1/companies/1/chatbots')
                res.should.have.status(200);
            } catch (err) {
                throw err;
            }
        });

        it('[getChatbotsByCompany] it should GET all the chatbots from Google, check array, check length and check keys', async () => {
            try {
                const res = await chai.request(server).get('/v1/companies/2/chatbots')
                res.body.should.be.a('array');
                res.body.length.should.be.eql(3);
                res.body.every(chatbot => expect(chatbot).to.have.all.keys(chatbotProperties))
            } catch (err) {
                throw err;
            }
        });

        it('[getChatbotsByCompany] it should GET all the chatbots from Microsoft and check companyId for each chatbots', async () => {
            try {
                const res = await chai.request(server).get('/v1/companies/3/chatbots')
                res.body.every(chatbot => expect(chatbot).to.have.property("companyId").eql(3))
            } catch (err) {
                throw err;
            }
        });

        it('[getUsersByCompany] it should GET all the users from Amazon (200)', async () => {
            try {
                const res = await chai.request(server).get('/v1/companies/1/users')
                res.should.have.status(200);
            } catch (err) {
                throw err;
            }
        });

        it('[getUsersByCompany] it should GET all the users from Google, check array, check length and check keys', async () => {
            try {
                const res = await chai.request(server).get('/v1/companies/2/users')
                res.body.should.be.a('array');
                res.body.length.should.be.eql(3);
                res.body.every(user => expect(user).to.have.all.keys(userProperties))
            } catch (err) {
                throw err;
            }
        });

        it('[getUsersByCompany] it should GET all the users from Microsoft and check companyId for each users', async () => {
            try {
                const res = await chai.request(server).get('/v1/companies/3/users')
                res.body.every(user => expect(user).to.have.property("companyId").eql(3))
            } catch (err) {
                throw err;
            }
        });

        it('[getChatbotsByUser] it should GET all the chatbots from user 1 from Amazon (200)', async () => {
            try {
                const res = await chai.request(server).get('/v1/companies/1/users/1/chatbots')
                res.should.have.status(200);
            } catch (err) {
                throw err;
            }
        });

        it('[getChatbotsByUser] it should GET all the chatbots from user 4 from Google, check array, check length and check keys', async () => {
            try {
                const res = await chai.request(server).get('/v1/companies/2/users/4/chatbots')
                res.body.should.be.a('array');
                res.body.length.should.be.eql(2);
                res.body.every(chatbot => expect(chatbot).to.have.all.keys(chatbotProperties))
            } catch (err) {
                throw err;
            }
        });

        it('[getChatbotsByUser] it should GET all the chatbots from user 7 from Microsoft and check companyId for each chatbots', async () => {
            try {
                const res = await chai.request(server).get('/v1/companies/3/users/7/chatbots')
                res.body.every(chatbot => expect(chatbot).to.have.property("companyId").eql(3))
            } catch (err) {
                throw err;
            }
        });

        it('[getTestsByChatbot] it should GET all the tests from chatbot 1 (200)', async () => {
            try {
                const res = await chai.request(server).get('/v1/chatbots/1/tests')
                res.should.have.status(200);
            } catch (err) {
                throw err;
            }
        });

        it('[getTestsByChatbot] it should GET all the tests from chatbot 4, check array, check length and check keys', async () => {
            try {
                const res = await chai.request(server).get('/v1/chatbots/4/tests')
                res.body.should.be.a('array');
                res.body.length.should.be.eql(2);
                res.body.every(test => expect(test).to.have.all.keys(testProperties))
            } catch (err) {
                throw err;
            }
        });
    });



    describe('POST/DELETE postCompanies/deleteCompanies, postChatbots/deleteChatbots, postUsers/deleteUsers, postTests/deleteTests', function() {
        it('[getCompanies] it should GET all the companies and check response length before post', async () => {
            try {
                const res = await chai.request(server).get('/v1/companies')
                res.body.should.be.a('array');
                res.body.length.should.be.eql(3);
            } catch (err) {
                throw err;
            }
        });

        it('[postCompanies] it should POST a company (200)', async () => {
            try {
                const res = await chai.request(server).post('/v1/companies')
                .type('form')
                .send({
                    'companyName': 'Apple to patch',
                    'companyDescription': 'Awesome description to patch'
                })
                res.should.have.status(200);
            } catch (err) {
                throw err;
            }
        });

        it('[patchCompanies] it should PATCH a company (200)', async () => {
            try {
                const getRes = await chai.request(server).get('/v1/companies')
                const newCompanyName = getRes.body.filter((company) => {
                    if (company.name === 'Apple to patch')
                        return company;
                })
                const res = await chai.request(server).patch(`/v1/companies/${newCompanyName[0].id}`)
                .type('form')
                .send({
                    'companyName': 'Apple',
                    'companyDescription': 'Awesome description'
                })
                res.should.have.status(200);
            } catch (err) {
                throw err;
            }
        });

        it('[getCompanies] it should GET all the companies and check response length after post', async () => {
            try {
                const res = await chai.request(server).get('/v1/companies')
                res.body.should.be.a('array');
                res.body.length.should.be.eql(4);
            } catch (err) {
                throw err;
            }
        });

        it('[getChatbots] it should GET all the chabtots and check response length before post', async () => {
            try {
                const res = await chai.request(server).get('/v1/chatbots')
                res.body.should.be.a('array');
                res.body.length.should.be.eql(9);
            } catch (err) {
                throw err;
            }
        });

        it('[postChatbots] it should POST a chatbot (200)', async () => {
            try {
                const getRes = await chai.request(server).get('/v1/companies')
                const newCompanyName = getRes.body.filter((company) => {
                    if (company.name === 'Apple')
                        return company;
                })
                const res = await chai.request(server).post('/v1/chatbots')
                .type('form')
                .send({
                    "projectName": "Chatbot Apple A to patch", 
                    "description": "Awesome Description to patch", 
                    "containerMode": "Dialogflow to patch", 
                    "dialogflowProjectId": 5678987655, 
                    "dialogflowClientEmail": "apple@hotmail.fr to patch",
                    "dialogflowPrivateKey": "UY9J8F8EZ7D8D687ZJYEF98Y to patch", 
                    "companyId": newCompanyName[0].id
                })
                res.should.have.status(200);
            } catch (err) {
                throw err;
            }
        });

        it('[patchChatbots] it should PATCH a company (200)', async () => {
            try {
                let getRes = await chai.request(server).get('/v1/companies')
                const newCompanyName = getRes.body.filter((company) => {
                    if (company.name === 'Apple')
                        return company;
                })

                getRes = await chai.request(server).get('/v1/chatbots')
                const newChatbot = getRes.body.filter((chatbot) => {
                    if (chatbot.project_name === 'Chatbot Apple A to patch')
                        return chatbot;
                })
                const res = await chai.request(server).patch(`/v1/chatbots/${newChatbot[0].id}`)
                .type('form')
                .send({
                    "projectName": "Chatbot Apple A", 
                    "description": "Awesome Description", 
                    "containerMode": "Dialogflow", 
                    "dialogflowProjectId": 5678987655, 
                    "dialogflowClientEmail": "apple@hotmail.fr",
                    "dialogflowPrivateKey": "UY9J8F8EZ7D8D687ZJYEF98Y", 
                    "companyId": newCompanyName[0].id
                })
                res.should.have.status(200);
            } catch (err) {
                throw err;
            }
        });

        it('[getChatbots] it should GET all the chabtots and check response length after post', async () => {
            try {
                const res = await chai.request(server).get('/v1/chatbots')
                res.body.should.be.a('array');
                res.body.length.should.be.eql(10);
            } catch (err) {
                throw err;
            }
        });

        it('[getUsers] it should GET all the users check response length before post', async () => {
            try {
                const res = await chai.request(server).get('/v1/users')
                res.body.should.be.a('array');
                res.body.length.should.be.eql(9);
            } catch (err) {
                throw err;
            }
        });

        it('[postUsers] it should POST a user (200)', async () => {
            try {
                let getRes = await chai.request(server).get('/v1/companies')
                const newCompanyName = getRes.body.filter((company) => {
                    if (company.name === 'Apple')
                        return company;
                })

                getRes = await chai.request(server).get('/v1/chatbots')
                const newChatbot = getRes.body.filter((chatbot) => {
                    if (chatbot.project_name === 'Chatbot Apple A')
                        return chatbot;
                })
                let chatbotIds = [];
                chatbotIds.push(newChatbot[0].id);
                const res = await chai.request(server).post('/v1/users')
                .type('form')
                .send({
                    "name": "User Apple A to patch",
                    "chatbotIds": JSON.stringify(chatbotIds),
                    "companyId": newCompanyName[0].id
                })
                res.should.have.status(200);
            } catch (err) {
                throw err;
            }
        });

        it('[patchUsers] it should PATCH a user (200)', async () => {
            try {
                let getRes = await chai.request(server).get('/v1/companies')
                const newCompanyName = getRes.body.filter((company) => {
                    if (company.name === 'Apple')
                        return company;
                })

                getRes = await chai.request(server).get('/v1/chatbots')
                const newChatbot = getRes.body.filter((chatbot) => {
                    if (chatbot.project_name === 'Chatbot Apple A')
                        return chatbot;
                })

                getRes = await chai.request(server).get('/v1/users')
                const newUser = getRes.body.filter((user) => {
                    if (user.name === 'User Apple A to patch')
                        return user;
                })
                let chatbotIds = [];
                chatbotIds.push(newChatbot[0].id);
                const res = await chai.request(server).patch(`/v1/users/${newUser[0].id}`)
                .type('form')
                .send({
                    "name": "User Apple A",
                    "chatbotIds": JSON.stringify(chatbotIds),
                    "companyId": newCompanyName[0].id
                })
                res.should.have.status(200);
            } catch (err) {
                throw err;
            }
        });

        it('[getUsers] it should GET all the users check response length after post', async () => {
            try {
                const res = await chai.request(server).get('/v1/users')
                res.body.should.be.a('array');
                res.body.length.should.be.eql(10);
            } catch (err) {
                throw err;
            }
        });

        it('[getTests] it should GET all the tests check response length before post', async () => {
            try {
                const res = await chai.request(server).get('/v1/tests')
                res.body.should.be.a('array');
                res.body.length.should.be.eql(18);
            } catch (err) {
                throw err;
            }
        });

        it('[postTests] it should POST a test (200)', async () => {
            try {
                const getRes = await chai.request(server).get('/v1/chatbots')
                const newChatbot = getRes.body.filter((chatbot) => {
                    if (chatbot.project_name === 'Chatbot Apple A')
                        return chatbot;
                })
                const res = await chai.request(server).post('/v1/tests')
                .type('form')
                .send({
                    "name": "Test 1 Apple to patch", 
                    "description": "description to patch", 
                    "chatbotId": newChatbot[0].id
                })
                res.should.have.status(200);
            } catch (err) {
                throw err;
            }
        });

        it('[patchTests] it should PATCH a test (200)', async () => {
            try {
                let getRes = await chai.request(server).get('/v1/chatbots')
                const newChatbot = getRes.body.filter((chatbot) => {
                    if (chatbot.project_name === 'Chatbot Apple A')
                        return chatbot;
                })

                getRes = await chai.request(server).get('/v1/tests')
                const newTest = getRes.body.filter((test) => {
                    if (test.name === 'Test 1 Apple to patch')
                        return test;
                })
                const res = await chai.request(server).patch(`/v1/tests/${newTest[0].id}`)
                .type('form')
                .send({
                    "name": "Test 1 Apple", 
                    "description": "description", 
                    "chatbotId": newChatbot[0].id
                })
                res.should.have.status(200);
            } catch (err) {
                throw err;
            }
        });

        it('[getTests] it should GET all the tests check response length after post', async () => {
            try {
                const res = await chai.request(server).get('/v1/tests')
                res.body.should.be.a('array');
                res.body.length.should.be.eql(19);
            } catch (err) {
                throw err;
            }
        });

        it('[getChatbotsByUser] it should GET all the chatbots from user 10 from Apple, check array, check length and check keys', async () => {
            try {
                let getRes = await chai.request(server).get('/v1/companies')
                const newCompanyName = getRes.body.filter((company) => {
                    if (company.name === 'Apple')
                        return company;
                })

                getRes = await chai.request(server).get('/v1/users')
                const newUser = getRes.body.filter((user) => {
                    if (user.name === 'User Apple A')
                        return user;
                })
                const res = await chai.request(server).get(`/v1/companies/${newCompanyName[0].id}/users/${newUser[0].id}/chatbots`)
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                res.body.every(chatbot => expect(chatbot).to.have.all.keys(chatbotProperties))
            } catch (err) {
                throw err;
            }
        });

        it('[deleteTests] it should DELETE a test (200)', async () => {
            try {
                const getRes = await chai.request(server).get('/v1/tests')
                const testToDelete = getRes.body.filter((test) => {
                    if (test.name === 'Test 1 Apple')
                        return test;
                })
                const res = await chai.request(server).delete(`/v1/tests/${testToDelete[0].id}`)
                res.should.have.status(200);
            } catch (err) {
                throw err;
            }
        });

        it('[getTests] it should GET all the tests check response length after delete', async () => {
            try {
                const res = await chai.request(server).get('/v1/tests')
                res.body.should.be.a('array');
                res.body.length.should.be.eql(18);
            } catch (err) {
                throw err;
            }
        });

        it('[deleteUsers] it should DELETE a user (200)', async () => {
            try {
                const getRes = await chai.request(server).get('/v1/users')
                const userToDelete = getRes.body.filter((user) => {
                    if (user.name === 'User Apple A')
                        return user;
                })
                const res = await chai.request(server).delete(`/v1/users/${userToDelete[0].id}`)
                res.should.have.status(200);
            } catch (err) {
                throw err;
            }
        });

        it('[getUsers] it should GET all the users check response length after delete', async () => {
            try {
                const res = await chai.request(server).get('/v1/users')
                res.body.should.be.a('array');
                res.body.length.should.be.eql(9);
            } catch (err) {
                throw err;
            }
        });

        it('[deleteChatbots] it should DELETE a chatbot (200)', async () => {
            try {
                const getRes = await chai.request(server).get('/v1/chatbots')
                const chatbotToDelete = getRes.body.filter((chatbot) => {
                    if (chatbot.project_name === 'Chatbot Apple A')
                        return chatbot;
                })
                const res = await chai.request(server).delete(`/v1/chatbots/${chatbotToDelete[0].id}`)
                res.should.have.status(200);
            } catch (err) {
                throw err;
            }
        });

        it('[getChatbots] it should GET all the chabtots and check response length after delete', async () => {
            try {
                const res = await chai.request(server).get('/v1/chatbots')
                res.body.should.be.a('array');
                res.body.length.should.be.eql(9);
            } catch (err) {
                throw err;
            }
        });

        it('[deleteCompanies] it should DELETE a company (200)', async () => {
            try {
                const getRes = await chai.request(server).get('/v1/companies')
                const companyNameToDelete = getRes.body.filter((company) => {
                    if (company.name === 'Apple')
                        return company;
                })
                const res = await chai.request(server).delete(`/v1/companies/${companyNameToDelete[0].id}`)
                res.should.have.status(200);
            } catch (err) {
                throw err;
            }
        });

        it('[getCompanies] it should GET all the companies and check response length after delete', async () => {
            try {
                const res = await chai.request(server).get('/v1/companies')
                res.body.should.be.a('array');
                res.body.length.should.be.eql(3);
            } catch (err) {
                throw err;
            }
        });
    });

    describe('DELETE/PATCH deleteCompanies/patchCompanies, deleteChatbots/patchChatbots, deleteUsers/patchUsers, deleteTests/patchTests', function() {
        it('[deleteCompanies] it should return (404) by deleting a non existing resource', async () => {
            try {
                const res = await chai.request(server).delete('/v1/companies/99')
                res.should.have.status(404);
            } catch (err) {
                throw err;
            }
        });

        it('[patchCompanies] it should return (404) by updating a non existing resource', async () => {
            try {
                const res = await chai.request(server).patch('/v1/companies/99')
                res.should.have.status(404);
            } catch (err) {
                throw err;
            }
        });

        it('[deleteChatbots] it should return (404) by deleting a non existing resource', async () => {
            try {
                const res = await chai.request(server).delete('/v1/chatbots/99')
                res.should.have.status(404);
            } catch (err) {
                throw err;
            }
        });

        it('[patchChatbots] it should return (404) by updating a non existing resource', async () => {
            try {
                const res = await chai.request(server).patch('/v1/chatbots/99')
                res.should.have.status(404);
            } catch (err) {
                throw err;
            }
        });

        it('[deleteUsers] it should return (404) by deleting a non existing resource', async () => {
            try {
                const res = await chai.request(server).delete('/v1/users/99')
                res.should.have.status(404);
            } catch (err) {
                throw err;
            }
        });

        it('[patchUsers] it should return (404) by updating a non existing resource', async () => {
            try {
                const res = await chai.request(server).patch('/v1/users/99')
                res.should.have.status(404);
            } catch (err) {
                throw err;
            }
        });


        it('[deleteTests] it should return (404) by deleting a non existing resource', async () => {
            try {
                const res = await chai.request(server).delete('/v1/tests/99')
                res.should.have.status(404);
            } catch (err) {
                throw err;
            }
        });

        it('[patchTests] it should return (404) by updating a non existing resource', async () => {
            try {
                const res = await chai.request(server).patch('/v1/tests/99')
                res.should.have.status(404);
            } catch (err) {
                throw err;
            }
        });
    });
});