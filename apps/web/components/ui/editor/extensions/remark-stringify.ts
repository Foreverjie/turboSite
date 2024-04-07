import type { Handle } from 'mdast-util-to-markdown'

export const extensionOfRemarkStringify: Record<string, Handle> = {
  alert: (
    node: { value: { type: string; text: string } },
    _: any,
    state: { enter: (arg0: any) => any; createTracker: (arg0: any) => any },
    info: any,
  ) => {
    const exit = state.enter('alert' as any)
    const tracker = state.createTracker(info)
    let value = tracker.move('')
    const { type, text } = node.value as {
      type: string
      text: string
    }

    value += `> [!${type.toUpperCase()}]\n${text
      .split('\n')
      .map(line => `> ${line}`)
      .join('\n')}\n`
    exit()

    return value
  },
}
