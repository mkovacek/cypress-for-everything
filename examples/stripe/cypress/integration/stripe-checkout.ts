describe("Stripe Checkout", () => {
  it("Stripe Checkout test mode works!", () => {
    cy.request(
      "https://checkout.stripe.dev/api/demo-session?country=us&billingPeriod=monthly&hasBgColor=false&hasBillingAndShipping=false&hasCoupons=false&hasFreeTrial=false&hasShippingRate=false&hasTaxes=false&mode=payment&wallet=googlePay&hasPolicies=false&billingType=flat"
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("url");
      cy.visit(response.body.url);
      cy.url().should("contains", "https://checkout.stripe.com/pay/");

      cy.get("#email").type("SatoshiNakamoto@email.com");
      cy.get("#cardNumber").type("4242424242424242");
      cy.get("#cardCvc").type("123");
      cy.get("#cardExpiry").type(
        "12" + (new Date().getFullYear() + 10).toString().substr(-2)
      );
      cy.get("#billingName").type("Satoshi Nakamoto");
      cy.get("#billingPostalCode").type("94043");

      cy.wait(1000);
      cy.get(".SubmitButton").should(($div) => {
        expect($div.text()).to.include("Pay");
      });
      cy.get(".SubmitButton").click();
      cy.get(".SubmitButton").should(($div) => {
        expect($div.text()).to.include("Processing");
      });
    });
  });
});
