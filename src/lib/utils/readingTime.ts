export const readingTime = (content: any[]): string => {
  const wordsPerMinute = 200;
  let wordCount = 0;

  content.forEach((block) => {
    if (block.children) {
      block.children.forEach((child: any) => {
        if (child.text) {
          wordCount += child.text.split(/\s+/).length;
        }
      });
    }
  });

  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}; 