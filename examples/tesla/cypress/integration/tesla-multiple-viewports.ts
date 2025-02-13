describe("Tesla buying a Model 3", () => {
  const sizes = ["iphone-x", "ipad-2", "macbook-13"];
  Cypress.on("uncaught:exception", () => {
    return false;
  });

  sizes.forEach((size) => {
    it(`buy a model 3 on ${size}`, () => {
      cy.viewport(size as Cypress.ViewportPreset);

      cy.visit("https://www.tesla.com/model3");
      cy.get(".tds-modal-actions > .tds-modal-close > .tds-icon").click({
        force: true,
      });
      cy.get("main").within(() => {
        cy.contains("Order Now").click({ force: true });
      });

      cy.get('div [data-group-id="BATTERY_AND_DRIVE"]').within(() => {
        cy.contains("Long Range").click({ force: true });
      });

      cy.get('div [data-group-id="AUTOPILOT_PACKAGE"]').within(() => {
        cy.contains("Add").click({ force: true });
      });

      cy.get('div [data-group-id="OPTIONS"]').within(() => {
        cy.contains("Continue to payment").click({ force: true });
      });

      cy.get("#payment-lease-panel-tab").click();
      cy.get("#payment-loan-panel-tab").click();
      cy.get("#payment-cash-panel-tab").click();
      cy.get(".payment-options > .tds-btn").click();

      cy.contains("Order with Card");
    });
  });
});
