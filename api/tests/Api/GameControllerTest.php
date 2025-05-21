<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class GameControllerTest extends WebTestCase
{
    public function testGetQuestion(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/game/play');

        $this->assertResponseIsSuccessful();

        $data = json_decode($client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('hash', $data);
        $this->assertArrayHasKey('movie', $data);
        $this->assertArrayHasKey('actor', $data);
        $this->assertArrayHasKey('movieImage', $data);
        $this->assertArrayHasKey('actorImage', $data);
    }

    public function testSubmitAnswerCorrect(): void
    {
        $client = static::createClient();

        // Get a question first
        $client->request('GET', '/api/game/play');
        $data = json_decode($client->getResponse()->getContent(), true);

        $client->request('POST', '/api/game/play', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'hash' => $data['hash'],
            'answer' => 'yes' // ou 'no', on ne peut pas savoir à l'avance si c'est juste
        ]));

        $this->assertResponseIsSuccessful();

        $result = json_decode($client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('correct', $result);
        $this->assertIsBool($result['correct']);
    }

    public function testSubmitAnswerInvalidHash(): void
    {
        $client = static::createClient();

        $client->request('POST', '/api/game/play', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'hash' => 'fakehash123',
            'answer' => 'yes'
        ]));

        $this->assertResponseStatusCodeSame(404);
    }

    public function testSubmitAnswerBadRequest(): void
    {
        $client = static::createClient();

        $client->request('POST', '/api/game/play', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'hash' => '',
            'answer' => 'maybe'
        ]));

        $this->assertResponseStatusCodeSame(400);
    }
}
