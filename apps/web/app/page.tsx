'use client'
import { CustomPage } from '~/lib/types/page.types'
// import Feed from 'components/Feed/Feed'
// import { WebLayout } from '~/layouts/WebLayout'
import Head from 'next/head'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { Modal, Text, useModal, Button, Textarea, Loading } from 'ui'
import { trpc } from '~/utils/trpc'
import { useState } from 'react'
import { SimpleColors } from 'ui/src/utils/prop-types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'ui/src/accordion'
import Feed from '~/components/Feed/Feed'
import { useTheme } from 'next-themes'
// import Widget from '~/components/Widget/Widget'

const Home: CustomPage = () => {
  const { data, isLoading } = trpc.cat.list.useQuery()
  const { theme, setTheme } = useTheme()

  return (
    <div className="lg:max-w-6xl mx-auto">
      <Head>
        <title>Flash</title>
      </Head>

      <div>
        <div className="">The current theme is: {theme}</div>
        <button onClick={() => setTheme('light')}>Light Mode</button>
        <button onClick={() => setTheme('dark')}>Dark Mode</button>
      </div>

      <Feed />

      <h1 className="text-4xl font-bold">Flash</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other components
            aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It is animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* <Widget /> */}
    </div>
  )
}

// type Helper = {
//   text?: string
//   color: SimpleColors
// }

// const HeaderItem = () => {
//   const { setVisible, bindings } = useModal()

//   // const newPostMutation = trpc.useMutation(['post.New'], {
//   //   onSuccess: () => {
//   //     console.log('refetch posts')
//   //   },
//   // })

//   const openNewPostModal = () => {
//     setVisible(true)
//   }
//   const [helper, setHelper] = useState<Helper>({ text: '', color: 'default' })

//   const { value, setValue, reset, bindings: textBindings } = useInput('')

//   // const newPost = async () => {
//   //   if (validatePost(value)) {
//   //     await newPostMutation.mutate({ content: value })
//   //     setVisible(false)
//   //   }
//   // }
//   const newPost = () => {}

//   const validatePost = (value: string): boolean => {
//     if (!value) {
//       setHelper({
//         text: 'Enter something...',
//         color: 'error',
//       })
//       return false
//     }
//     setHelper({
//       text: '',
//       color: 'default',
//     })
//     return true
//   }
//   return (
//     <>
//       <h1 className="p-5 text-xl font-bold">Home</h1>
//       <PlusCircleIcon
//         className="m-3 h-8 w-8 cursor-pointer text-primary transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
//         onClick={openNewPostModal}
//       />
//       <Modal
//         scroll
//         blur
//         bottom
//         closeButton
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description"
//         {...bindings}
//       >
//         <Modal.Header>
//           <Text id="modal-title" size={18}>
//             New Post
//           </Text>
//         </Modal.Header>
//         <Modal.Body>
//           <Textarea
//             {...textBindings}
//             autoFocus
//             onChange={event => {
//               validatePost(event.target.value)
//               setValue(event.target.value)
//             }}
//             helperColor={helper.color}
//             placeholder={'Give the world a surprise...'}
//             helperText={helper.text}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={newPost}>Post</Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   )
// }

// Home.getLayout = page => (
//   // <WebLayout headerItem={<HeaderItem />}>{page}</WebLayout>
//   <WebLayout headerItem={<></>}>{page}</WebLayout>
// )

export default Home
