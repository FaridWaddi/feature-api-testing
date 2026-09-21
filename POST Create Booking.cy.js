describe('Create Booking API', () => {

  it('1: should create a new booking successfully in the API', () => {
    
    cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/auth',
  body: {
    username: 'admin',
    password: 'password123'
  }
   }).then((response) => {

         expect(response.status).to.eq(200);

         expect(response.body.token).to.exist;
         
    });

    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      body: {

    
        firstname: 'Jim',
        lastname: 'Brown',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
            checkin: '2018-01-01',
            checkout: '2019-01-01'
        },
        additionalneeds: 'Breakfast'
      }
    }).then((response) => {


      expect(response.status).to.eq(200);
 

      expect(response.body.booking.firstname).to.eq('Jim');
      expect(response.body.booking.lastname).to.eq('Brown');
      expect(response.body.booking.totalprice).to.eq(111);
      expect(response.body.booking.depositpaid).to.eq(true);

      expect(response.body.booking.bookingdates.checkin).to.eq('2018-01-01');
      expect(response.body.booking.bookingdates.checkout).to.eq('2019-01-01');
      expect(response.body.booking.additionalneeds).to.eq('Breakfast');

    });
  });

 
   
  it('2 : should create a new booking Dynamically Generating JSON object', () => {
     
    
     const RequestBody = {

        firstname: Math.random().toString(5).substring(2),
        lastname: Math.random().toString(5).substring(2),
        additionalneeds: Math.random().toString(5).substring(2),
        totalprice: Math.floor(Math.random() * 1000)
    }

    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',

      body: {
        firstname: RequestBody.firstname,
        lastname: RequestBody.lastname,
        totalprice: RequestBody.totalprice,

        depositpaid: true,
        bookingdates: {
            checkin: '2018-01-01',
            checkout: '2019-01-01'
        },
        additionalneeds: RequestBody.additionalneeds
      }
    }).then((response) => {

      // 1. Verify HTTP status
      expect(response.status).to.eq(200);

      // 2. Verify booking ID exists
      expect(response.body.bookingid).to.exist;

      // 3. Verify response data

      expect(response.body.booking.firstname).to.eq(RequestBody.firstname);
      expect(response.body.booking.lastname).to.eq(RequestBody.lastname);
      
      expect(response.body.booking.totalprice).to.eq(RequestBody.totalprice);
      expect(response.body.booking.depositpaid).to.eq(true);

      expect(response.body.booking.bookingdates.checkin).to.eq('2018-01-01');
      expect(response.body.booking.bookingdates.checkout).to.eq('2019-01-01');
      expect(response.body.booking.additionalneeds).to.eq(RequestBody.additionalneeds);

    }); 


});

});