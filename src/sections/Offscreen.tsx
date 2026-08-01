"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Film, Camera, Heart, Music, AlertTriangle, ExternalLink, Star } from "lucide-react";
import moviesWatched from "@/data/movies.json";
import booksRead from "@/data/books.json";

// Component to fetch and display movie poster
const MoviePoster = ({ tmdbId, title }: { tmdbId: number, title: string }) => {
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const response = await fetch(`/api/tmdb-poster?id=${tmdbId}`);
        const data = await response.json();

        if (data.posterUrl) {
          setPosterUrl(data.posterUrl);
        }
      } catch (error) {
        console.error('Failed to fetch movie poster:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoster();
  }, [tmdbId]);

  if (loading) {
    return <div className="w-full aspect-[2/3] bg-muted animate-pulse rounded" />;
  }

  if (posterUrl) {
    return (
      <div className="relative w-full aspect-[2/3] bg-muted rounded overflow-hidden flex items-center justify-center">
        <Image
          src={posterUrl}
          alt={`${title} poster`}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain"
        />
      </div>
    );
  }

  // Fallback placeholder
  return (
    <div className="w-full aspect-[2/3] bg-muted rounded flex items-center justify-center">
      <Film className="w-8 h-8 text-muted-foreground" />
    </div>
  );
};

// Component to display book cover
const BookCover = ({ isbn, title }: { isbn: number, title: string }) => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="w-full h-40 bg-muted rounded flex items-center justify-center">
        <Book className="w-8 h-8 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-40">
      <Image
        src={`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`}
        alt={`${title} cover`}
        fill
        sizes="112px"
        className="object-cover rounded"
        onError={() => setImageError(true)}
      />
    </div>
  );
};

// Updated SpotifyTopTracks component for Offscreen.tsx
// Replace the existing SpotifyTopTracks component in your Offscreen.tsx file

