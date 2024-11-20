// import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
import { Layout, Menu, Button, Row, Col, Card, Typography, List } from 'antd';
import { Link } from 'react-router-dom';


const { Header, Content } = Layout;
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
  <Layout>
    {/* Navigation Bar */}
    <Header className="header">
      <Menu mode="horizontal" defaultSelectedKeys={['schedule']} style={{ flex: 1 }}>
        <Menu.Item key="customers"><Link to="/customers">Customers</Link></Menu.Item>
        <Menu.Item key="employees"><Link to="/employees">Employees</Link></Menu.Item>
        <Menu.Item key="schedule"><strong>Schedule</strong></Menu.Item>
      </Menu>
      <Button type="primary" style={{ marginLeft: 'auto' }}>Logout</Button>
    </Header>

  {/* Main Content Area */}
  <Content style={{ padding: '20px' }}>
        <Row gutter={16}>
          {/* Left Sidebar - Calendar and Customers */}
          <Col span={6}>
            {/* Placeholder for Calendar */}
            <Card title="Calendar" className="calendar-card" style={{ marginBottom: '20px' }}>
              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Calendar goes here
              </div>
            </Card>

    {/* Customer and Job List */}
    {customers.map((customer, index) => (
              <Card key={index} className="customer-card">
                <Text strong>{customer.name}</Text>
                <p>{customer.address}</p>
                <List
                  size="small"
                  dataSource={customer.jobs}
                  renderItem={(job) => (
                    <List.Item>
                      {job.title} 
                    </List.Item>
                  )}
                />
              </Card>
            ))}
          </Col>
      
{/* Right Content Area - Employees and Assigned Jobs */}
<Col span={18}>
            <Card title="List of Employees and Assigned Jobs">
              <List
                itemLayout="vertical"
                dataSource={employees}
                renderItem={(employee) => (
                  <List.Item>
                    <Title level={4}>{employee.name}</Title>
                    <List
                      size="small"
                      dataSource={employee.assignedJob}
                      renderItem={(job) => <List.Item>{job}</List.Item>}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Home;