// components/PortableTextRenderer.tsx
import React from "react";
import { PortableText } from "@portabletext/react";

const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function PortableTextRenderer({ value }: { value: any }) {
  return (
    <PortableText
      value={value}
      components={{
        types: {
            image: ({ value }) => {
                const url = value?.asset?.url;
                if (!url) {
                  console.warn("Image asset url missing:", value);
                  console.log("PortableText value", value);
                  return <p className="text-red-500">Image not available</p>;
                }
              
                return (
                  <img
                    src={url}
                    alt="Blog Image"
                    style={{ width: '100%', height: 'auto' }}
                    loading="lazy"
                  />
                );
              },

          youtube: ({ value }) => (
            <iframe
              className="aspect-video w-full my-6"
              src={`https://www.youtube.com/embed/${getYoutubeId(value.url)}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ),
          quote: ({ value }) => (
            <blockquote className="border-l-4 pl-4 italic text-gray-600 my-6">
              "{value.text}" <br />
              <span className="block text-sm mt-2 text-right">— {value.author}</span>
            </blockquote>
          ),
          codeBlock: ({ value }) => (
            <pre className="bg-gray-800 text-white p-4 rounded my-6 overflow-x-auto">
              <code>{value.code}</code>
            </pre>
          ),
        },
      }}
    />
  );
}
