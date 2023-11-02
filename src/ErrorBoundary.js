import {Box, Card, CardContent, Typography} from '@mui/material';
import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true, error};
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          alignSelf="center"
          minHeight="100vh">
          <Card sx={{maxWidth: 275}}>
            <CardContent>
              <Typography
                sx={{fontSize: 14}}
                color="text.secondary"
                gutterBottom>
                Something went wrong!
              </Typography>
            </CardContent>
          </Card>
        </Box>
      );
    }
    return this.props.children;
  }
}
