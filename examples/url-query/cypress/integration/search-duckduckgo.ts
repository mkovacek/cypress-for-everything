describe("DuckdDuckGo Search with Url Search parameters", () => {
  it("should display different url query parameters", () => {
    cy.visit("https://duckduckgo.com/");
    const searchedText = "testing duckduckgo search";
    cy.get("#search_form_homepage").type(searchedText);
    cy.get("#search_button_homepage").click();

    cy.url().should("include", "q=");
    cy.url().should("include", "ia=web");

    cy.location().then((location) => {
      // here we can access the location searchParams directly with the URL constructor
      const searchQuery = new URL(location.href).searchParams.get("q");
      // we then check that the searched text is in the query in the URL
      expect(searchQuery).to.equal(searchedText);
      // for the final confirmation we also check that the input field has the same value
      cy.get("#search_form_input").should("have.value", searchedText);
    });
  });
});
