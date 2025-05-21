# Movie Cast Game - Technical Test

## Project Description

This project is a simple API-based game where the user is asked to determine whether a specific actor played in a given movie. Each correct answer allows the user to continue playing. A single incorrect answer ends the game. The score corresponds to the number of correct answers in a row.

## Stack

-   Symfony 7 with API Platform
-   Docker / Docker Compose
-   Redis for temporary data storage
-   TMDB (The Movie Database) API for retrieving movies and actors
-   PHPUnit for unit and functional testing

## Getting Started

### Prerequisites

-   Docker
-   Docker Compose

### Installation & Launch

1. Clone the repository:

    ```bash
    git clone https://github.com/your-repo/movie-cast-game.git
    cd movie-cast-game
    ```

2. Launch the services:

    ```bash
    docker compose up --build
    ```

    Wait until the message `FrankenPHP started` is displayed.

### Available Services

| Service | Port   | Description              |
| ------- | ------ | ------------------------ |
| php     | 80/443 | Symfony API server       |
| redis   | 6379   | Cache for game questions |

## API Documentation

Once the containers are up, access the documentation at:

-   Swagger UI: [http://localhost/docs](http://localhost/docs)

## API Endpoints

### `GET /api/game/play`

Returns a new question containing:

-   A movie name and its image URL
-   An actor name and its image URL
-   A unique question hash

### `POST /api/game/play`

Accepts a response to a previously received question.

Request body:

```json
{
    "hash": "string",
    "answer": "yes" // or "no"
}
```

Response:

```json
{
    "correct": true // or false
}
```

## Running Tests

Execute the following command inside the PHP container:

```bash
docker compose exec php ./vendor/bin/phpunit
```

The test suite includes:

-   Functional tests for the API endpoints
-   Unit tests for Redis-based question storage service

## File Structure

```
api/              # Symfony application
  src/
  config/
  tests/          # PHPUnit test files
  public/
  ...
docker-compose.yaml
README.md
```

## Notes

-   This backend is stateless.
-   No user session or persistence is stored beyond the current question.
-   TMDB API integration ensures dynamic and up-to-date movie data.

## License

This project was developed as part of a technical assessment. All rights reserved.
