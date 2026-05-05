// all project requirements denoted **


describe("Spec 02 - Create Post", () => {
  before(() => {
    // reuse auth
    cy.authenticate();
  });

  // ### Positive test case - validates response contains an id, title, and body
  it("should create a post successfully", () => {
    // ** loads request body from a fixture file (cypress/fixtures/createPost.json)
    // this separates test data from test logic -> more maintainable, reusable, easier update
    cy.fixture("createPost").then((postData) => {
      cy.request({
        method: "POST",
        url: "/posts",
        headers: {
          Authorization: `Bearer ${Cypress.env("token")}`,
        },
        body: postData,
      }).then((response) => {
        // ** validates response contains an id, title, and body
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("title");
        expect(response.body).to.have.property("body");

        const postId = response.body.id;

        // **  creates and stores created ID to cypress.env.json using cy.task
        Cypress.env("createdPostId", postId);
        cy.task("setEnv", { key: "createdPostId", value: postId });
      });
    });
  });

  // ### Negative test case ** request body with a missing required field
  it("should fail to create post with missing title", () => {
    cy.request({
      method: "POST",
      url: "/posts",
      failOnStatusCode: false,
      body: {
        body: "Missing title",
        userId: 1,
      },
    }).then((response) => {
      // NOTE:
      // The request is missing a required field (title).
      // JSONPlaceholder still returns 201 because it does not validate input.
      // In a real API, this would return 400 Bad Request.
      expect(response.status).to.eq(201);
    });
  });

  // ### Negative test case ** request with no Authorization header
  it("should fail to create post without authorization header (expected real API behavior)", () => {
    cy.fixture("createPost").then((postData) => {
      cy.request({
        method: "POST",
        url: "/posts",
        failOnStatusCode: false,
        body: postData,
      }).then((response) => {
        // NOTE:
        // JSONPlaceholder does not enforce authentication.
        // In a real API, this would return 401 Unauthorized.

        expect(response.status).to.eq(201);
        expect(response.body).to.have.property("id");
      });
    });
  });
});
