<?php

namespace App\Service;

use Symfony\Component\Cache\Adapter\RedisAdapter;

class QuestionStore
{
    private \Redis $redis;

    public function __construct(string $redisDsn)
    {
        $this->redis = RedisAdapter::createConnection($redisDsn);
    }

    public function save(string $hash, string $answer, int $ttl = 300): void
    {
        $this->redis->setex($hash, $ttl, $answer);
    }

    public function get(string $hash): ?string
    {
        return $this->redis->get($hash) ?: null;
    }

    public function delete(string $hash): void
    {
        $this->redis->del([$hash]);
    }
}
