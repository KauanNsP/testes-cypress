/// <reference types="cypress" />

describe('Testes para home', () => {
    beforeEach(() => {

        cy.visit('https://agenda-contatos-react.vercel.app/');
        cy.contains('Agenda de contatos').should('exist');
    });


    it('deve incluir um contato', () => {
        cy.get('input[placeholder="Nome"]').type('Novo Contato');
        cy.get('input[placeholder="E-mail"]').type('contato@example.com');
        cy.get('input[placeholder="Telefone"]').type('123456789');
        cy.get('button.adicionar').click();

        cy.contains('Novo Contato').should('exist');
        cy.contains('contato@example.com').should('exist');
        cy.contains('123456789').should('exist');
    });

    it('deve editar um contato existente', () => {
        cy.contains('Novo Contato').should('exist')
        cy.get('button.edit').contains('Editar').click();
        cy.get('input[placeholder="Nome"]').clear().type('Contato Editado');
        cy.get('input[placeholder="E-mail"]').clear().type('editado@example.com');
        cy.get('button.alterar').contains('Salvar').click();

        cy.contains('Contato Editado').should('exist');
        cy.contains('editado@example.com').should('exist');
    })

    it('deve remover um contato', () => {
        cy.contains('Contato Editado').should('exist').then(() => {
            cy.get('li').contains('Contato Editado').parent().find('button.delete').click();
        });

        cy.contains('Contato Editado').should('not.exist');
    });
})