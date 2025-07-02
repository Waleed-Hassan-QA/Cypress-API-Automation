describe('Delete API - Automation', () => {



    const url = 'https://gorest.co.in/public/v2/users'
    const token = 'Bearer eb906c43a292135c4a1cd99ec58b54af482fb068720f95e7e5ee3e64292e0610'


    function generateRandomEmail() {
        const randomString = Math.random().toString(36).substring(2, 8)
        const email = randomString + "@gmail.com"
        return email
    }


    it('Delete Call - Create & Delete User', () => {


        let emailAddress = generateRandomEmail()
        let payLoad = {

            "name": "Jack",
            "email": emailAddress,
            "gender": "male",
            "status": "active"
        }

        cy.request({

            method: 'POST',
            url: url,
            headers: {
                Authorization: token
            },
            failOnStatusCode: false,
            body: payLoad

        }).then((response) => {

            expect(response.status).to.be.equal(201)
            expect(response.body).has.property('email', payLoad.email)
            expect(response.body).has.property('name', payLoad.name)
            expect(response.body).has.property('gender', payLoad.gender)
            expect(response.body).has.property('status', payLoad.status)

            let userID = response.body.id

            cy.request({

                method: 'DELETE',
                url: url + '/' + userID,
                headers: {
                    Authorization: token
                },
                failOnStatusCode: false,

            }).then((res) => {

                expect(res.status).to.be.equal(204)

            })

            cy.request({

                method: 'GET',
                url: url + '/' + userID,
                headers: {
                    Authorization: token
                },
                failOnStatusCode: false,

            }).then((res) => {

                expect(res.status).to.be.equal(404)
                expect(res.body.message).to.be.equal('Resource not found')

            })

        })

    })


    it('Delete Call - Invalid User Id || Negative Case', () => {

        cy.request({

            method: 'GET',
            url: url + '/' + 797566278,
            headers: {
                Authorization: token
            },
            failOnStatusCode: false,

        }).then((res) => {

            expect(res.status).to.be.equal(404)
            expect(res.body.message).to.be.equal('Resource not found')

        })

    })

})

