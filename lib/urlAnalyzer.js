import { JSDOM } from 'jsdom';

// This is a simplified URL analyzer. In a real application, you might use:
// - A dedicated scraping library (e.g., Cheerio, Puppeteer)
// - An external API (e.g., for YouTube video metadata, article summarization)
// - More robust error handling and content type detection

export async function analyzeUrlContent(url) {
  let title = 'Untitled Knowledge';
  let description = 'No description available.';
  let image_url = 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&h=600&fit=crop&q=80'; // Default image
  let content_type = 'unknown';

  try {
    // Basic check for video platforms
    if (url.includes('youtube.com/shorts') || url.includes('youtu.be/')) {
      content_type = 'video';
      // For YouTube, you'd typically use the YouTube Data API to get accurate metadata.
      // Here, we'll just try to fetch the page and parse meta tags as a fallback.
    } else if (url.includes('vimeo.com')) {
      content_type = 'video';
    } else {
      content_type = 'article'; // Assume article for other URLs
    }

    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extract title
    title = document.querySelector('meta[property="og:title"]')?.content ||
            document.querySelector('meta[name="twitter:title"]')?.content ||
            document.title ||
            title;

    // Extract description
    description = document.querySelector('meta[property="og:description"]')?.content ||
                  document.querySelector('meta[name="twitter:description"]')?.content ||
                  document.querySelector('meta[name="description"]')?.content ||
                  description;

    // Extract image URL
    image_url = document.querySelector('meta[property="og:image"]')?.content ||
                document.querySelector('meta[name="twitter:image"]')?.content ||
                image_url;

    // Refine content type based on actual page content if possible (e.g., presence of video tags)
    if (document.querySelector('video') && content_type === 'unknown') {
      content_type = 'video';
    } else if (document.querySelector('article') && content_type === 'unknown') {
      content_type = 'article';
    }

  } catch (error) {
    console.error(`Failed to analyze URL ${url}:`, error);
    // Fallback to default values if fetching or parsing fails
  }

  return { title, description, image_url, content_type };
}
