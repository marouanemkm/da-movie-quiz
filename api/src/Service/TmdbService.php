<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class TmdbService
{
    private string $apiKey;
    private string $imageBase;

    public function __construct(
        private HttpClientInterface $httpClient,
        string $tmdbApiKey,
        string $imageBaseUrl
    ) {
        $this->apiKey = $tmdbApiKey;
        $this->imageBase = rtrim($imageBaseUrl, '/');
    }

    public function getRandomQuestion(): ?array
    {
        $shouldBeCorrect = random_int(0, 1) === 1;

        $movie = $this->getRandomMovie();
        if (!$movie) return null;

        $movieId = $movie['id'];
        $movieTitle = $movie['title'] ?? $movie['name'] ?? 'Unknown';
        $moviePoster = $movie['poster_path'] ? $this->imageBase . $movie['poster_path'] : null;

        $cast = $this->getMovieCast($movieId);
        if (!$cast) return null;

        if ($shouldBeCorrect) {
            $actor = $cast[array_rand($cast)];
        } else {
            do {
                $otherMovie = $this->getRandomMovie();
                $otherCast = $this->getMovieCast($otherMovie['id'] ?? 0);
            } while (!$otherCast || $otherMovie['id'] === $movieId);

            $actor = $otherCast[array_rand($otherCast)];
        }

        $actorName = $actor['name'] ?? 'Unknown';
        $actorImage = $actor['profile_path'] ? $this->imageBase . $actor['profile_path'] : null;

        return [
            'movie' => $movieTitle,
            'movieImage' => $moviePoster,
            'actor' => $actorName,
            'actorImage' => $actorImage,
            'correct' => $shouldBeCorrect
        ];
    }

    private function getRandomMovie(): ?array
    {
        $page = random_int(1, 500);
        $response = $this->httpClient->request('GET', 'https://api.themoviedb.org/3/movie/popular', [
            'query' => [
                'api_key' => $this->apiKey,
                'page' => $page
            ]
        ]);

        $data = $response->toArray(false);
        if (!isset($data['results']) || count($data['results']) === 0) {
            return null;
        }

        return $data['results'][array_rand($data['results'])];
    }

    private function getMovieCast(int $movieId): ?array
    {
        $response = $this->httpClient->request('GET', "https://api.themoviedb.org/3/movie/$movieId/credits", [
            'query' => [
                'api_key' => $this->apiKey
            ]
        ]);

        $data = $response->toArray(false);
        return $data['cast'] ?? null;
    }
}
