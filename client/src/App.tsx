import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token'); // Get the authentication token
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Attach authLink to requests
  cache: new InMemoryCache(),
});

function App() {
  const location = useLocation(); // Get the current route
  const hideNavbarRoutes = ['/', '/login', '/create-account']; // Routes to hide Navbar
  const isNavbarHidden = hideNavbarRoutes.includes(location.pathname); // Check if the current route is in the list

  return (
    <ApolloProvider client={client}>
      <div>
        {/* Conditionally render the Navbar */}
        {!isNavbarHidden && <Navbar />}

        {/* Offset the content below the navbar */}
        <main>
          <Outlet /> {/* This renders the routed content */}
        </main>
      </div>
    </ApolloProvider>
  );
}

export default App;
