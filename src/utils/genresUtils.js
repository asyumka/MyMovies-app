const GENRES = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export function movieGenresToName(genreIds) {
  const movieGenresName = genreIds.map((id) => GENRES[id]);
  return movieGenresName;
}

export const GENRES_ARRAY = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Abenteuer",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Komödie",
  },
  {
    id: 80,
    name: "Krimi",
  },
  {
    id: 99,
    name: "Dokumentarfilm",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Familie",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "Historie",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Musik",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Liebesfilm",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV-Film",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "Kriegsfilm",
  },
  {
    id: 37,
    name: "Western",
  },
];
