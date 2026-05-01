// ***********************************************
// This is the custom command requirement
// Creates reusable authentication

// defines new cypress command called authenticate
Cypress.Commands.add("authenticate", () => {
  // sends POST requests to /users (becomes https://jsonplaceholder.typicode.com/users because of base URL)
  cy.request({
    method: "POST",
    url: "/users",
    body: {
        // uses values from cypress.env.json
      name: Cypress.env("username"),
      email: Cypress.env("email"),
    },
 // when API resonds this runs 
  }).then((response) => {
    // verify request succeeded
    expect(response.status).to.eq(201);
    // verify response contains an ID
    expect(response.body).to.have.property("id");

    // pretending the ID is my authentication token even though its fake
    const token = response.body.id;

    // Save to Cypress env (runtime) stores token in memory
    Cypress.env("token", token);

    // Persist to file
    // calls the custom task defined in cypress.config.js 
    // writes the token into cypress.env.json
    cy.task("setEnv", { key: "token", value: token });
  });
});