import { Layout, Menu, Row, Col, Card, Typography, List } from "antd";
import Navbar from "../components/Navbar";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { enUS } from 'date-fns/locale/en-US';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const Home = () => {

  const locales = { 'en-US': enUS };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const events = [
    {
      title: 'Team Meeting',
      start: new Date(2024, 10, 24, 10, 0), // November 24, 2024, at 10:00 AM
      end: new Date(2024, 10, 24, 11, 0), // November 24, 2024, at 11:00 AM
    },
    {
      title: 'Project Deadline',
      start: new Date(2024, 10, 25, 14, 0), // November 25, 2024, at 2:00 PM
      end: new Date(2024, 10, 25, 15, 0), // November 25, 2024, at 3:00 PM
    },
  ];

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
      <Navbar/>
      <Menu mode="horizontal" defaultSelectedKeys={['schedule']} style={{ flex: 1 }}>
        <Menu.Item key="schedule"><strong>Schedule</strong></Menu.Item>
      </Menu>
    </Header>

  {/* Main Content Area */}
  <Content style={{ padding: '20px' }}>
        <Row gutter={16}>
          {/* Left Sidebar - Calendar and Customers */}
          <Col span={6}>
            {/* Placeholder for Calendar */}
            <Card title="Calendar" className="calendar-card" style={{ marginBottom: '20px' }}>
              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: '100%', width: '100%' }} />
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