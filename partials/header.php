<?php
if (!isset($pageTitle)) {
    $pageTitle = "Учебный портал";
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title><?= $pageTitle ?? 'Учебный портал' ?></title>
    <link rel="stylesheet" href="/mysite/assets/css/style.css">


<link rel="stylesheet" href="/mysite/assets/css/flex.css">
<link rel="stylesheet" href="/mysite/assets/css/pic.css">




</head>

<body>

<header class="site-header">
    <div class="container header-inner">
        <a href="/mysite/index.php" class="logo">
            <div class="logo-shape">
                <span class="logo-text">WP</span>
            </div>
            <span class="logo-title">WebPortal</span>
        </a>

        <nav class="main-nav">
            <ul>
                <li><a href="/mysite/index.php">Главная</a></li>
                <li><a href="/mysite/tasks.php">Задания</a></li>
                <li><a href="/mysite/coursework.php">Курсовая</a></li>
                <li><a href="/mysite/coursework.php">Flexbox</a></li>
            </ul>
        </nav>
    </div>
</header>

<main class="site-main">
    <div class="container">

