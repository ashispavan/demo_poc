/**
 * Converts URLs in text to HTML anchor tags
 */
export function parseLinks(text: string): string {
  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|(\[([^\]]+)\]$$([^)]+)$$)/g

  // Replace URLs with HTML anchor tags
  return text.replace(urlRegex, (match, url1, url2, markdownLink, linkText, linkUrl) => {
    // Handle markdown-style links [text](url)
    if (markdownLink) {
      return `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-700">${linkText}</a>`
    }

    // Handle regular URLs
    const url = url1 || (url2 ? `https://${url2}` : match)
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-700">${match}</a>`
  })
}

/**
 * Parses custom link syntax in text
 * Example: "Check out this [link](https://example.com)"
 */
export function parseCustomLinks(text: string): string {
  // Match pattern: "text [link text](url) more text"
  const customLinkRegex = /\[([^\]]+)\]$$([^)]+)$$/g

  return text.replace(customLinkRegex, (match, linkText, url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-700">${linkText}</a>`
  })
}

