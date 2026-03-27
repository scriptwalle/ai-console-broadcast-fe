import React, { useState } from 'react';
import { Save, User, Mail, Plus, Edit, Search, Phone, Settings } from 'lucide-react';
import {
  Input,
  Select,
  Button,
  Table,
  Modal,
  ConfirmDialog,
  Badge,
  StatusBadge,
  ChannelBadge,
  Alert,
  ErrorAlert,
  SuccessAlert,
  Tabs,
  TabPanels,
  TabPanel,
} from './index';

/**
 * ComponentShowcase - Demonstrates usage of all reusable components
 * This is an example file showing how to use the common components
 */
const ComponentShowcase = () => {
  // State for various component demos
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    channel: '',
    status: 'active',
  });
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState('inputs');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data for table
  const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', channel: 'whatsapp', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', channel: 'sms', status: 'scheduled' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', channel: 'email', status: 'completed' },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Tab configuration
  const tabs = [
    { value: 'inputs', label: 'Form Inputs', icon: User },
    { value: 'buttons', label: 'Buttons', icon: Settings },
    { value: 'data', label: 'Data Display', icon: Search },
    { value: 'feedback', label: 'Feedback', icon: Phone },
  ];

  // Table columns
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'channel',
      label: 'Channel',
      render: (value) => <ChannelBadge channel={value} />,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <StatusBadge status={value} />,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Component Showcase
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Examples of all reusable components in the design system
        </p>
      </div>

      <Tabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
        variant="pills"
        size="md"
      />

      <TabPanels activeTab={activeTab}>
        {/* Form Inputs Tab */}
        <TabPanel value="inputs" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Form Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                icon={User}
                required
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                icon={Mail}
                required
                helperText="We'll never share your email"
              />

              <Select
                label="Channel"
                name="channel"
                value={formData.channel}
                onChange={handleInputChange}
                options={[
                  { value: 'whatsapp', label: 'WhatsApp' },
                  { value: 'sms', label: 'SMS' },
                  { value: 'email', label: 'Email' },
                ]}
                placeholder="Select channel"
                required
              />

              <Select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                options={['active', 'inactive', 'pending']}
              />
            </div>
          </div>
        </TabPanel>

        {/* Buttons Tab */}
        <TabPanel value="buttons" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Button Variants</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="ghost">Ghost</Button>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button icon={Save}>With Icon</Button>
                <Button icon={Plus} iconPosition="right">Icon Right</Button>
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </TabPanel>

        {/* Data Display Tab */}
        <TabPanel value="data" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Data Display</h2>

            {/* Badges Section */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Badges</h3>
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge>Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="info">Info</Badge>
              </div>

              <div className="flex flex-wrap gap-3 mb-4">
                <StatusBadge status="active" />
                <StatusBadge status="scheduled" />
                <StatusBadge status="completed" />
                <StatusBadge status="failed" />
              </div>

              <div className="flex flex-wrap gap-3">
                <ChannelBadge channel="whatsapp" />
                <ChannelBadge channel="sms" />
                <ChannelBadge channel="email" />
              </div>
            </div>

            {/* Table Section */}
            <div>
              <h3 className="text-lg font-medium mb-3">Data Table</h3>
              <Table
                columns={columns}
                data={sampleData}
                searchable
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                searchPlaceholder="Search users..."
              />
            </div>
          </div>
        </TabPanel>

        {/* Feedback Tab */}
        <TabPanel value="feedback" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Feedback Components</h2>

            {/* Alerts Section */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-medium">Alerts</h3>
              <Alert variant="info" title="Information">
                This is an informational message.
              </Alert>
              <SuccessAlert title="Success">
                Your action was completed successfully.
              </SuccessAlert>
              <ErrorAlert title="Error" dismissible onDismiss={() => {}}>
                Something went wrong. Please try again.
              </ErrorAlert>
            </div>

            {/* Modal Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Modals</h3>
              <div className="flex gap-3">
                <Button onClick={() => setShowModal(true)}>
                  Open Modal
                </Button>
                <Button
                  variant="danger"
                  onClick={() => setShowConfirm(true)}
                >
                  Delete Item
                </Button>
              </div>

              <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Example Modal"
                size="md"
                actions={
                  <>
                    <Button
                      variant="secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setShowModal(false)}
                    >
                      Save Changes
                    </Button>
                  </>
                }
              >
                <p className="text-slate-600 dark:text-slate-300">
                  This is an example modal with custom content and actions.
                </p>
              </Modal>

              <ConfirmDialog
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={() => setShowConfirm(false)}
                title="Confirm Deletion"
                message="Are you sure you want to delete this item? This action cannot be undone."
              />
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </div>
  );
};

export default ComponentShowcase;