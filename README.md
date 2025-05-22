# Movie Cast Game - Technical Test

## Project Description

This project is a simple API-based game where the user is asked to determine whether a specific actor played in a given movie. Each correct answer allows the user to continue playing. A single incorrect answer ends the game. The score corresponds to the number of correct answers in a row.

## Stack

-   Symfony 7 with API Platform
-   React + Vite + TypeScript + TailwindCSS
-   Docker / Docker Compose
-   Redis for temporary data storage
-   TMDB (The Movie Database) API for retrieving movies and actors
-   PHPUnit for unit and functional testing

## Getting Started

### Environment Setup

1. Copy the `.env.sample` file to create your local environment file:

    ```bash
    cp api/.env.sample api/.env
    ```

2. Edit `api/.env` and set your [TMDB API key](https://www.themoviedb.org/settings/api) in `TMDB_API_KEY`:

    ```dotenv
    TMDB_API_KEY=your_actual_tmdb_api_key_here
    ```

### Prerequisites

-   Docker
-   Docker Compose
-   pnpm (for frontend)

## Backend (API)

### Installation & Launch

1. Clone the repository:

    ```bash
    git clone https://github.com/marouanemkm/da-movie-quiz.git
    cd da-movie-quiz
    ```

2. Build and start the backend services:

    ```bash
    docker compose up -d --build
    ```

3. Install PHP dependencies inside the container:

    ```bash
    docker compose exec php composer install
    ```

4. Access the API at:

    - Swagger UI: [http://localhost/docs](http://localhost/docs)

### Available Services

| Service | Port | Description              |
| ------- | ---- | ------------------------ |
| api     | 80   | Symfony API server       |
| redis   | 6379 | Cache for game questions |

## Frontend (React)

### Installation & Launch

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

3. Start the development server:

    ```bash
    pnpm dev
    ```

4. The app will be available at:

    ```
    http://localhost:5173
    ```

Make sure the backend is running so the frontend can reach the API.

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

## Running Tests (Backend)

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
frontend/         # React application
  src/
  components/
  services/
  types/
docker-compose.yaml
README.md
```

## Notes

-   This backend is stateless.
-   No user session or persistence is stored beyond the current question.
-   TMDB API integration ensures dynamic and up-to-date movie data.

## License

This project was developed as part of a technical assessment. All rights reserved.
