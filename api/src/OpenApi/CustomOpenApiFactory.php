<?php

namespace App\OpenApi;

use ApiPlatform\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\OpenApi\OpenApi;
use ApiPlatform\OpenApi\Model;
use ArrayObject;

class CustomOpenApiFactory implements OpenApiFactoryInterface
{
    public function __construct(
        private OpenApiFactoryInterface $decorated
    ) {}

    public function __invoke(array $context = []): OpenApi
    {
        $openApi = $this->decorated->__invoke($context);
        $paths = $openApi->getPaths();

        $paths->addPath('/api/game/play', new Model\PathItem(
            get: new Model\Operation(
                operationId: 'getGameQuestion',
                tags: ['Game'],
                responses: [
                    '200' => [
                        'description' => 'Returns a movie + actor question',
                        'content' => new ArrayObject([
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'hash' => ['type' => 'string'],
                                        'movie' => ['type' => 'string'],
                                        'movieImage' => ['type' => 'string'],
                                        'actor' => ['type' => 'string'],
                                        'actorImage' => ['type' => 'string'],
                                    ]
                                ]
                            ]
                        ])
                    ]
                ]
            ),
            post: new Model\Operation(
                operationId: 'submitAnswer',
                tags: ['Game'],
                requestBody: new Model\RequestBody(
                    description: 'Submit answer',
                    content: new ArrayObject([
                        'application/json' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'hash' => ['type' => 'string'],
                                    'answer' => [
                                        'type' => 'string',
                                        'enum' => ['yes', 'no']
                                    ]
                                ]
                            ]
                        ]
                    ])
                ),
                responses: [
                    '200' => [
                        'description' => 'Returns whether the answer is correct',
                        'content' => new ArrayObject([
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'correct' => ['type' => 'boolean']
                                    ]
                                ]
                            ]
                        ])
                    ],
                    '400' => ['description' => 'Invalid request'],
                    '404' => ['description' => 'Question not found or expired'],
                ]
            )
        ));

        return $openApi;
    }
}
