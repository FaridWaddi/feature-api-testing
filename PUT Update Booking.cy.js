describe('Create Booking API', () => {

  it('1: should Updates a current booking successfully in the API', () => {

    const booking = {
        firstname: 'Jim',
        lastname: 'Brown',
        totalprice: 2000,
        depositpaid: true,
        bookingdates: {
            checkin: '2018-01-01',
            checkout: '2019-01-01'
        },
        additionalneeds: 'Breakfast'
    };

    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/auth',
      body: {
        username: 'admin',
        password: 'password123'
      }
    }).then((authResponse) => {
      expect(authResponse.status).to.eq(200);
      expect(authResponse.body.token).to.exist;

      return cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/booking',
        body: booking
      }).then((createResponse) => {
        expect(createResponse.status).to.eq(200);
        expect(createResponse.body.bookingid).to.exist;

        return cy.request({
          method: 'PUT',
          url: `https://restful-booker.herokuapp.com/booking/${createResponse.body.bookingid}`,
          headers: {
            Cookie: `token=${authResponse.body.token}`
          },
          body: booking
        });
      });
    }).then((response) => {

      // 1. Verify HTTP status
      expect(response.status).to.eq(200);

      // 3. Verify response data
      expect(response.body.firstname).to.eq(booking.firstname);
      expect(response.body.lastname).to.eq(booking.lastname);
      expect(response.body.totalprice).to.eq(booking.totalprice);
      expect(response.body.depositpaid).to.eq(booking.depositpaid);

      expect(response.body.bookingdates.checkin).to.eq(booking.bookingdates.checkin);
      expect(response.body.bookingdates.checkout).to.eq(booking.bookingdates.checkout);
      expect(response.body.additionalneeds).to.eq(booking.additionalneeds);

    });
  });

 
});