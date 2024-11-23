import { Layout, Menu, Row, Col, Card, } from "antd";
import Navbar from "../components/Navbar";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'; //Import Calendar and dateFnsLocalizer from a GitHub repository that I found
import { format, parse, startOfWeek, getDay } from 'date-fns'; // Import date-fns functions
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Styling for the calendar
import { enUS } from 'date-fns/locale/en-US'; // Import English locale for date-fns

const { Header, Content } = Layout;

const Home = () => {

  const locales = { 'en-US': enUS }; // Define the locales object with the English locale

  const localizer = dateFnsLocalizer({// Create a new instance of dateFnsLocalizer with the following options
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const events = [ // Define the events array with some sample events
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
                <Calendar localizer={localizer} 
                events={events} 
                startAccessor="start" 
                endAccessor="end" 
                style={{ height: '100%', width: '100%' }} />
              </div>
            </Card>
          </Col>
      
{/* Right Content Area - Employees and Assigned Jobs */}

        </Row>
      </Content>
    </Layout>
  );
};

export default Home;