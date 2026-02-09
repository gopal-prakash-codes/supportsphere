import React from 'react';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <h1>Welcome to the Next.js App</h1>
      <p>This is the homepage of your Next.js application.</p>
    </Layout>
  );
};

export default Home;

import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>My Application</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; {new Date().getFullYear()} My Application</p>
      </footer>
    </div>
  );
};

export default Layout;