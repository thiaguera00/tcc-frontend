import { CircularProgress, Box } from '@mui/material';

const Loading = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;