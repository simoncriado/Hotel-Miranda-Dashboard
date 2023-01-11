describe("Login", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });

  it("If user email is not valid, display an error alert and stay at /login", () => {
    cy.url().should("include", "/login");
    cy.get(".input-email")
      .type("WRONGEMAIL@test.com")
      .should("have.value", "WRONGEMAIL@test.com");
    cy.get(".input-pass").type("12345").should("have.value", "12345");
    cy.contains("Login").click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal(
        `Email or password are not correct! Please try again...`
      );
    });
    cy.url().should("include", "/login");
  });

  it("If password is not valid, display an error alert and stay at /login", () => {
    cy.url().should("include", "/login");
    cy.get(".input-email")
      .type("test@test.com")
      .should("have.value", "test@test.com");
    cy.get(".input-pass").type("8888").should("have.value", "8888");
    cy.contains("Login").click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal(
        `Email or password are not correct! Please try again...`
      );
    });
    cy.url().should("include", "/login");
  });
});
