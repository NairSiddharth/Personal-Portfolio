import { NextResponse } from 'next/server';
import profile from '@/data/profile.json';

export const runtime = 'edge';

interface LetterboxdReview {
  tmdbId: number;
  reviewUrl: string;
  rating: number | null;
}

export async function GET() {
  try {
    const response = await fetch(`https://letterboxd.com/${profile.letterboxd}/rss/`);

    if (!response.ok) {
      throw new Error(`Letterboxd feed error: ${response.status}`);
    }

    const xml = await response.text();
    const items = xml.split('<item>').slice(1);

    const reviews: LetterboxdReview[] = items.flatMap((item) => {
      const tmdbId = item.match(/<tmdb:movieId>(\d+)<\/tmdb:movieId>/)?.[1];
      const reviewUrl = item.match(/<link>([^<]+)<\/link>/)?.[1];
      const rating = item.match(/<letterboxd:memberRating>([\d.]+)<\/letterboxd:memberRating>/)?.[1];

      if (!tmdbId || !reviewUrl) return [];

      return [{
        tmdbId: Number(tmdbId),
        reviewUrl,
        rating: rating ? Number(rating) : null,
      }];
    });

    return NextResponse.json({ reviews });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
