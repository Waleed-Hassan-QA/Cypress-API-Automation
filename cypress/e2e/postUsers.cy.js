/// <reference types="Cypress" />

describe('POST - API Automation', () => {

    function generateRandomEmail(){

        const randomString = Math.random().toString(36).substring(2,8)
        const email = randomString +"@gmail.com"
        return email

    }

    it('POST - Create New User', () => {

        let emailAddress = generateRandomEmail()

        cy.request({

            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                Authorization: 'Bearer eb906c43a292135c4a1cd99ec58b54af482fb068720f95e7e5ee3e64292e0610'
            },
            body: {

                "name": "Jen",
                "email": emailAddress,
                "gender": "male",
                "status": "active"
            }
        }).then((response)=>{

            expect(response.status).to.equal(201)
            expect(response.body.id).to.not.be.null
            expect(response.body).has.property("name","Jen")
            expect(response.body).has.property("email",emailAddress)
            expect(response.body).has.property("gender","male")
            expect(response.body).has.property("status","active")
            cy.log(JSON.stringify(response.body))

        })
    })






})