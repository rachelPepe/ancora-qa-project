describe("Spec 04 - Delete Post", () => {
  before(() => {
    cy.authenticate();
  });

  it("should delete a post (mock behavior)", () => {
    const postId = Cypress.env("createdPostId");

    cy.request({
      method: "DELETE",
      url: `/posts/${postId}`,
      failOnStatusCode: false,
    }).then((response) => {
      // JSONPlaceholder always returns 200 for DELETE
      expect(response.status).to.eq(200);
    });
  });

  it("should return 200 even for non-existent post (mock limitation)", () => {
    cy.request({
      method: "DELETE",
      url: "/posts/999999",
      failOnStatusCode: false,
    }).then((response) => {
      // Real API would likely return 404
      expect(response.status).to.eq(200);
    });
  });
});
