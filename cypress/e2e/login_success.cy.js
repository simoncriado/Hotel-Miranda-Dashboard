describe("Login", () => {
  it("If login success then navigates to dashboard", () => {
    cy.visit("localhost:3000");
    cy.url().should("include", "/login");
    cy.get(".input-email")
      .type("test@test.com")
      .should("have.value", "test@test.com");
    cy.get(".input-pass").type("12345").should("have.value", "12345");
    cy.contains("Login").click();

    cy.url().should("include", "/");
  });
});
