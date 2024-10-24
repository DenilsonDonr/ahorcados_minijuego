<?php

function authMiddleware() {
    if (!isset($_SESSION['user'])) {
        header('HTTP/1.0 403 Forbidden');
        echo "No tienes acceso.";
        exit;
    }
}