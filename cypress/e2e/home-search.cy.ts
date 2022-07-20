import { TARGET_URL } from 'cypress/constants/constants';

describe('Home page search', () => {
  beforeEach(() => {
    cy.visit(TARGET_URL)
  })
  
  it('query should filter list', () => {
    // Input query
    cy
      .get('.list-header input')
      .click()
      .type('luke skywalker')
      .should('have.value', 'luke skywalker');

    // Mage sure result is on the list and is the only one
    cy
      .get('.character-list', { timeout: 15000 })
      .contains('Luke Skywalker')
      .should('have.length', 1);
  })

  it('query can be cleared', () => {
    // Input query
    cy
      .get('.list-header input')
      .click()
      .type('luke skywalker')
      .should('have.value', 'luke skywalker');

    cy.intercept('GET', '**/api/people/', []).as('getCharacters')

    // Clear
    cy
      .get('.list-header button[aria-label="Clear"]')
      .click()
    
    // Query should be empty
    cy
      .get('.list-header input')
      .should('have.value', '');

    // List should be be full again
    cy
      .get('.character-list .mat-card', { timeout: 15000 })
      .should('have.length', 10);
  })

  it('query should be saved to search params', () => {
    // Input query
    cy
      .get('.list-header input')
      .click()
      .type('luke')
      .should('have.value', 'luke');

    // Check if query is on the url
    cy
      .location('search')
      .should('contain', 'query=luke')
  })

  it('navigating back should get query from search params', () => {
    let q1 = 'luke'
    let q2 = 'chewbacca'
    
    // Input query
    cy
      .get('.list-header input')
      .type(q1)
    
    cy.wait(600);
    
    // Clear
    cy
      .get('.list-header button[aria-label="Clear"]')
      .click()

    // Input second query
    cy
      .get('.list-header input')
      .type(q2)
      .should('have.value', q2);

    cy.wait(600);

    // Query should be saved to search params
    cy
      .location('search')
      .should('contain', `query=${q2}`)

    // Navigate back
    cy.go('back')
    
    // Previous query should be in url and in search input
    cy
      .location('search')
      .should('contain', `query=${q1}`)
    cy
      .get('.list-header input')
      .should('have.value', q1);
  })
})