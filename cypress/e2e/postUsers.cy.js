/// <reference types="Cypress" />

describe('POST - API Automation', () => {

    const url = 'https://gorest.co.in/public/v2/users'
    const invalid_Url = 'https://gorest.co.in/public/v2/user'

    function generateRandomEmail() {
        const randomString = Math.random().toString(36).substring(2, 8)
        const email = randomString + "@gmail.com"
        return email
    }

    it('POST - Create New User', () => {

        let emailAddress = generateRandomEmail()
        let payLoad = {

            "name": "Jim",
            "email": emailAddress,
            "gender": "male",
            "status": "active"
        }

        cy.request({

            method: 'POST',
            url: url,
            headers: {
                Authorization: 'Bearer eb906c43a292135c4a1cd99ec58b54af482fb068720f95e7e5ee3e64292e0610'
            },
            body: payLoad
        }).then((response) => {

            expect(response.status).to.equal(201)
            expect(response.body.id).to.not.be.null
            expect(response.body).has.property("name", "Jim")
            expect(response.body).has.property("email", emailAddress)
            expect(response.body).has.property("gender", "male")
            expect(response.body).has.property("status", "active")
            cy.log(JSON.stringify(response.body))

        })
    })


    it('POST - Create New User & verify from GET API', () => {

        let emailAddress = generateRandomEmail()

        cy.fixture('users').then((userData) => {

            userData.email = emailAddress
            cy.request({
                method: 'POST',
                url: url,
                headers: {
                    Authorization: 'Bearer eb906c43a292135c4a1cd99ec58b54af482fb068720f95e7e5ee3e64292e0610'
                },
                body: userData
            }).then((response) => {
                expect(response.status).to.equal(201)
                expect(response.body.id).to.not.be.null
                expect(response.body).has.property("name", "Jim")
                expect(response.body).has.property("email", emailAddress)
                expect(response.body).has.property("gender", "male")
                expect(response.body).has.property("status", "active")
                cy.log(JSON.stringify(response.body))

                let id = response.body.id

                cy.request({
                    method: 'GET',
                    url: 'https://gorest.co.in/public/v2/users/' + id,
                    headers: {
                        Authorization: 'Bearer eb906c43a292135c4a1cd99ec58b54af482fb068720f95e7e5ee3e64292e0610'
                    }
                }).then((res) => {

                    expect(res.status).to.be.equal(200)
                    expect(res.body.id).to.not.be.null
                    expect(res.body.id).to.be.equal(id)

                })

            })

        })

    })


    it('Create dublicate user', () => {

        cy.fixture('users').then((userData) => {

            cy.request({
                method: 'POST',
                url: url,
                headers: {
                    Authorization: 'Bearer eb906c43a292135c4a1cd99ec58b54af482fb068720f95e7e5ee3e64292e0610'
                },
                failOnStatusCode: false,
                body: userData,

            }).then((response) => {

                expect(response.status).to.be.equal(422)
                let error = response.body
                expect(error[0]).has.property('field', 'email')
                expect(error[0]).has.property('message', 'has already been taken')
                cy.log(error)
            })

        })

    })

    it('Create User with An Invalid Token', () => {

        cy.fixture('users').then((userData) => {

            cy.request({

                method: 'POST',
                url: url,
                headers: {
                    Authorization: 'Bearer eb906c43a292135c4a1cd99ec58b54af482fb068720f95e7e5ee3e64292e061'
                },
                failOnStatusCode: false,
                body: userData,

            }).then((response) => {

                expect(response.status).to.be.equal(401)
                expect(response.body.message).to.be.equal('Invalid token')
                cy.log(response.body)
            })

        })

    })

it('Create User with An Invalid End Point', () => {

        cy.fixture('users').then((userData) => {

            cy.request({

                method: 'POST',
                url: invalid_Url,
                headers: {
                    Authorization: 'Bearer eb906c43a292135c4a1cd99ec58b54af482fb068720f95e7e5ee3e64292e061'
                },
                failOnStatusCode: false,
                body: userData,

            }).then((response) => {

                expect(response.status).to.be.equal(404)
    
            })

        })

    })




})