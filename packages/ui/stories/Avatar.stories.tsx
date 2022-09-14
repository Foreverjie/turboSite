import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Avatar, AvatarFallback, AvatarImage } from '../src/Avatar'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/Avatar',
  component: Avatar,
} as ComponentMeta<any>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Avatar> = () => {
  return (
    <Avatar className="mt-4">
      <div>
        <AvatarImage
          src={
            'https://jie-site.oss-cn-shenzhen.aliyuncs.com/avatar-man-icon-profile-placeholder-260nw-1229859850-e1623694994111.jpeg'
          }
          alt={'test'}
        />
        <AvatarFallback delayMs={600}>{'test name'}</AvatarFallback>
      </div>
    </Avatar>
  )
}

export const TemplateAvatar = Template.bind({})
