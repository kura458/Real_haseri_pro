<?php
namespace Haseri\Backend\Shared\Helpers\Upload;

use Haseri\Backend\Shared\Exceptions\ValidationException;

class ImageUploader
{
    private $config;

    public function __construct()
    {
        $this->config = require __DIR__ . '/../../../Config/upload.php';
    }

    public function upload($file, $type)
    {
        if (!isset($this->config['paths'][$type])) {
            throw new ValidationException(['file' => 'Invalid upload type']);
        }

        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

        if (!in_array($extension, $this->config['allowed_images'])) {
            throw new ValidationException(['file' => 'Invalid image type. Allowed: ' . implode(', ', $this->config['allowed_images'])]);
        }

        if ($file['size'] > $this->config['max_size']) {
            throw new ValidationException(['file' => 'Image too large. Max: ' . ($this->config['max_size'] / 1024 / 1024) . 'MB']);
        }

        $fileName = uniqid() . '_' . time() . '.' . $extension;
        $destination = __DIR__ . '/../../../../' . $this->config['paths'][$type] . $fileName;

        if (!move_uploaded_file($file['tmp_name'], $destination)) {
            throw new ValidationException(['file' => 'Failed to upload image']);
        }

        return $this->config['paths'][$type] . $fileName;
    }
}