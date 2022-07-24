import React from 'react'
import { styled } from '@stitches/react'
import { blackA } from '@radix-ui/colors'

const StyledInput = styled('input', {
  all: 'unset',
  //   display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 10px',
  height: 35,
  fontSize: 15,
  lineHeight: 1,
  color: 'white',
  backgroundColor: blackA.blackA5,
  boxShadow: `0 0 0 1px ${blackA.blackA9}`,
  '&:focus': { boxShadow: `0 0 0 2px black` },
})

export const Input = StyledInput
