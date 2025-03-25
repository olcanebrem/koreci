export async function get() {
    const STRAPI_URL = import.meta.env.STRAPI_URL;
    
    try {
      const response = await fetch(`${STRAPI_URL}/api/posts?populate=image`);
      const { data } = await response.json();
      
      return {
        body: JSON.stringify({
          posts: data.map(post => ({
            id: post.id,
            title: post.attributes.title,
            slug: post.attributes.slug,
            content: post.attributes.content,
            image: {
              url: post.attributes.image?.data?.attributes?.url,
              alt: post.attributes.image?.data?.attributes?.alternativeText
            }
          }))
        })
      };
    } catch (error) {
      return {
        status: 500,
        body: JSON.stringify({ error: "Veri çekilemedi" })
      };
    }
  }