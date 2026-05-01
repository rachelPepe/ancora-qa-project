// simulates login and stores token for the rest of the test suite
// Even though the API is fake we are mimicking
//      - login request
//      - receiving a token
//      - Saving it for future use
// system --> calls API, gets data, validates response, extracts value, saves for later use



// Groups test
describe("Spec 01 - Authentication", () => {
    // Actual test case
  it("should simulate login and store token", () => {
    // sends HTTP request 
    cy.request({
      method: "POST",
      url: "/users",
      // request body - pulls values from cypress.env.json
      body: {
        name: Cypress.env("username"),
        email: Cypress.env("email"),
      },
      //validation + logic, runs after API responds
    }).then((response) => {
      // Validate response, 201 = created
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("id");

      // save ID into variable   
      const token = response.body.id;

      // Save token in runtime
      Cypress.env("token", token);

      // Persist token for other specs
      cy.task("setEnv", { key: "token", value: token });
    });
  });
});
