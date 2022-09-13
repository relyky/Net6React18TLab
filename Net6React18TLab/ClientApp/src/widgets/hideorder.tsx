import React from 'react'
import type { FC, MouseEventHandler } from 'react'
import { Typography, Button, FormControlLabel, Switch } from "@mui/material"

export const H3: FC<{
  text?: string,
  children?: React.ReactChild
}> = props => (
  <Typography variant='h3' my={2}>
    {props.text ? props.text : props.children}
  </Typography>
)

export const H4: FC<{
  text?: string,
  children?: React.ReactChild
}> = props => (
  <Typography variant='h4' my={2}>
    {props.text ? props.text : props.children}
  </Typography>
)

export const H5: FC<{
  text?: string,
  children?: React.ReactChild
}> = props => (
  <Typography variant='h5' p={1}>
    {props.text ? props.text : props.children}
  </Typography>
)

export const H6: FC<{
  text?: string,
  children?: React.ReactChild
}> = props => (
  <Typography variant='h6' p={1}>
    {props.text ? props.text : props.children}
  </Typography>
)

export const P1: FC<{
  children: React.ReactChild
}> = props => (
  <Typography variant='body1'>
    {props.children}
  </Typography>
)

export const P2: FC<{
  children: React.ReactChild
}> = props => (
  <Typography variant='body2'>
    {props.children}
  </Typography>
)

export const AButton: FC<{
  mutant: 'primary' | 'secondary' | 'primary0' | 'secondary0',
  label: string,
  onClick: MouseEventHandler<HTMLButtonElement>
}> = ({ mutant, label, onClick }) => {
  const color = mutant.startsWith('secondary') ? 'secondary'
    : 'primary';

  const variant = mutant.endsWith('0') ? 'outlined'
    : 'contained';

  return (
    <Button color={color} variant={variant} sx={{ mr: 1 }} onClick={onClick} >
      {label}
    </Button >
  )
}

export const ASwitch: FC<{
  value: boolean
  name?: string
  label?: string
  onChange: (v: { name?: string, value: boolean }) => void
}> = props => {
  return (props.label ?
    <FormControlLabel label={props.label} control={
      <Switch
        name={props.name}
        value={props.value}
        onChange={(e, checked) => props.onChange({ name: props.name, value: checked })}
      />
    } />
    :
    <Switch
      name={props.name}
      value={props.value}
      onChange={(e, checked) => props.onChange({ name: props.name, value: checked })}
    />
  )
}
