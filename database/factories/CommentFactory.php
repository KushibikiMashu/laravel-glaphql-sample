<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Comment;
use App\Post;
use Faker\Generator as Faker;

$factory->define(Comment::class, function (Faker $faker) {
    return [
        'post_id' => $faker->numberBetween(1, Post::count()),
        'reply' => $faker->text(20),
    ];
});
