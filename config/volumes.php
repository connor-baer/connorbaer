<?php

return [
    'users' => [
        'path' => getenv('VOLUMES_BASE_PATH') . 'usr',
        'url' => getenv('VOLUMES_BASE_URL') . 'usr',
    ],
    'images' => [
        'path' => getenv('VOLUMES_BASE_PATH') . 'img',
        'url' => getenv('VOLUMES_BASE_URL') . 'img',
    ],
    'videos' => [
        'path' => getenv('VOLUMES_BASE_PATH') . 'vid',
        'url' => getenv('VOLUMES_BASE_URL') . 'vid',
    ],
    'documents' => [
        'path' => getenv('VOLUMES_BASE_PATH') . 'doc',
        'url' => getenv('VOLUMES_BASE_URL') . 'doc',
    ],
];
