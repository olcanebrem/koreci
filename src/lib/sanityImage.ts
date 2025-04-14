import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder({
projectId: import.meta.env.SANITY_PROJECT_ID,

  dataset: 'production',
})

export function urlFor(source: any) {
  return builder.image(source)
}
