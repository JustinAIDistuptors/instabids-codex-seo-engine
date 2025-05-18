# Admin Dashboard UI Documentation

This document provides detailed information about the InstaBids SEO Engine admin dashboard, its components, and functionality.

## Dashboard Overview

The admin dashboard is a Next.js application that provides a comprehensive interface for monitoring and controlling the SEO Engine. It enables administrators to:

1. Control the autonomous pipeline
2. Configure system parameters
3. Monitor performance metrics
4. Manage generated pages
5. View detailed logs and status information

## Dashboard Sections

### 1. Pipeline Controls

The Pipeline Controls section is the primary interface for starting, stopping, and monitoring the autonomous pipeline.

#### Key Components:

- **Pipeline Status Indicator**: Shows the current status of the pipeline (Running/Stopped)
- **Start/Stop Button**: Controls the pipeline execution
- **Task Metrics Display**: Shows counts of queued, active, completed, and failed tasks
- **Rate Control**: Adjusts the processing rate for tasks
- **Manual Task Creation**: Allows manual triggering of specific pipeline stages

#### Implementation:

```jsx
// Pipeline Controls Component
import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography, Grid, Switch, FormControlLabel, CircularProgress } from '@mui/material';
import { Play, Pause, Settings, BarChart2 } from 'react-feather';
import axios from 'axios';

const DashboardControls = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    queuedTasks: 0,
    activeTasks: 0,
    completedTasks: 0,
    failedTasks: 0,
    generatedPages: 0
  });

  // Fetch pipeline status on load
  useEffect(() => {
    fetchPipelineStatus();
    const interval = setInterval(fetchPipelineStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fetch the current pipeline status
  const fetchPipelineStatus = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/pipeline/status');
      setIsRunning(response.data.isRunning);
      setStats({
        queuedTasks: response.data.queuedTasks,
        activeTasks: response.data.activeTasks,
        completedTasks: response.data.completedTasks,
        failedTasks: response.data.failedTasks,
        generatedPages: response.data.generatedPages
      });
    } catch (error) {
      console.error('Error fetching pipeline status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Start the pipeline
  const startPipeline = async () => {
    try {
      setIsLoading(true);
      await axios.post('/api/pipeline/start');
      setIsRunning(true);
      fetchPipelineStatus();
    } catch (error) {
      console.error('Error starting pipeline:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Stop the pipeline
  const stopPipeline = async () => {
    try {
      setIsLoading(true);
      await axios.post('/api/pipeline/stop');
      setIsRunning(false);
      fetchPipelineStatus();
    } catch (error) {
      console.error('Error stopping pipeline:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Pipeline Controls
          </Typography>
          
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Button
                variant="contained"
                color={isRunning ? "secondary" : "primary"}
                startIcon={isRunning ? <Pause /> : <Play />}
                onClick={isRunning ? stopPipeline : startPipeline}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} />
                ) : isRunning ? (
                  "Stop Pipeline"
                ) : (
                  "Start Pipeline"
                )}
              </Button>
            </Grid>
            
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={isRunning}
                    onChange={isRunning ? stopPipeline : startPipeline}
                    disabled={isLoading}
                  />
                }
                label={isRunning ? "Running" : "Stopped"}
              />
            </Grid>
            
            <Grid item xs />
            
            <Grid item>
              <Button
                variant="outlined"
                startIcon={<Settings />}
                href="/settings"
              >
                Settings
              </Button>
            </Grid>
            
            <Grid item>
              <Button
                variant="outlined"
                startIcon={<BarChart2 />}
                href="/metrics"
              >
                Detailed Metrics
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Queued Tasks
              </Typography>
              <Typography variant="h4">{stats.queuedTasks}</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Tasks
              </Typography>
              <Typography variant="h4">{stats.activeTasks}</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Completed Tasks
              </Typography>
              <Typography variant="h4">{stats.completedTasks}</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Failed Tasks
              </Typography>
              <Typography variant="h4" color={stats.failedTasks > 0 ? "error" : "textPrimary"}>
                {stats.failedTasks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Generated Pages
              </Typography>
              <Typography variant="h4">{stats.generatedPages}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardControls;
```

### 2. Page Management

The Page Management section allows viewing, filtering, and managing the generated pages.

#### Key Components:

