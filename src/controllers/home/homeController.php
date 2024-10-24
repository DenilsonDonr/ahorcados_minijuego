<?php

namespace Jay\controllers\home;

class HomeController
{
    public function __construct()
    {
        require_once __DIR__ . '/../../views/home/index.php';
    }
}