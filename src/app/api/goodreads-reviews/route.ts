import { NextResponse } from 'next/server';

export const runtime = 'edge';

interface GoodreadsReview {
  isbn: string;
  reviewUrl: string;
  rating: number | null;
}

// Extracts a tag's text content, whether or not it's CDATA-wrapped.
function extractTag(item: string, tag: string): string | undefined {
  const cdataMatch = item.match(new RegExp(`<${tag}>\\s*<!\\[CDATA\\[([^\\]]*)\\]\\]>\\s*</${tag}>`));
  if (cdataMatch) return cdataMatch[1].trim();

  const plainMatch = item.match(new RegExp(`<${tag}>([^<]*)</${tag}>`));
  return plainMatch?.[1]?.trim();
}

export async function GET() {
  // Not wired up yet: no Goodreads account/user ID configured. Once
  // GOODREADS_USER_ID is set, this route will start returning real data
  // without any other code changes needed.
  const userId = process.env.GOODREADS_USER_ID;

  if (!userId) {
    return NextResponse.json({ reviews: [] });
  }

  try {
    const response = await fetch(`https://www.goodreads.com/review/list_rss/${userId}?shelf=read`);

    if (!response.ok) {
      throw new Error(`Goodreads feed error: ${response.status}`);
    }

    const xml = await response.text();
    const items = xml.split('<item>').slice(1);

    const reviews: GoodreadsReview[] = items.flatMap((item) => {
      const isbn = extractTag(item, 'isbn');
      const reviewUrl = extractTag(item, 'link');
      const ratingRaw = extractTag(item, 'user_rating');

      if (!isbn || !reviewUrl) return [];

      const rating = ratingRaw ? Number(ratingRaw) : null;

      return [{
        isbn,
        reviewUrl,
        rating: rating && rating > 0 ? rating : null,
      }];
    });

    return NextResponse.json({ reviews });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
