# QA Automation Test Plan
**Project:** Ancora QA Automation Assessment  
**Author:** Rachel Pepe  
**Date:** April 2026

---

## Objective
The objective of this test suite is to validate the core functionality of a REST API using Cypress by simulating a real-world API testing workflow.

This includes verifying authentication behavior, resource creation, retrieval, and deletion, while ensuring correct response handling for both positive and negative scenarios.

The test suite is designed to demonstrate reliable state management across independent test files, proper use of test data and reusable components, and readiness for execution within a CI/CD pipeline.


## 1. Scope

This test suite validates core REST API functionality using Cypress against the JSONPlaceholder mock API.

The following endpoints are included:

| Spec | Method | Endpoint        | Purpose |
|------|--------|-----------------|---------|
| 01   | POST   | /users          | Simulate authentication and capture a token (user ID) |
| 02   | POST   | /posts          | Create a new post and persist the returned ID |
| 03   | GET    | /posts/:id      | Retrieve the created post using stored ID |
| 04   | DELETE | /posts/:id      | Delete the created post using stored ID |

These endpoints were selected to simulate a realistic API workflow: authentication, resource creation, retrieval, and deletion.


## 2. Test Approach

### 2.1 Positive Testing

Each endpoint will be validated for expected successful behavior, including: 

- Correct HTTP status codes (e.g. 200, 201)
- Expected response structure and properties 
- Data Consistency across requests (e.g. retrieved ID matches created ID)

Examples: 
- POST /users returns a 201 status and contains an 'id'
- POST /posts returns a valid post object with 'id', 'title', and 'body'
- GET /posts/:id returns the correct post matching the stored ID
- DELETE /posts/:id returns a successful status code (200 or 204)

### 2.2 Negative Testing 

Negative test cases are included to validate how the API handles invalid or incomplete requests. 

Planned scenarios include:

- POST request with missing required fields 
- POST request without Authorization header
- GET request for a non-existent resource (e.g. /posts/99999)
- DELETE request for a non-existent resource

Since JSONPlaceholder is a mock API, some negative tests may not return realistic HTTP responses. These discrepancies will be documented and compared to expected real-world behavior.

### 2.3 Edge Case Testing

Additional validations include:

- GET /posts returns an array with length greater than zero
- Verification of response types (array vs object)
- Validation that required fields exist in responses 

## Dependency Strategy (State Management)

Cypress executes each spec file independently, meaning in-memory variables cannot be shared across files. 

To maintain state across the test suite: 

- Values such as the authentication token and created post ID will be written to 'cypress.env.json' using 'cy.task('setEnv')'
- Downstream spec files will retrieve these values using 'cy.readFiles()'

This approach ensures:

- Reliable data persistence across spec files
- Compatibility with CI/CD environments where tests may run independently 
- Avoidance of brittle in-memory state

## Proposed File And Folder Structure

# QA Automation Test Plan  
**Project:** Ancora QA Automation Assessment  
**Author:** Rachel Pepe  
**Date:** [Enter Date]

---

## 1. Scope

This test suite validates core REST API functionality using Cypress against the JSONPlaceholder mock API.

The following endpoints are included:

| Spec | Method | Endpoint        | Purpose |
|------|--------|-----------------|---------|
| 01   | POST   | /users          | Simulate authentication and capture a token (user ID) |
| 02   | POST   | /posts          | Create a new post and persist the returned ID |
| 03   | GET    | /posts/:id      | Retrieve the created post using stored ID |
| 04   | DELETE | /posts/:id      | Delete the created post using stored ID |

These endpoints were selected to simulate a realistic API workflow: authentication, resource creation, retrieval, and deletion.

---

## 2. Test Approach

### 2.1 Positive Testing

Each endpoint will be validated for expected successful behavior, including:

- Correct HTTP status codes (e.g., 200, 201)
- Expected response structure and properties
- Data consistency across requests (e.g., retrieved ID matches created ID)

Examples:
- POST /users returns a 201 status and contains an `id`
- POST /posts returns a valid post object with `id`, `title`, and `body`
- GET /posts/:id returns the correct post matching the stored ID
- DELETE /posts/:id returns a successful status code (200 or 204)

---

### 2.2 Negative Testing

Negative test cases are included to validate how the API handles invalid or incomplete requests.

Planned scenarios include:

- POST request with missing required fields
- POST request without Authorization header
- GET request for a non-existent resource (e.g., /posts/99999)
- DELETE request for a non-existent resource

Since JSONPlaceholder is a mock API, some negative tests may not return realistic HTTP responses. These discrepancies will be documented and compared to expected real-world behavior.

---

### 2.3 Edge Case Testing

Additional validations include:

- GET /posts returns an array with length greater than zero
- Verification of response types (array vs object)
- Validation that required fields exist in responses

---

## 3. Dependency Strategy (State Management)

Cypress executes each spec file independently, meaning in-memory variables cannot be shared across files.

To maintain state across the test suite:

- Values such as the authentication token and created post ID will be written to `cypress.env.json` using `cy.task('setEnv')`
- Downstream spec files will retrieve these values using `cy.readFile()`

This approach ensures:

- Reliable data persistence across spec files
- Compatibility with CI/CD environments where tests may run independently
- Avoidance of brittle in-memory state

---

## 4. Proposed File and Folder Structure

]ancora-qa-project/
│
├── cypress/
│   ├── e2e/
│   │   ├── 01_auth.spec.js
│   │   ├── 02_createPost.spec.js
│   │   ├── 03_getPost.spec.js
│   │   └── 04_deletePost.spec.js
│   │
│   ├── fixtures/
│   │   └── createPost.json
│   │
│   ├── support/
│   │   ├── commands.js
│   │   └── e2e.js
│   │
│   └── reports/
├── node_modules/
├── .gitignore
├── cypress.config.js
├── cypress.env.json
├── cypress.env.example.json
├── TestPlan.md
├── azure-pipelines.yml
├── package-lock.json
└── package.json

## Mock API Limitations

JSONPlaceholder differs from a real production API in several key ways:

1. No authentication enforcement
- Requests without Authorization headers still succeed
- A real API would return 401 Unauthorized

2. No request validation
- Missing required fields still return 201 Created
- A real API would return 400 Bad Request with validation errors

3. No persistent data changes
- DELETE requests do not permanently remove resources
- A real API would return 404 Not Found when retrieving a deleted resource

These limitations will be documented within test cases and reports to demonstrate understanding of expected production behavior.

## Pipeline Stage Strategy

The Azure pipeline will simulate a CI/CD workflow with the following stages:

Stage 1 — Setup
- Install Node.js
- Install project dependencies using npm ci
- Verify Cypress installation

Stage 2 — Test Execution
- Run Cypress test suite using npx cypress run
- Inject environment variables using pipeline secrets with CYPRESS_ prefix

Stage 3 — Reporting & Artifacts
- Publish test results (JUnit format)
- Publish Mochawesome HTML report as a pipeline artifact
- Publish screenshots only if tests fail

The test stage will depend on successful completion of the setup stage, ensuring a structured and reliable pipeline flow.