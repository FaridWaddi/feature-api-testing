
describe ("Booking - DeleteBooking", () =>{

    it ("Deletes a booking from the API", () => {

        cy.request({
          method: 'POST',
          url: 'https://restful-booker.herokuapp.com/auth',
          body: {
              username: 'admin',
              password: 'password123'
          }
        }).then((authResponse) => {
          expect(authResponse.status).to.eq(200)
          expect(authResponse.body.token).to.exist

          return cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking',
            body: {
                firstname: 'Delete',
                lastname: 'Booking',
                totalprice: 100,
                depositpaid: false,
                bookingdates: {
                    checkin: '2024-01-01',
                    checkout: '2024-01-02'
                }
            }
          }).then((createResponse) => {
            expect(createResponse.status).to.eq(200)
            expect(createResponse.body.bookingid).to.exist

            return cy.request({
              method: 'DELETE',
              url: `https://restful-booker.herokuapp.com/booking/${createResponse.body.bookingid}`,
              headers: {
                  Cookie: `token=${authResponse.body.token}`
              }
            })
          })
        }).then((response) => {

      // Verify Status 
       expect(response.status).to.eq(201)

    })

    })
  })
