<?php
return [
    'max_size' => 5 * 1024 * 1024,
    'allowed_images' => ['jpg', 'jpeg', 'png'],
    'allowed_documents' => ['jpg', 'jpeg', 'png', 'pdf'],
    'paths' => [
        'ids' => 'storage/uploads/ids/',
        'documents' => 'storage/uploads/documents/',
        'profiles' => 'storage/uploads/profiles/',
        'jobs' => 'storage/uploads/jobs/',
         'covers' => 'storage/uploads/covers/',
    ],
];

#upload document configration