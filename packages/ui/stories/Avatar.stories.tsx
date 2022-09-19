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
  name: 'test name',
  img: 'https://jie-site.oss-cn-shenzhen.aliyuncs.com/avatar-man-icon-profile-placeholder-260nw-1229859850-e1623694994111.jpeg',
}
