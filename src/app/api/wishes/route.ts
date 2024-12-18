import { NextResponse } from 'next/server';
import { load } from 'cheerio';

export async function GET() {
  try {
    const response = await fetch('https://www.wunschpate.de/wuensche/');
    if (!response.ok) throw new Error('Failed to fetch the page');

    const html = await response.text();
    const $ = load(html);

    const wishlist: { name: string; shortDescription: string; description: string }[] = [];
    $('.wishlisting-nopad').each((_, element) => {
      const name = $(element).find('h2').text().trim();
      const shortDescription = $(element).find('h3').text().trim();
      const description = $(element).find('p').text().trim();

      wishlist.push({ name, shortDescription, description });
    });

    return NextResponse.json(wishlist);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to scrape the wishlist data' }, { status: 500 });
  }
}