- **Page List**: Paginated list of generated pages with filters
- **Page Detail View**: Detailed information about a specific page
- **Content Preview**: View the actual generated content
- **Performance Metrics**: Show search and analytics metrics for each page
- **Manual Edit Controls**: Allow manual edits to generated pages

#### Implementation:

```jsx
// PageList Component
import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { Eye, Edit, BarChart2 } from 'react-feather';
import axios from 'axios';

const PageList = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    service: '',
    location: '',
    status: ''
  });
  
  useEffect(() => {
    fetchPages();
  }, [filters]);
  
  const fetchPages = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/pages', { 
        params: filters 
      });
      setPages(response.data);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleFilterChange = (field, value) => {
    setFilters({
      ...filters,
      [field]: value
    });
  };
  
  return (
    <div>
      <div className="filters">
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel>Service</InputLabel>
          <Select
            value={filters.service}
            onChange={(e) => handleFilterChange('service', e.target.value)}
          >
            <MenuItem value="">All Services</MenuItem>
            {/* Service options loaded dynamically */}
          </Select>
        </FormControl>
        
        <TextField
          label="Location"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          sx={{ m: 1, minWidth: 200 }}
        />
        
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="published">Published</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="indexed">Indexed</MenuItem>
            <MenuItem value="not_indexed">Not Indexed</MenuItem>
          </Select>
        </FormControl>
      </div>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pages.map((page) => (
              <TableRow key={page.id}>
                <TableCell>{page.title}</TableCell>
                <TableCell>{page.service.name}</TableCell>
                <TableCell>{page.zipCode.city}, {page.zipCode.state}</TableCell>
                <TableCell>{new Date(page.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{page.published_at ? 'Published' : 'Draft'}</TableCell>
                <TableCell>
                  <Button 
                    startIcon={<Eye />} 
                    href={`/pages/${page.id}`}
                    size="small"
                  >
                    View
                  </Button>
                  <Button 
                    startIcon={<Edit />} 
                    href={`/pages/${page.id}/edit`}
                    size="small"
                  >
                    Edit
                  </Button>
                  <Button 
                    startIcon={<BarChart2 />} 
                    href={`/pages/${page.id}/metrics`}
                    size="small"
                  >
                    Metrics
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PageList;
```

### 3. Configuration Settings

The Configuration Settings section allows customizing the behavior of the SEO Engine.

#### Key Components:

- **Service Category Management**: Add, edit, and prioritize service categories
- **ZIP Code Targeting**: Select and prioritize target ZIP codes
- **Agent Configuration**: Customize behavior of individual agents
- **Content Templates**: Manage template variations
- **Pipeline Parameters**: Adjust task priority, concurrency, and other settings

#### Implementation:

```jsx
// Configuration Page Component
import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import ServiceCategoryConfig from '../components/Config/ServiceCategoryConfig';
import ZipCodeConfig from '../components/Config/ZipCodeConfig';
import AgentConfig from '../components/Config/AgentConfig';
import TemplateConfig from '../components/Config/TemplateConfig';
import PipelineConfig from '../components/Config/PipelineConfig';

const ConfigPage = () => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <div>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Services" />
        <Tab label="ZIP Codes" />
        <Tab label="Agents" />
        <Tab label="Templates" />
        <Tab label="Pipeline" />
      </Tabs>
      
      <Box sx={{ p: 3 }}>
        {tabIndex === 0 && <ServiceCategoryConfig />}
        {tabIndex === 1 && <ZipCodeConfig />}
        {tabIndex === 2 && <AgentConfig />}
        {tabIndex === 3 && <TemplateConfig />}
        {tabIndex === 4 && <PipelineConfig />}
      </Box>
    </div>
  );
};

export default ConfigPage;
```

### 4. Performance Metrics Dashboard

The Performance Metrics Dashboard provides detailed analytics on SEO performance.

#### Key Components:

- **Overview Metrics**: High-level KPIs for the entire system
- **Page Performance Charts**: Trend charts for impressions, clicks, rankings
- **Service Category Analysis**: Performance comparison by service type
- **Location Analysis**: Geographic performance distribution
- **Top/Bottom Performers**: Lists of best and worst performing pages

#### Implementation:

