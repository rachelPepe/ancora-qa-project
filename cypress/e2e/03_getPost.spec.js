// ### Retrieval test (mock API limitation scenario)


it("should attempt to retrieve the created post (mock limitation)", () => {
  const postId = Cypress.env("createdPostId");

  cy.request({
    method: "GET",
    url: `/posts/${postId}`,
    failOnStatusCode: false,
  }).then((response) => {
    // NOTE:
    // JSONPlaceholder does not persist newly created resources.
    // In a real API, this request would return 200 and the created post.
    // Here, we expect a 404 due to this limitation.

    expect(response.status).to.eq(404);
  });
});


// ### Negative test case


it("should return 404 for invalid post ID", () => {
  cy.request({
    method: "GET",
    url: "/posts/999999",
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(404);
  });
});

