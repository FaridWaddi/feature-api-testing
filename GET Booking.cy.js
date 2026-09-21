
describe ("Booking - GetBookingIds", () =>{

    it ("Returns a specific booking based upon the booking id provided", () => {

        cy.request({

          method: 'GET',
          url: 'https://restful-booker.herokuapp.com/booking/1'
        }).then((response) => {

      // Verify Status 
      expect(response.status).to.eq(200)
      expect(response.body.firstname).to.eq('Susan');
      expect(response.body.lastname).to.eq('Jones');
      expect(response.body.totalprice).to.eq(312);
      expect(response.body.depositpaid).to.eq(true);
      expect(response.body.bookingdates.checkin).to.eq('2022-08-28');
      expect(response.body.bookingdates.checkout).to.eq('2022-09-09');
      expect(response.body.additionalneeds).to.eq('Breakfast');

    })

    })
  })


  