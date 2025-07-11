/// <reference types="Cypress" />

describe('POST - API Automation', () => {

    //const url = 'https://gorest.co.in/public/v2/users'
    const token = Cypress.env('token')
    const invalid_Url = 'https://gorest.co.in/public/v2/user'

    function generateRandomEmail() {
        const randomString = Math.random().toString(36).substring(2, 8)
        const email = randomString + "@gmail.com"
        return email
    }

    it('POST Call - Create New User', () => {

        let emailAddress = generateRandomEmail()
        let payLoad = {

            "name": "Jim",
            "email": emailAddress,
            "gender": "male",
            "status": "active"
        }

        cy.request({

            method: 'POST',
            url: '/',
            headers: {
                Authorization: token
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


    it('POST Call - Create New User & Verify from GET API', () => {

        let emailAddress = generateRandomEmail()

        cy.fixture('users').then((userData) => {

            userData.email = emailAddress
            cy.request({
                method: 'POST',
                url: '/',
                headers: {
                    Authorization: token
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
                    url: '/' + id,
                    headers: {
                        Authorization: token
                    }
                }).then((res) => {

                    expect(res.status).to.be.equal(200)
                    expect(res.body.id).to.not.be.null
                    expect(res.body.id).to.be.equal(id)

                })

            })

        })

    })


    it('POST Call -  Dublicate Data || Negative Case', () => {

        cy.fixture('users').then((userData) => {

            cy.request({
                method: 'POST',
                url: '/',
                headers: {
                    Authorization: token
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

    it('POST Call -  Validation Check || Wrong Data || Negative Case', () => {

        cy.fixture('users').then((userData) => {

            userData.email = null
            cy.request({
                method: 'POST',
                url: '/',
                headers: {
                    Authorization: token
                },
                failOnStatusCode: false,
                body: userData,

            }).then((response) => {

                expect(response.status).to.be.equal(422)
                let error = response.body

                for (var index in response.body) {
                    expect(response.body[index].field).to.eq('email')
                    expect(response.body[index].message).to.eq("can't be blank")
        
                }
            })
            // expect(error[0]).has.property('field', 'email')
            // expect(error[0]).has.property('message', "can't be blank")
            // cy.log(error)
        })

    })

    it('POST Call - Invalid Token || Negative Case  ', () => {

    cy.fixture('users').then((userData) => {

        cy.request({

            method: 'POST',
            url: '/',
            headers: {
                Authorization: 'Bearer eb906c'
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

it('POST Call - Invalid End Point || Negative Case', () => {

    cy.fixture('users').then((userData) => {

        cy.request({

            method: 'POST',
            url: invalid_Url,
            headers: {
                Authorization: token
            },
            failOnStatusCode: false,
            body: userData,

        }).then((response) => {

            expect(response.status).to.be.equal(404)

        })

    })

})

})






