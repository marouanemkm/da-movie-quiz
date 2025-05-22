<?php

namespace App\Service;

use Symfony\Component\Cache\Adapter\RedisAdapter;

class QuestionStore
{
    private \Redis $redis;
    private int $ttl;

    public function __construct(string $redisDsn)
    {
        $this->redis = RedisAdapter::createConnection($redisDsn);
        $this->ttl = 604800; // 7 jours
    }

    public function save(string $hash, string $answer): void
    {
        $this->redis->setex($hash, $this->ttl, $answer);
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
