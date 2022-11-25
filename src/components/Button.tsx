import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function BasicButtons() {
  return (
    <Box
    display='flex'
    justifyContent='center'
    alignItems='center'
    minHeight='100vh'
    >
      <Button variant="contained">Hello There!</Button>
    </Box>
  );
}