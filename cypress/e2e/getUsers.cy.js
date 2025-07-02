/// <reference types="Cypress" />

describe('GET -- API Automation',()=>{

const url = 'https://gorest.co.in/public/v2/users/'
const invalid_URL = 'https://gorest.co.in/public/v2/user'
const token = 'Bearer eb906c43a292135c4a1cd99ec58b54af482fb068720f95e7e5ee3e64292e0610'
let userID = 7979056

it('GET CALL - Get All Users', ()=>{

    cy.request({


        method:'GET',
        url: url,
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
        url: url+userID,
        headers:{
            Authoriazation:token
        },
        failOnStatusCode: false

     }).then((response)=>{
        
        //cy.log(JSON.stringify(response))
        expect(response.status).to.be.equal(200)
        expect(response.body.id).to.equal(userID)

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
        url: url+ 74398401,
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