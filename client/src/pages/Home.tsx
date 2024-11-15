// import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import './Home.css';

const { Header, COntent } = Layout;
const { Title, Text } = Typography;

const Home = () => {
  const customers = [
    {
      name: 'John Doe',
      address: '123 Main St, USA, US 12345',
      jobs: [
        { title: 'Job 1', description: 'Job 1 Description' },
        { title: 'Job 2', description: 'Job 2 Description' },
      ],
    },
  ];

const employees = [
  {name: 'John Doe', assignedJob: ['fix plumbing issues', 'install new sink']},
  {name: 'Jane Doe', assignedJob: ['install new sink', 'fix plumbing issues']},
];
      

  return (
    <div>
      <h1>This is the Home Page</h1>
    </div>
  );
};

export default Home;
