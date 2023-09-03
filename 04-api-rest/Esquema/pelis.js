import z from "zod";

const Esq = z.object({
  title: z.string({
    invalid_type_error: "invalid title",
    required_error: "required movie title",
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url({
    message: "Must be a url",
  }),
  genre: z.array(
    z.enum([
      "Adventure",
      "Sci-Fi",
      "Action",
      "Crime",
      "Drama",
      "Romance",
      "Fantasy",
      "Biography",
    ]),
    {
      required_error: "EY EY EY",
      invalid_type_error: "Invalid type",
    }
  ),
  rate: z.number().min(0).max(10).default(0),
});

export function ValidarPeliculas(input) {
  return Esq.safeParse(input);
}

export function ValidarPeliculasParcial(input) {
  return Esq.partial().safeParse(input);
}