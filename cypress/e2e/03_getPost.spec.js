// all project requirements denoted **


describe("Spec 03 - Get Post", () => {
  before(() => {
    cy.authenticate();
  });

  // ### Retrieval test (mock limitation scenario)
  it("should attempt to retrieve the created post", () => {
    // ** reads the stored ID from cypress.env.json using cy.readFile
    cy.readFile("cypress.env.json").then((env) => {
      const postId = env.createdPostId;

      cy.request({
        method: "GET",
        url: `/posts/${postId}`,
        failOnStatusCode: false,
      }).then((response) => {
        // NOTE:
        // JSONPlaceholder does not persist created resources.
        // ** In a real API, this would return 200 and we would validate:
        // expect(response.body.id).to.eq(postId)
        // Here, we expect 404 due to mock limitation.

        expect(response.status).to.eq(404);
      });
    });
  });

  // ### Negative test case - ** GET request for a non-existent resource (e.g., /posts/99999)
  it("should return 404 for invalid post ID", () => {
    cy.request({
      method: "GET",
      url: "/posts/999999",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  // ### Additional requirement - ** GET /posts returns an array with length greater than zero

  it("should retrieve all posts and validate response structure", () => {
    cy.request({
      method: "GET",
      url: "/posts",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.be.greaterThan(0);
    });
  });
});
