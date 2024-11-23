
import { mount } from '@cypress/react';
import Navbar from '@components/Navbar';

describe('Navbar Component', () => {
  it('renders correctly', () => {
    mount(<Navbar />);
    cy.get('.navbar').should('exist'); // Adjust selector based on your component.
    cy.contains('Home').should('exist'); // Replace "Home" with actual text in Navbar.
  });
});
