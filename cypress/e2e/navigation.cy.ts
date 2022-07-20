import { TARGET_URL } from 'cypress/constants/constants';

describe('Navigation', () => {
  beforeEach(() => {
    cy.visit(TARGET_URL)
  })
  
  it('clicking on a character should open detail', () => {
    
    // Click first on list
    cy
      .get('.character-list .mat-card', { timeout: 15000 })
      .first()
      .get('span')
      .contains('Luke Skywalker')
      .click();
    
    // Check route
    cy
      .location('pathname')
      .should('contain', 'characters/luke-skywalker');
    
    // Check title
    cy
      .get('h2')
      .contains('Luke Skywalker', { matchCase: false })
  })
})