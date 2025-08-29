describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('localhost:4200')
     cy.get('.form-group')
      .find('[name="username"]').type('test1')
    cy.get('.form-group')
      .find('[type="password"]').type('test')

    cy.get('.form-group form').submit()
  })

    it('login should not fail', () => {
        cy.get('h2').should('contain', 'Welcome, test1!')
        cy.get('button').should('contain', 'Logout')
        cy.get('button').should('contain', 'Start')
  })

    it('game should start and show questions', () => {
        cy.get('button').contains('Start').click()
        cy.get('.answers').children().should('have.length', 3).should('be.enabled')
        cy.get('button').contains('Next').should('be.disabled')

        cy.get('.answers').children().first().click()
        cy.get('button').contains('Next').should('be.enabled')
        cy.get('.answers').children().should('be.disabled')
  })
})