import {Box, Container} from '@mui/material';
export const InProgress = () => {
 
  return (
    <div>
      <Container maxWidth={false}>
        <Box>{'This feature is currently not supported in the application.'}</Box>
      </Container>
    </div>
  );
};
