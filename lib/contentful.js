const contentful = require('contentful')

const client = contentful.createClient({
  space: 'yrtxgeyfrqd9',
  environment: 'master', // defaults to 'master' if not set
  accessToken: '-7RkOHraGLjltjkMLGif9JY5Vjy8xdLMBvYEkRgMPP4'
})

client.getEntry('1nhgvH3rCGYJEH4TyxbNx3')
  .then((entry) => console.log(entry))
  .catch(console.error)