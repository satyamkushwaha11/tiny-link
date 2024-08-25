'use client'

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await fetch('/api/analytics?url=');
      const data = await res.json();
      setAnalyticsData(data);
    };

    fetchAnalytics();
  }, []);

  const chartData = {
    labels: analyticsData.map((item:{month:String}) => `Month ${item.month}`),
    datasets: [
      {
        label: 'Short Link Visits',
        data: analyticsData.map((item:{shortLink:String}) => item.shortLink),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'QR Code Scans',
        data: analyticsData.map((item:{qrCode:String}) => item.qrCode),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Visit Analytics</h1>
        <Bar data={chartData} />
      </div>
    </div>
  );
}
