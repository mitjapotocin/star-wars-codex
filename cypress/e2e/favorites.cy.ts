import { TARGET_URL } from 'cypress/constants/constants';

describe('Favorites', () => {
  beforeEach(() => {
    cy.visit(TARGET_URL)

    // Click on first heart
    cy
      .get('.character-list .mat-card button', { timeout: 15000 })
      .first()
      .should('not.have.class', 'mat-warn')
      .click();

    cy.wait(200)
  })

  it('clicking on a character should open detail', () => {

    // Check if heart is red
    cy
      .get('.character-list .mat-card button', { timeout: 15000 })
      .first()
      .should('have.class', 'mat-warn')

    // Navigate to detail view
    cy
      .get('.character-list .mat-card', { timeout: 15000 })
      .first()
      .click();

    // Check if heart is red in detail view
    cy
      .get('h2 button', { timeout: 15000 })
      .first()
      .should('have.class', 'mat-warn')
    
    // Navigate back
    cy.go('back');

    // Check if heart is still red
    cy
      .get('.character-list .mat-card button', { timeout: 15000 })
      .first()
      .should('have.class', 'mat-warn')

    // Check if heart is still red after page reload
    cy.reload()
    cy
      .get('.character-list .mat-card button', { timeout: 15000 })
      .first()
      .should('have.class', 'mat-warn')
  })
})