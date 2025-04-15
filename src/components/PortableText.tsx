import { PortableText as PortableTextRenderer } from '@portabletext/react'

export default function PortableText({ value }: { value: any }) {
  return (
    <PortableTextRenderer
      value={value}
      components={{
        types: {},
        marks: {},
        block: {
          h1: ({ children }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-semibold my-3">{children}</h2>,
          normal: ({ children }) => <p className="mb-4 text-gray-800">{children}</p>,
        },
      }}
    />
  )
}
