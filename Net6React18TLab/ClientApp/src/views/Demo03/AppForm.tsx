import React from 'react'
import { Container, Typography, Button, Divider } from '@mui/material';
import IconDemo from './IconDemo';
import TypoDemo from './TypoDemo'

export default function Demo03_AppForm() {
  return (
    <Container>
      <Typography variant="h3">Demo03 : Material UI 展示</Typography>
        
      <Button variant="contained">Hello World</Button>
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

      <TypoDemo />

      <IconDemo />

    </Container>
  );
}
