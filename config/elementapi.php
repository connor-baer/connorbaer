<?php
/**
 * API for connorbaer.co
 *
 * The API follows the pattern: api/[section]/[entry]?[params]
 *
 * @link      https://connorbaer.co
 * @copyright Copyright (c) 2017 Connor Bär
 */

use craft\elements\Entry;
use craft\elements\Category;
use craft\elements\Tag;

return [
    'defaults' => [
        'paginate' => true,
        'elementsPerPage' => 80,
    ],

    'endpoints' => [
        'api/categories.json' => [
            'elementType' => Category::class,
            'criteria' => [
                'group' => 'recipes',
            ],
            'transformer' => function (Category $category) {
                return [
                    'title' => $category->title,
                    'id' => $category->id,
                ];
            },
        ],

        'api/food/recipes.json' => [
            'elementType' => Entry::class,
            'criteria' => [
                'section' => 'food',
                'orderBy' => 'title',
            ],
            'transformer' => function (Entry $entry) {
                $measure = Craft::$app->request->getQueryParam('measure');
                $people = Craft::$app->request->getQueryParam('people');

                $ingredients = [];

                $tags = [];

                foreach ($entry['recipe']->getIngredients($measure, $people) as $ingredient) {
                    $ingredients[] = $ingredient;
                }

                foreach ($entry['tags_recipe'] as $tag) {
                    $tags[] = $tag['title'];
                }

                return [
                    'title' => $entry['title'],
                    'description' => $entry['recipe']['description'],
                    'image' => $entry['recipe']->getImageUrl(),
                    'tags' => implode(', ', $tags),
                    'ingredients' => $ingredients,
                    'skill' => $entry['recipe']['skill'],
                    'totalTime' => $entry['recipe']['totalTime'],
                    'slug' => $entry['slug'],
                ];
            }
        ],

        'api/food/recipe/<recipeSlug:{slug}>.json' => function ($recipeSlug) {
            return [
                'elementType' => Entry::class,
                'criteria' => [
                    'slug' => $recipeSlug,
                    'section' => 'food',
                ],
                'transformer' => function (Entry $entry) {
                    $measure = Craft::$app->request->getQueryParam('measure');
                    $people = Craft::$app->request->getQueryParam('people');

                    $ingredients = [];
                    $directions = [];

                    $tags = [];

                    foreach ($entry['recipe']->getIngredients($measure, $people) as $ingredient) {
                        $ingredients[] = $ingredient;
                    }

                    foreach ($entry['recipe']->getDirections() as $direction) {
                        $directions[] = $direction;
                    }

                    foreach ($entry['tags_recipe'] as $tag) {
                        $tags[] = $tag['title'];
                    }

                    return [
                        'title' => $entry['title'],
                        'description' => $entry['recipe']['description'],
                        'image' => $entry['recipe']->getImageUrl(),
                        'tags' => implode(', ', $tags),
                        'ingredients' => $ingredients,
                        'directions' => $directions,
                        'skill' => $entry['recipe']['skill'],
                        'totalTime' => $entry['recipe']['totalTime'],
                        'slug' => $entry['slug'],
                    ];
                },
            ];
        }
    ]
];