```jsx
// Performance Metrics Dashboard Component
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const MetricsDashboard = () => {
  const [metrics, setMetrics] = useState({
    overview: {},
    trends: [],
    servicePerformance: [],
    locationPerformance: [],
    topPerformers: [],
    bottomPerformers: []
  });
  const [timeframe, setTimeframe] = useState('30days');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchMetrics();
  }, [timeframe]);
  
  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/metrics', { 
        params: { timeframe } 
      });
      setMetrics(response.data);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={9}>
          <Typography variant="h5">Performance Metrics</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Timeframe</InputLabel>
            <Select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <MenuItem value="7days">Last 7 Days</MenuItem>
              <MenuItem value="30days">Last 30 Days</MenuItem>
              <MenuItem value="90days">Last 90 Days</MenuItem>
              <MenuItem value="year">Last Year</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      
      {/* Overview Metrics */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Pages
              </Typography>
              <Typography variant="h4">{metrics.overview.totalPages}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Indexed Pages
              </Typography>
              <Typography variant="h4">{metrics.overview.indexedPages}</Typography>
              <Typography variant="body2">
                {Math.round((metrics.overview.indexedPages / metrics.overview.totalPages) * 100)}% of total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Impressions
              </Typography>
              <Typography variant="h4">{metrics.overview.totalImpressions}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Clicks
              </Typography>
              <Typography variant="h4">{metrics.overview.totalClicks}</Typography>
              <Typography variant="body2">
                CTR: {(metrics.overview.totalClicks / metrics.overview.totalImpressions * 100).toFixed(2)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Trend Charts */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Trend Analysis</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={metrics.trends}>
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="impressions" stroke="#8884d8" name="Impressions" />
                  <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="#82ca9d" name="Clicks" />
                  <Line yAxisId="right" type="monotone" dataKey="avgPosition" stroke="#ff7300" name="Avg. Position" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Service & Location Performance */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Service Performance</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={metrics.servicePerformance}>
                  <XAxis dataKey="service" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="impressions" fill="#8884d8" name="Impressions" />
                  <Bar dataKey="clicks" fill="#82ca9d" name="Clicks" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Geographic Performance</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={metrics.locationPerformance}
                    nameKey="state"
                    dataKey="impressions"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Top/Bottom Performers */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Top Performing Pages</Typography>
              {metrics.topPerformers.map((page, index) => (
                <div key={index} style={{ marginBottom: 10 }}>
                  <Typography variant="subtitle1">{page.title}</Typography>
                  <Typography variant="body2">
                    Impressions: {page.impressions} | Clicks: {page.clicks} | Position: {page.avgPosition}
                  </Typography>
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Underperforming Pages</Typography>
              {metrics.bottomPerformers.map((page, index) => (
                <div key={index} style={{ marginBottom: 10 }}>
                  <Typography variant="subtitle1">{page.title}</Typography>
                  <Typography variant="body2">
                    Impressions: {page.impressions} | Clicks: {page.clicks} | Position: {page.avgPosition}
                  </Typography>
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default MetricsDashboard;
```

### 5. Task Management

The Task Management section provides a detailed view of the task queue and agent activity.

#### Key Components:

- **Task Queue**: List of pending, active, and completed tasks
- **Agent Status**: Current status of each agent
- **Task Details**: Detailed information about task parameters and results
- **Manual Task Creation**: Interface for manually creating tasks
- **Error Handling**: View and manage failed tasks

## Mobile Responsiveness

The dashboard is fully responsive and works well on mobile devices:

- Responsive grid layouts adapt to screen size
- Navigation collapses to a hamburger menu on small screens
- Charts resize based on available space
- Touch-friendly controls for mobile users

## API Integration

The dashboard integrates with the backend API through a set of RESTful endpoints:

- `/api/pipeline/*` - Control and monitor the pipeline
- `/api/pages/*` - Manage and view pages
- `/api/metrics/*` - Access performance metrics
- `/api/config/*` - Manage system configuration
- `/api/tasks/*` - View and manage tasks

All API requests include proper authentication and validation.

## Dashboard Security

The dashboard implements security best practices:

- Authentication required for all dashboard access
- Role-based access control for different sections
- API requests validated on the server side
- Sensitive operations require confirmation
- Activity logging for audit purposes

## Extending the Dashboard

Developers can extend the dashboard by:

1. Adding new React components in the `src/frontend/components` directory
2. Creating new pages in the `src/frontend/pages` directory
3. Extending API endpoints in `src/backend/routes`
4. Adding new configuration options to `src/backend/config`

All components follow a consistent design pattern and use the Material-UI component library for consistency.