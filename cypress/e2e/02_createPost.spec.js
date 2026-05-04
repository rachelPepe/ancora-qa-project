// ### Positive test case

describe("Spec 02 - Create Post", () => {
  before(() => {
    // reuse auth
    cy.authenticate();
  });

  it("should create a post successfully", () => {
    cy.fixture("createPost").then((postData) => {
      cy.request({
        method: "POST",
        url: "/posts",
        headers: {
          Authorization: `Bearer ${Cypress.env("token")}`,
        },
        body: postData,
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property("id");

        const postId = response.body.id;

        Cypress.env("createdPostId", postId);
        cy.task("setEnv", { key: "createdPostId", value: postId });
      });
    });
  });
});


// ### Negative test case

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
    // JSONPlaceholder will still return 201
    expect(response.status).to.eq(201);
  });
});