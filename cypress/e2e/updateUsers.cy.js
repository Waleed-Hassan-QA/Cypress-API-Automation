/// <reference types="Cypress" />

describe('PUT API - Automation', () => {


    const url = 'https://gorest.co.in/public/v2/users/'
    const token = 'Bearer eb906c43a292135c4a1cd99ec58b54af482fb068720f95e7e5ee3e64292e0610'
    let userId = '7975662'

    it('PUT Call - Update User Data', () => {

        cy.fixture('payload-put-users').then((payload) => {

            cy.request({

                method: 'PUT',
                url: url + payload.id,
                headers: {
                    Authorization: token
                },
                failOnStatusCode: false,
                body: payload
            }).then((response) => {

                expect(response.status).to.be.equal(200)
                expect(response.body).has.property('email', payload.email)
                expect(response.body).has.property('name', payload.name)
                expect(response.body).has.property('gender', payload.gender)
                expect(response.body).has.property('status', payload.status)
                expect(response.body).has.property('id', payload.id)

            })

        })

    })

it('PUT Call - Invalid User ID || Negative Case', () => {

        cy.request({

            method: 'PUT',
            url: url+1122334455,
            headers: {
                Authorization: token
            },
            failOnStatusCode: false,
            body: {
                "name": "Vicky",
                "email": "vicky@gmail.com",
                "gender": "male",
                "status": "active"
            }
        }).then((response) => {

            expect(response.status).to.be.equal(404)
            expect(response.body.message).to.be.equal('Resource not found')

        })

    })

    it('PUT Call - Validation Checks || Negative Case', () => {

        cy.request({

            method: 'PUT',
            url: url+userId,
            headers: {
                Authorization: token
            },
            failOnStatusCode: false,
            body: {
                "name": "",
                "email": "",
                "gender": "",
                "status": ""
            }
        }).then((response) => {

            expect(response.status).to.be.equal(422)
         

        })

    })

    it('PUT Call - Invalid End Point || Negative Case', () => {

        cy.request({

            method: 'PUT',
            url: url,
            headers: {
                Authorization: token
            },
            failOnStatusCode: false,
            body: {
                "name": "Vicky",
                "email": "vicky@gmail.com",
                "gender": "male",
                "status": "active"
            }
        }).then((response) => {

            expect(response.status).to.be.equal(404)

        })

    })

    it('PUT Call - Invalid Token || Negative Case', () => {

        cy.request({

            method: 'PUT',
            url: url+userId,
            headers: {
                Authorization: 'Bearer eb906c43a292135c4a1cd99ec58b54af482fb068720f95e7e5ee3e64292e061'
            },
            failOnStatusCode: false,
            body: {
                "name": "Vicky",
                "email": "vicky@gmail.com",
                "gender": "male",
                "status": "active"
            }
        }).then((response) => {

            expect(response.status).to.be.equal(401)
            expect(response.body.message).to.be.equal('Invalid token')

        })

    })



})