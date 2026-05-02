<?php
namespace Haseri\Backend\Modules\Jobs\Requests;

use Haseri\Backend\Shared\Exceptions\ValidationException;

class CreateJobRequest
{
    public function validate()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $errors = [];

        if (empty($data['title'])) {
            $errors['title'] = 'Title is required';
        } elseif (strlen($data['title']) < 4) {
            $errors['title'] = 'Title must be at least 4 characters';
        } elseif (strlen($data['title']) > 255) {
            $errors['title'] = 'Title must not exceed 255 characters';
        }

        if (!empty($data['description']) && strlen($data['description']) > 2000) {
            $errors['description'] = 'Description must not exceed 2000 characters';
        }

        if (empty($data['category_id'])) {
            $errors['category_id'] = 'Category is required';
        }

        if (empty($data['price'])) {
            $errors['price'] = 'Price is required';
        } elseif (!is_numeric($data['price']) || $data['price'] <= 0) {
            $errors['price'] = 'Price must be a positive number';
        }

        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        return $data;
    }
}