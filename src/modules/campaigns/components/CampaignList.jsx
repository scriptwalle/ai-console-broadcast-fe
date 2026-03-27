import React, { useState } from 'react';
import { Edit, Trash2, Plus, Eye } from 'lucide-react';
import { CAMPAIGN_CHANNELS, CAMPAIGN_STATUS } from '../utils/constants.js';
import { Table, Button, ConfirmDialog, StatusBadge, ChannelBadge } from '../../../components/common';

const CampaignList = ({ 
  campaigns = [], 
  loading = false, 
  onEdit, 
  onDelete, 
  onCreate,
  onView
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Helper functions for rendering data
  const renderActions = (campaign) => (
    <div className="flex items-center justify-end space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onView(campaign)}
        title="View"
        className="text-blue-600 hover:text-blue-800"
      >
        <Eye className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit(campaign)}
        title="Edit"
        className="text-slate-600 hover:text-slate-900"
      >
        <Edit className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowDeleteConfirm(campaign.id)}
        title="Delete"
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );

  const formatScheduledTime = (time) => {
    if (!time) return 'Not scheduled';
    return new Date(time).toLocaleString();
  };

  // Table columns configuration
  const columns = [
    {
      key: 'name',
      label: 'Campaign Name',
      render: (value) => <div className="text-sm font-medium">{value}</div>,
    },
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
    {
      key: 'scheduledTime',
      label: 'Scheduled Time',
      render: (value) => (
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {formatScheduledTime(value)}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      cellClassName: 'text-right',
      headerClassName: 'text-right',
      render: (_, campaign) => renderActions(campaign),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Campaigns ({campaigns.length})
        </h3>
        <Button
          onClick={onCreate}
          variant="primary"
          icon={Plus}
        >
          Create Campaign
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={filteredCampaigns}
        loading={loading}
        searchable
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search campaigns..."
        emptyMessage={
          searchTerm
            ? 'No campaigns found.'
            : 'No campaigns yet. Create your first campaign.'
        }
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={showDeleteConfirm !== null}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => {
          onDelete(showDeleteConfirm);
          setShowDeleteConfirm(null);
        }}
        title="Confirm Delete"
        message="Are you sure you want to delete this campaign? This action cannot be undone."
        confirmText="Delete"
        confirmVariant="danger"
      />
    </div>
  );
};

export default CampaignList;
