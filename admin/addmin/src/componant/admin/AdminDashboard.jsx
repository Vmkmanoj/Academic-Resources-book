import React from 'react';
import { Button, Layout, Menu, Card, Progress, Modal } from 'antd';
import { Plus, FileText, BookOpen, Library } from 'lucide-react';
import { ResourceUploadForm } from './ResourceUploadForm';
import { ResourceManagement } from './ResourceManagement';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // External CSS file

const { Header, Sider, Content } = Layout;

export const AdminDashboard = () => {
  const [showUploadForm, setShowUploadForm] = React.useState(false);
  const Navigate = useNavigate();

  const stats = [
    { title: 'Total Syllabi', count: 24, icon: FileText, progress: 75 },
    { title: 'Question Banks', count: 36, icon: BookOpen, progress: 60 },
    { title: 'E-Books', count: 18, icon: Library, progress: 45 },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider width={240} className="site-layout-background">
        <div className="sidebar-header">
          <h2 className="text-white text-xl">Dashboard</h2>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          className="sidebar-links"
        >
          <Menu.Item key="1" onClick={() => Navigate("/")}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" onClick={() => Navigate("/Resource")}>
            Resources
          </Menu.Item>
          <Menu.Item key="3" onClick={() => Navigate("/userShow")}>
            Users
          </Menu.Item>
          <Menu.Item key="4" onClick={() => Navigate("/Test")}>
            Test
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout style={{ padding: '0 24px 24px' }}>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <h2 className="dashboard-title">Admin Dashboard</h2>
          <Button
            icon={<Plus />}
            type="primary"
            className="upload-button"
            onClick={() => setShowUploadForm(true)}
          >
            Upload Resource
          </Button>
        </Header>

        <Content
          style={{
            padding: '24px',
            margin: 0,
            minHeight: 280,
          }}
        >
          {/* Stats Section */}
          {/* <div className="stats-container">
            {stats.map((stat) => (
              <Card
                key={stat.title}
                className="stat-card"
                title={stat.title}
                extra={<stat.icon className="stat-icon" />}
              >
                <p className="stat-count">{stat.count}</p>
                <Progress
                  percent={stat.progress}
                  status="active"
                  strokeColor="#52c41a"
                />
              </Card>
            ))}
          </div> */}

          {/* Conditional Upload Form Modal */}
          <Modal
            visible={showUploadForm}
            title="Upload Resource"
            onCancel={() => setShowUploadForm(false)}
            footer={null}
            width={500}
            className="upload-modal"
          >
            <ResourceUploadForm onClose={() => setShowUploadForm(false)} />
          </Modal>

          {/* Resource Management Section */}
          <div className="resource-management-section">
            <ResourceManagement />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
