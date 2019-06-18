<?php

namespace App\GraphQL\Queries;

class Hello
{
    public static function resolve(): string
    {
        return 'world';
    }
}
