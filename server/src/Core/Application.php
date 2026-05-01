<?php
namespace Haseri\Backend\Core;

use Haseri\Backend\Shared\Exceptions\HttpException;

class Application
{
    public function run()
    {
        $this->handleRequest();
    }
    private function handleRequest()
    {
        try {
            $uri = $_SERVER['REQUEST_URI'];
            $method = $_SERVER['REQUEST_METHOD'];

            echo json_encode(['app' => 'Haseri API']);
            
        }
         catch (HttpException $e) {
            http_response_code($e->getStatusCode());
            echo json_encode(['error' => $e->getMessage()]);
        } catch (\Throwable $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Internal Server Error']);
        }

    }
}