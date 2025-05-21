<?php

namespace App\Controller;

use App\Service\QuestionStore;
use App\Service\TmdbService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class GameController
{
    #[Route('/api/game/play', methods: ['GET'])]
    public function getQuestion(QuestionStore $store, TmdbService $tmdb): JsonResponse
    {
        $question = $tmdb->getRandomQuestion();
        if (!$question) {
            return new JsonResponse(['error' => 'Could not fetch question'], 500);
        }

        $hash = md5(uniqid($question['movie'] . $question['actor'], true));
        $store->save($hash, $question['correct'] ? 'yes' : 'no');

        return new JsonResponse([
            'hash' => $hash,
            'movie' => $question['movie'],
            'movieImage' => $question['movieImage'],
            'actor' => $question['actor'],
            'actorImage' => $question['actorImage']
        ]);
    }

    #[Route('/api/game/play', methods: ['POST'])]
    public function submitAnswer(Request $request, QuestionStore $store): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $hash = $data['hash'] ?? null;
        $userAnswer = strtolower($data['answer'] ?? '');

        if (!$hash || !in_array($userAnswer, ['yes', 'no'])) {
            return new JsonResponse(['error' => 'Invalid request'], 400);
        }

        $expectedAnswer = $store->get($hash);

        if ($expectedAnswer === null) {
            return new JsonResponse(['error' => 'Question not found or expired'], 404);
        }

        $isCorrect = $userAnswer === strtolower($expectedAnswer);
        $store->delete($hash);

        return new JsonResponse(['correct' => $isCorrect]);
    }
}
