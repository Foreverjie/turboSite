import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Avatar, AvatarFallback, AvatarImage } from '../src/Avatar'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/Avatar',
  component: Avatar,
} as ComponentMeta<any>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Avatar> = args => {
  return <Avatar {...args} />
}

export const TemplateAvatar: ComponentStory<typeof Avatar> = Template.bind({})
TemplateAvatar.args = {
  user: {
    name: 'test name',
    avatar: 'https://gravatar.com/avatar/placeholder?s=100',
  },
}

export const NotLoginAvatar: ComponentStory<typeof Avatar> = Template.bind({})
NotLoginAvatar.args = {
  user: null,
}
