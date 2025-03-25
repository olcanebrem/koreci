export async function getBlogPosts() {
    const baseUrl = import.meta.env.STRAPI_URL || 'http://localhost:1337';
    const token = import.meta.env.STRAPI_API_TOKEN;
    const url = `${baseUrl}/api/blogs?sort[0]=publishedAt:desc`;

    console.log(`Fetching blogs from: ${url}`);
    console.log(`Using Token: ${token ? 'Yes' : 'No'}`);

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API Error: ${response.status} - ${errorText}`);
            return []; // Hata durumunda boş dizi döndür
        }

        const data = await response.json();
        console.log('Fetched Blog Posts:', data); // Debug için API çıktısını gör
        return data.data || []; // Eğer `data.data` yoksa boş dizi döndür
    } catch (error) {
        console.error('Fetch Error:', error);
        return []; // Hata durumunda yine boş dizi döndür
    }
}
