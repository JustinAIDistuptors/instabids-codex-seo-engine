import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography, Grid, Switch, FormControlLabel, CircularProgress } from '@mui/material';
import { Play, Pause, Settings, BarChart2 } from 'react-feather';
import axios from 'axios';

/**
 * Dashboard controls for managing the SEO pipeline
 */
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