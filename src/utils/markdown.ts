import Token from 'markdown-it/lib/token';
import * as MarkdownIt from 'markdown-it';

export type UnresolvedImages = Record<string, { alt: string, reason: string }>;

export async function parseMarkdown(s: string) {
  const unresolvedImages: UnresolvedImages = {};
  async function addImage(token: Token) {
    if(token.type==='image') {
      const url = token.attrs[0][1];
      const alt = token.children[0].content;
      if(url.startsWith('//') || url.startsWith('http')) {
        await fetch(url).catch(() => {
          unresolvedImages[url] = {
            alt,
            reason: 'Unable to resolve. Blocked by CORS or other reason.'
          };
        });
      } else {
        unresolvedImages[url] = {
          alt, 
          reason: 'Not a valid url.'
        }
      }
    }
    if(token.children) 
      await Promise.all(token.children.map(addImage))
  }
  await Promise.all(MarkdownIt().parse(s, {}).map(addImage));
  return unresolvedImages;
}