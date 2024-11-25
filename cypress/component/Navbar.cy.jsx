import { mount } from 'cypress/react'; 
import Navbar from '../../client/src/components/Navbar';  
import { MemoryRouter } from 'react-router-dom';  

// Component test - Navbar
describe('Navbar', () => {
  // Uses MemoryRouter because of the usage of <Link> in routing the pages
  // Checks to make sure the navbar is mounted properly
  it('properly renders the navbar component', () => {
    mount(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    cy.get('nav').should('exist');  
  });

  // Checks to see if the links for /home, /customers, /employees and /jobs exist
  it('contains the links to the navbar', () => {
    mount(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    cy.get('a[href="/home"]').should('exist');  // Check if Home link is rendered
    cy.get('a[href="/customers"]').should('exist');  // Check if Customers link is rendered
    cy.get('a[href="/employees"]').should('exist');  // Check if Employees link is rendered
    cy.get('a[href="/jobs"]').should('exist');  // Check if Jobs link is rendered
  });
});
