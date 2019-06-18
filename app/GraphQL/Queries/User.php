<?php

namespace App\GraphQL\Queries;

use App\User as U;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class User
{
    /**
     * Return a value for the field.
     *
     * @param  \App\User  $user
     * @param  mixed[]  $args The arguments that were passed into the field.
     * @param  \Nuwave\Lighthouse\Support\Contracts\GraphQLContext  $context Arbitrary data that is shared between all fields of a single query.
     * @param  \GraphQL\Type\Definition\ResolveInfo  $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     * @return mixed
     */
    public function resolve(U $user, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return $user;
    }
}
