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

        'api/categories/<categoryGroup:{slug}>.json' => function ($categoryGroup) {
            return [
                'elementType' => Category::class,
                'criteria' => [
                    'group' => $categoryGroup,
                    'level' => 1,
                    'with' => ['children.children']
                ],
                'transformer' => function (Category $category) {
                    $categorySlug = $category->slug;

                    $data = [
                        $categorySlug => [],
                    ];

                    $children = $category->getChildren();

                    if ($children) {
                        foreach ($children as $child) {
                            $data[$categorySlug][] = $child->title;
                        }
                    }

                    return $data;
                }
            ];
        },

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

                $labels = [];

                foreach ($entry['recipe']->getIngredients($measure, $people) as $ingredient) {
                    $ingredients[] = $ingredient;
                }

                foreach ($entry['labels'] as $label) {
                    $labels[] = $label['title'];
                }

                return [
                    'title' => $entry['title'],
                    'description' => $entry['recipe']['description'],
                    'image' => $entry['recipe']->getImageUrl(),
                    'labels' => implode(', ', $labels),
                    'ingredients' => $ingredients,
                    'skill' => ucfirst($entry['recipe']['skill']),
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

                    foreach ($entry['recipe']->getIngredients($measure, $people) as $ingredient) {
                        $ingredients[] = html_entity_decode($ingredient);
                    }

                    foreach ($entry['recipe']->getDirections() as $direction) {
                        $directions[] = $direction;
                    }

                    return [
                        'title' => $entry['title'],
                        'description' => $entry['recipe']['description'],
                        'image' => $entry['recipe']->getImageUrl(),
                        'ingredients' => $ingredients,
                        'directions' => $directions,
                        'skill' => ucfirst($entry['recipe']['skill']),
                        'totalTime' => $entry['recipe']['totalTime'],
                        'slug' => $entry['slug'],
                    ];
                },
            ];
        }
    ]
];
