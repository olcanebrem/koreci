export async function getStaticProps() {
    const res = await fetch("https://your-cms-api.com/posts")
    const posts = await res.json()
  
    return {
      props: { posts },
      revalidate: 600, // 10 dakika sonra yeniden oluştur
    }
  }
  