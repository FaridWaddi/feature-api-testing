describe("Booking - GetBookingIds", () => {

  it("Returns the ids of all the bookings that exist within the API.", ()=>{
    cy.request({

        method: 'GET',
        url: 'https://restful-booker.herokuapp.com/booking'
  })
    })
})



