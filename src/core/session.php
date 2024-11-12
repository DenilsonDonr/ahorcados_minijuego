<?php

namespace Jay\core;

class Session
{
    public function __construct()
    {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
    }

    public function setUser($user)
    {
        $_SESSION['user'] = $user;
    }

    public function getUser()
    {
        return isset($_SESSION['user']) ? $_SESSION['user'] : null;
    }

    public function logout()
    {
        session_unset();
        session_destroy();
    }
}