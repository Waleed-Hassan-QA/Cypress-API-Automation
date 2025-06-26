/// <reference types="Cypress" />

describe('GET -- API Automation',()=>{

it('Get All Users', ()=>{

    cy.request({

        method:'GET',
        url:'https://gorest.co.in/public/v2/users',
        headers:{
            Authorization:'Bearer eb906c43a292135c4a1cd99ec58b54af482fb068720f95e7e5ee3e64292e0610'
        }
    }).then((response)=>{
        //cy.log(JSON.stringify(response))
        expect(response.status).to.equal(200)
    })

})

it('Get User', ()=>{

     cy.request({
             
        method:'GET',
        url: 'https://gorest.co.in/public/v2/users/7439840',
        headers:{
            Authoriazation:'Bearer eb906c43a292135c4a1cd99ec58b54af482fb068720f95e7e5ee3e64292e0610'
        }

     }).then((response)=>{
        
        cy.log(JSON.stringify(response))
        expect(response.status).to.equal(200)
        expect(response.body.id).to.equal(7439840)

     })
})
it('Get User - Invalid EndPoint', ()=>{

     cy.request({
             
        method:'GET',
        url: 'https://gorest.co.in/public/v2/user',
        headers:{
            Authoriazation:'Bearer eb906c43a292135c4a1cd99ec58b54af482fb068720f95e7e5ee3e64292e0610'
        },
        failOnStatusCode: false

     }).then((response)=>{
        
        expect(response.status).to.equal(404)

     })
})
it('Get User - Invalid User', ()=>{

     cy.request({
             
        method:'GET',
        url: 'https://gorest.co.in/public/v2/users/74398401',
        headers:{
            Authoriazation:'Bearer eb906c43a292135c4a1cd99ec58b54af482fb068720f95e7e5ee3e64292e0610'
        },
        failOnStatusCode: false

     }).then((response)=>{
        expect(response.status).to.equal(404)
        expect(response.body.message).to.equal('Resource not found')

     })
})


})