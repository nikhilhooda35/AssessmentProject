import {Box, Container} from '@mui/material';

export const Unauthorized = () => {
  return (
    <div>
      <Container maxWidth={false}>
        <Box
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'row'}
          fontSize={'2rem'}
        >
          No Access
        </Box>
      </Container>
    </div>
  );
};
