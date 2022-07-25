import React from 'react'
import { styled } from './stitches.config'
import { blueA } from '@radix-ui/colors'

const StyledInput = styled('input', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 10px',
  height: 35,
  fontSize: 15,
  lineHeight: 1,
  color: 'black',
  backgroundColor: blueA.blueA1,
  boxShadow: `0 0 0 1px ${blueA.blueA12}`,
  '&:focus': { boxShadow: `0 0 0 2px ${blueA.blueA10}` },
})

export const Input = StyledInput
