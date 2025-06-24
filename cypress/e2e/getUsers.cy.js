/// <reference types="Cypress" />

describe('API Automation',()=>{

it('Get Users', ()=>{

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


})