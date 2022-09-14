import { Container } from '@mui/material'
import React from 'react'
import { H3 } from 'widgets/hideorder'
import { Counter as ReduxCounter } from './Counter'

export default function Demo02_AppForm() {
  return (
    <Container>
      <H3>Demo02 : Redux Counter</H3>
      <ReduxCounter  />
    </Container>
  );
}
