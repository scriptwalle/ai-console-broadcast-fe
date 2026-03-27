import React from 'react';
import { Users, Send, CheckCircle, Eye, XCircle, TrendingUp } from 'lucide-react';
import { getPercentage } from '../utils/mockData.js';

const MetricsCards = ({ metrics, channel }) => {
  const getMetricIcon = (metricType) => {
    switch (metricType) {
      case 'totalRecipients':
        return <Users className="w-6 h-6" />;
      case 'totalSent':
        return <Send className="w-6 h-6" />;
      case 'totalDelivered':
        return <CheckCircle className="w-6 h-6" />;
      case 'totalRead':
      case 'totalOpened':
        return <Eye className="w-6 h-6" />;
      case 'totalFailed':
        return <XCircle className="w-6 h-6" />;
      default:
        return <TrendingUp className="w-6 h-6" />;
    }
  };

  const getMetricColor = (metricType) => {
    switch (metricType) {
      case 'totalRecipients':
        return 'bg-slate-500';
      case 'totalSent':
        return 'bg-blue-500';
      case 'totalDelivered':
        return 'bg-green-500';
      case 'totalRead':
      case 'totalOpened':
        return 'bg-emerald-500';
      case 'totalFailed':
        return 'bg-red-500';
      default:
        return 'bg-slate-500';
    }
  };

  const getMetricLabel = (metricType) => {
    switch (metricType) {
      case 'totalRecipients':
        return 'Total Recipients';
      case 'totalSent':
        return 'Total Sent';
      case 'totalDelivered':
        return 'Total Delivered';
      case 'totalRead':
        return channel === 'email' ? 'Total Opened' : 'Total Read';
      case 'totalOpened':
        return 'Total Opened';
      case 'totalFailed':
        return 'Total Failed';
      default:
        return metricType;
    }
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-emerald-500';
    if (percentage >= 50) return 'bg-yellow-500';
    if (percentage >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const cards = [
    {
      type: 'totalRecipients',
      value: metrics.totalRecipients,
      percentage: 100, // Always 100% for total recipients
      showProgress: false
    },
    {
      type: 'totalSent',
      value: metrics.totalSent,
      percentage: getPercentage(metrics.totalSent, metrics.totalRecipients),
      showProgress: true
    },
    {
      type: 'totalDelivered',
      value: metrics.totalDelivered,
      percentage: getPercentage(metrics.totalDelivered, metrics.totalRecipients),
      showProgress: true
    },
    {
      type: channel === 'email' ? 'totalOpened' : 'totalRead',
      value: channel === 'email' ? metrics.totalOpened : metrics.totalRead,
      percentage: getPercentage(channel === 'email' ? metrics.totalOpened : metrics.totalRead, metrics.totalRecipients),
      showProgress: true
    },
    {
      type: 'totalFailed',
      value: metrics.totalFailed,
      percentage: getPercentage(metrics.totalFailed, metrics.totalRecipients),
      showProgress: true
    }
  ].filter(card => card.value > 0 || card.type === 'totalRecipients');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card) => (
        <div key={card.type} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${getMetricColor(card.type)} bg-opacity-10`}>
              <div className={`${getMetricColor(card.type)} text-white`}>
                {getMetricIcon(card.type)}
              </div>
            </div>
            {card.showProgress && (
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-900">{card.percentage}%</div>
              </div>
            )}
          </div>
          
          <div>
            <div className="text-2xl font-bold text-slate-900 mb-1">{card.value}</div>
            <div className="text-sm text-slate-600">{getMetricLabel(card.type)}</div>
          </div>
          
          {card.showProgress && (
            <div className="mt-4">
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(card.percentage)}`}
                  style={{ width: `${card.percentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;