const SpotifyTopTracks = () => {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/spotify-top-tracks');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        // Extract tracks from Spotify API response
        setTracks(data.items || []);
        
      } catch (error) {
        console.error('Error fetching Spotify tracks:', error);
        setError(error instanceof Error ? error.message : 'Failed to load tracks');
        
        // Fallback to mock data if API fails
        const mockTracks = [
          {
            name: "Flowers",
            artists: [{ name: "Miley Cyrus" }],
            album: {
              name: "Endless Summer Vacation",
              images: [{ url: "https://i.scdn.co/image/ab67616d00001e02b9b5e18e5a6e0e62e0a8b3c0" }]
            }
          },
          {
            name: "Kill Bill",
            artists: [{ name: "SZA" }],
            album: {
              name: "SOS",
              images: [{ url: "https://i.scdn.co/image/ab67616d00001e02e3c0a7e8e6b92c3e5dc5db17" }]
            }
          },
          {
            name: "Unholy",
            artists: [{ name: "Sam Smith" }, { name: "Kim Petras" }],
            album: {
              name: "Gloria",
              images: [{ url: "https://i.scdn.co/image/ab67616d00001e027d9fe17c3d8e9b5e1e0d5f7e" }]
            }
          },
          {
            name: "As It Was",
            artists: [{ name: "Harry Styles" }],
            album: {
              name: "Harry's House",
              images: [{ url: "https://i.scdn.co/image/ab67616d00001e02b46f74097655d7f353caab14" }]
            }
          },
          {
            name: "Anti-Hero",
            artists: [{ name: "Taylor Swift" }],
            album: {
              name: "Midnights",
              images: [{ url: "https://i.scdn.co/image/ab67616d00001e02e0b60c608586d88252b8fbc0" }]
            }
          }
        ];
        setTracks(mockTracks);
      } finally {
        setLoading(false);
      }
    };

    fetchTopTracks();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="aspect-square bg-muted animate-pulse rounded-lg" />
            <div className="h-4 bg-muted animate-pulse rounded" />
            <div className="h-3 bg-muted animate-pulse rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (error && tracks.length === 0) {
    return (
      <div className="text-center py-8">
        <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Unable to load Spotify tracks</p>
        <p className="text-sm text-muted-foreground mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {error && (
        <div className="text-sm text-yellow-600 bg-yellow-50 p-2 rounded border border-yellow-200 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          Using fallback data: {error}
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {tracks.map((track, index) => (
          <Card key={track.id || index} className="overflow-hidden hover:shadow-lg transition-all group">
            <div className="relative aspect-square">
              <img 
                src={track.album.images[0]?.url || "/placeholder-album.jpg"}
                alt={`${track.album.name} cover`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 left-2 right-2">
                  <Music className="w-4 h-4 text-white/80" />
                </div>
              </div>
            </div>
            <CardContent className="p-3 space-y-1">
              <h4 className="font-semibold text-sm line-clamp-1" title={track.name}>
                {track.name}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-1" title={track.artists.map((a: any) => a.name).join(', ')}>
                {track.artists.map((a: any) => a.name).join(', ')}
              </p>
              <p className="text-xs text-muted-foreground/70 line-clamp-1" title={track.album.name}>
                {track.album.name}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const internshipPhotos = [
  { src: "/863.webp", alt: "Internship First Day - 1st summer", company: "JPMorganChase", location: "Houston, TX" },
  { src: "/1339.webp", alt: "Returning Interns @ Minigolf - 2nd summer", company: "JPMorganChase", location: "Houston, TX" },
  { src: "/1355.webp", alt: "End of Internship Presentation - 2nd summer", company: "JPMorganChase", location: "Houston, TX" },
  { src: "/1361.webp", alt: "Pic. w/ other interns on our floor - 2nd summer", company: "JPMorganChase", location: "Houston, TX" },
  { src: "/1591.webp", alt: "End of Internship Celebration - 3rd summer pt. 2", company: "JPMorganChase", location: "Houston, TX" },
  { src: "/IMG_3357.webp", alt: "Intern Partners - 4th summer", company: "JPMorganChase", location: "Plano, TX" },
  { src: "/IMG_5624.webp", alt: "Pickleball w/ Interns - 4th summer", company: "JPMorganChase", location: "Plano, TX" },
  { src: "/IMG_5636.webp", alt: "Final Supper w/ Interns - 4th summer", company: "JPMorganChase", location: "Plano, TX" },
  { src: "/TFKU7150.webp", alt: "Internship Group - 4th summer", company: "JPMorganChase", location: "Plano, TX" },
];

const lifeAdventurePhotos = [
  { src: "/IMG_4905.webp", alt: "Best bowl ramen I've had to this day, mala sensation goes crazy", location: "Ooink Ramen", description: "Best bowl ramen I've had to this day, mala sensation goes crazy" },
  { src: "/IMG_5118.webp", alt: "Pretty baseball park", location: "T-Mobile Park", description: "Pretty baseball park" },
  { src: "/IMG_5133.webp", alt: "Watching the Mariners", location: "T-Mobile Park", description: "Watching the Mariners" },
  { src: "/IMG_5326.webp", alt: "Some days the view made the hours worthwhile", location: "Penberthy Fields", description: "Some days the view made the hours worthwhile" },
  { src: "/IMG_5359.webp", alt: "Look Mom I'm a Photographer Pt. 1", location: "Zach. Engineering Building 1", description: "Look Mom I'm a Photographer Pt. 1" },
  { src: "/IMG_5360.webp", alt: "Look Mom I'm a Photographer Pt. 2", location: "Zach. Engineering Building 2", description: "Look Mom I'm a Photographer Pt. 2" },
  { src: "/IMG_5401.webp", alt: "Day in the life of Sid the referee", location: "Penberthy Fields", description: "Day in the life of Sid the referee" },
  { src: "/IMG_5409.webp", alt: "Panorama of sea from Pike Place overview", location: "Panoramic Seattle Seascape", description: "Panorama of sea from Pike Place overview" },
  { src: "/IMG_5433.webp", alt: "Looking back at Seattle on way to Bainbridge Island", location: "Seattle Skyline", description: "Looking back at Seattle on way to Bainbridge Island" },
  { src: "/IMG_5444.webp", alt: "3rd Best ramen I've had", location: "Ramen Danbo", description: "3rd Best ramen I've had" },
  { src: "/IMG_5453.webp", alt: "Nice ambience at Pike Place after eating @ Pink Door", location: "Pike Place", description: "Nice ambience at Pike Place after eating @ Pink Door" },
  { src: "/IMG_5498.webp", alt: "Best Pizza I've had, sicilian style pies are the way to go", location: "Dino's Tomato Pie", description: "Best Pizza I've had, sicilian style pies are the way to go" },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const fillPercent = Math.max(0, Math.min(1, rating - (star - 1))) * 100;
        return (
          <div key={star} className="relative w-4 h-4">
            <Star className="absolute inset-0 w-4 h-4 text-gray-300" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercent}%` }}
            >
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Deterministic pseudo-random value in [0, 1) from an integer seed.
// Using a hashed sine instead of Math.random() keeps each photo's scatter
// stable across re-renders and avoids SSR/client hydration mismatches.
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const getScatterStyle = (index: number) => {
  const rotation = (seededRandom(index * 3.17 + 1) - 0.5) * 12; // ~-6deg to 6deg
  const offsetX = (seededRandom(index * 7.53 + 2) - 0.5) * 20; // ~-10px to 10px
  const offsetY = (seededRandom(index * 5.11 + 3) - 0.5) * 20; // ~-10px to 10px
  return { rotation, offsetX, offsetY };
};

// Photo collage component
const PhotoCollage = ({
  photos,
  title,
  icon: Icon,
}: {
  photos: any[],
  title: string,
  icon: any,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-heading font-semibold">{title}</h3>
      </div>

      <div
        className="relative bg-gradient-to-br from-muted/20 to-muted/5 rounded-xl p-6 select-none"
        onContextMenu={(e) => e.preventDefault()}
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {photos.map((photo, index) => {
            const { rotation, offsetX, offsetY } = getScatterStyle(index);
            const isHovered = hoveredIndex === index;
            const transform = isHovered
              ? "scale(1.06) rotate(0deg)"
              : `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg)`;

            return (
              <div
                key={index}
                className="relative aspect-[4/3] cursor-pointer"
                style={{ zIndex: isHovered ? 200 : index + 1 }}
                onClick={() => setSelectedPhoto(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="absolute inset-0 bg-white p-1.5 shadow-lg hover:shadow-2xl transition-[transform,box-shadow] duration-300"
                  style={{ transform }}
                >
                  <div
                    className="w-full h-4/5 overflow-hidden bg-muted relative"
                    draggable="false"
                  >
                    <div className="absolute inset-0 z-10" style={{ pointerEvents: 'none' }}></div>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-cover pointer-events-none select-none"
                      draggable={false}
                      onDragStart={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                      style={{ userSelect: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
                      onError={(e) => {
                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f3f4f6'/%3E%3Ctext x='150' y='100' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='sans-serif' font-size='12'%3EPhoto%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <div className="h-1/5 flex items-center justify-center px-1">
                    <div className="text-center">
                      <p className="text-[10px] font-semibold text-gray-800 truncate px-1">
                        {photo.location}
                      </p>
                    </div>
                  </div>
                </div>

                {(index % 3 === 0) && (
                  <div className="absolute -top-2 -right-2 w-6 h-3 bg-yellow-200 opacity-70 rotate-45 shadow-sm"></div>
                )}
                {(index % 3 === 1) && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-300 opacity-60 shadow-sm"></div>
                )}
                {(index % 3 === 2) && (
                  <div className="absolute -bottom-1 -left-1 w-5 h-2 bg-blue-200 opacity-60 -rotate-12 shadow-sm"></div>
                )}
              </div>
            );
          })}
        </div>

        <div className="pointer-events-none">
          <div className="absolute top-12 right-16 w-2 h-2 bg-primary/30 rounded-full"></div>
          <div className="absolute bottom-16 left-12 w-2 h-2 bg-secondary/40 rounded-full"></div>
          <div className="absolute top-0 right-0 w-12 h-12 bg-yellow-100/50 opacity-70 rotate-45 transform translate-x-6 -translate-y-6"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-100/30 opacity-60 rotate-45 transform -translate-x-8 translate-y-8"></div>
        </div>
      </div>

      {selectedPhoto !== null && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 select-none"
          onClick={() => setSelectedPhoto(null)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="relative max-w-4xl max-h-full">
            <div className="absolute inset-0 z-10" style={{ pointerEvents: 'auto' }} onClick={() => setSelectedPhoto(null)}></div>
            <img
              src={photos[selectedPhoto].src}
              alt={photos[selectedPhoto].alt}
              className="max-w-full max-h-full object-contain rounded-lg pointer-events-none select-none"
              draggable="false"
              onDragStart={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-20"
              onClick={() => setSelectedPhoto(null)}
            >
              ×
            </button>
            <div className="absolute bottom-4 left-4 text-white z-20 pointer-events-none">
              <h3 className="text-xl font-semibold">{photos[selectedPhoto].location}</h3>
              <p className="text-sm opacity-80">{photos[selectedPhoto].alt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface LetterboxdReview {
  tmdbId: number;
  reviewUrl: string;
  rating: number | null;
}

export default function Personal() {
  const [letterboxdReviews, setLetterboxdReviews] = useState<Record<number, LetterboxdReview>>({});

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/letterboxd-reviews');
        const data = await response.json();

        if (data.reviews) {
          const byTmdbId: Record<number, LetterboxdReview> = {};
          for (const review of data.reviews as LetterboxdReview[]) {
            byTmdbId[review.tmdbId] = review;
          }
          setLetterboxdReviews(byTmdbId);
        }
      } catch (error) {
        console.error('Failed to fetch Letterboxd reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Beyond the Code</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A glimpse into my life outside of programming - the movies and books I've consumed this year, 
          and special memories from my incredible work experiences and general life adventures!
        </p>
      </div>

      {/* Movies Section with Posters */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Film className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-heading font-semibold">Movies I've Watched This Year</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {moviesWatched.map((movie, index) => {
            const review = letterboxdReviews[movie.id];

            return (
              <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                <CardContent className="p-0">
                  <MoviePoster tmdbId={movie.id} title={movie.title} />
                </CardContent>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{movie.title}</CardTitle>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">{movie.genre}</Badge>
                    <span className="text-xs text-muted-foreground">{movie.year}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-2">
                  <StarRating rating={review?.rating ?? movie.rating} />
                  {review && (
                    <a
                      href={review.reviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Read my review on Letterboxd
                    </a>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Books Section with Covers */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Book className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-heading font-semibold">Books I've Read This Year</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {booksRead.map((book, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="flex gap-4 p-4">
                <div className="w-28 flex-shrink-0">
                  <BookCover isbn={book.isbn} title={book.title} />
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold text-base">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">by {book.author}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <Badge variant="outline" className="text-xs">{book.category}</Badge>
                    <StarRating rating={book.rating} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Music Section - Spotify Top Tracks */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Music className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-heading font-semibold">Tracks I've Been Vibing To</h2>
          <span className="text-sm text-muted-foreground">(My Top 5 - Medium Term)</span>
        </div>
        
        <SpotifyTopTracks />
      </section>

      {/* Photo Collages Section - Side by Side */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 justify-center">
          <Camera className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-heading font-semibold">Memory Boards</h2>
          <Heart className="w-6 h-6 text-primary" />
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <PhotoCollage
            photos={internshipPhotos}
            title="Internship Memories"
            icon={Camera}
          />

          <PhotoCollage
            photos={lifeAdventurePhotos}
            title="Life Adventures"
            icon={Heart}
          />
        </div>
      </section>
    </div>
  );
}