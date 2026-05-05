// all project requirements denoted **


describe("Spec 04 - Delete Post", () => {
  before(() => {
    cy.authenticate();
  });

  it("should delete a post (mock behavior)", () => {
    // ** reads the stored ID from cypress.env.json using cy.readFile
    cy.readFile("cypress.env.json").then((env) => {
      const postId = env.createdPostId;

      cy.request({
        method: "DELETE",
        url: `/posts/${postId}`,
        failOnStatusCode: false,
      }).then((response) => {
        // NOTE:
        // ** JSONPlaceholder returns 200 for DELETE requests.
        // In a real API, this would likely return 204 No Content.

        expect(response.status).to.eq(200);
      });
    });
  });

  it("should return 200 for non-existent post (mock limitation)", () => {
    cy.request({
      method: "DELETE",
      url: "/posts/999999",
      failOnStatusCode: false,
    }).then((response) => {
      // NOTE:
      // ** JSONPlaceholder returns 200 even for non-existent resources.
      // A real API would typically return 404 Not Found.

      expect(response.status).to.eq(200);
    });
  });
});
