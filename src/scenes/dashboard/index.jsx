import React from 'react';
import { Box, Typography, useTheme, Button } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";

const Dashboard = () => {
  const theme = useTheme();

  // Mock stock data - replace with real data as needed
  const stocks = [
    { id: 'NVDA', name: 'Nvidia', value: 203.65, change: '+5.63' },
    { id: 'META', name: 'Meta', value: 151.74, change: '-4.44' },
    { id: 'TSLA', name: 'Tesla Inc', value: 177.90, change: '+17.63' },
    { id: 'AAPL', name: 'Apple Inc', value: 145.93, change: '+23.41' },
    { id: 'AMD', name: 'Advanced Micro Devices', value: 75.40, change: '+1.50' },
    // { id: 'MSPL', name: 'Mahindra services Pvt Limited', value: 15.40, change: '-1.50' }
  ];

  const StockCard = ({ id, name, value, change }) => {
    const isPositiveChange = change && change.startsWith('+');
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff',
          borderRadius: '8px',
          boxShadow: 1,
          padding: 2,
          borderLeft: 5,
          borderColor: isPositiveChange ? 'success.main' : 'error.main'
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          {name}
        </Typography>
        <Typography
          variant="body1"
          color={isPositiveChange ? 'success.main' : 'error.main'}
        >
          {id} {change}
        </Typography>
        <Typography variant="h6" gutterBottom>
          ${value.toFixed(2)}
        </Typography>
        {/* Placeholder for mini-chart */}
        <Box sx={{ alignSelf: 'stretch', backgroundColor: isPositiveChange ? 'success.light' : 'error.light', mt: 1, width: '100%' }}>
          {/* Integrate your mini-chart component here */}
        </Box>
      </Box>
    );
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Button variant="contained" startIcon={<DownloadOutlinedIcon />} sx={{ py: '10px', px: '20px' }}>
          Download Reports
        </Button>
      </Box>

      {/* STOCK CARDS */}
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridGap={2} mb={4}>
        {stocks.map(stock => (
          <Box gridColumn="span 2" key={stock.id}>
            <StockCard {...stock} />
          </Box>
        ))}
      </Box>

      {/* CHARTS AND OTHER COMPONENTS */}
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridGap={2}>
        {/* Integrate other components as they were, like LineChart, GeographyChart, BarChart, etc. */}
        <Box gridColumn="span 8">
          <LineChart />
        </Box>
        <Box gridColumn="span 4">
          <GeographyChart />
        </Box>
        {/* ...other rows and components */}
      </Box>
    </Box>
  );
};

export default Dashboard;
