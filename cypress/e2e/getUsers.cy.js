/// <reference types="Cypress" />

describe('GET -- API Automation',()=>{

const invalid_URL = 'https://gorest.co.in/public/v2/user'
const token = Cypress.env('token')
let userID = 7983236

it('GET CALL - Get All Users', ()=>{

    cy.request({


        method:'GET',
        url: '/',
        headers:{
            Authorization: token
        }
    }).then((response)=>{
        //cy.log(JSON.stringify(response))
        expect(response.status).to.equal(200)
    })

})

it('GET CALL - Get Single User', ()=>{

     cy.request({
             
        method:'GET',
        url: '/' + userID,
        headers:{
            Authorization:token
        },
        failOnStatusCode: false

     }).then((response)=>{
        
        //cy.log(JSON.stringify(response))
        expect(response.status).to.be.equal(200)
        expect(response.body.id).to.be.equal(7983236)

     })
})
it('GET CALL - Invalid End Point || Negative Case', ()=>{

     cy.request({
             
        method:'GET',
        url: invalid_URL,
        headers:{
            Authoriazation:token
        },
        failOnStatusCode: false

     }).then((response)=>{
        
        expect(response.status).to.equal(404)

     })
})
it('GET CALL  - Invalid User || Negative Case', ()=>{

     cy.request({
             
        method:'GET',
        url: '/'+ 74398401,
        headers:{
            Authoriazation:token
        },
        failOnStatusCode: false

     }).then((response)=>{
        expect(response.status).to.equal(404)
        expect(response.body.message).to.equal('Resource not found')

     })
})



})