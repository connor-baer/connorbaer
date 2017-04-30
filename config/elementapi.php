<?php

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
        'api/recipes.json' => [
            'elementType' => Entry::class,
            'criteria' => [
                'section' => 'recipes',
                'orderBy' => 'title',
            ],
            'transformer' => function (Entry $entry) {
                return [
                    'title' => $entry['title'],
                    'college' => $entry['blogCollege'][0]['title'],
                    'url' => $entry['blogLink'],
                    'countries' => implode(', ', $blogCountries),
                    'languages' => implode(', ', $blogLanguages),
                    'year' => $entry['blogYear'],
                ];
            },
        ]
    ]
];
