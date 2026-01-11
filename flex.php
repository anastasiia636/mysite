<?php
$pageTitle = "Flexbox — Вариант 3";
include __DIR__ . "/partials/header.php";
?>

<h1>Задание Flexbox (Вариант 3)</h1>
<p>Элемент flexbox размером не более 200×200. Состояния: обычное, при наведении и при нажатии.</p>

<div class="flex-stage">
    <div class="flex-card" id="flexCard" tabindex="0">

        <!-- СТАТИЧНО -->
        <div class="state state-default">
        <img src="/mysite/assets/img/toy1.jpg" alt="Игрушки оптом">
        <div class="label">Игрушки оптом</div>
        </div>

        
        <div class="state state-hover">
        <img src="/mysite/assets/img/toy2.png" alt="Забегает мальчик">
        <div class="label">Забегает, замедляясь, мальчик</div>
        </div>

        <!-- КЛИК -->
        <div class="state state-click">
        <img src="/mysite/assets/img/toy5.png" alt="Вертушка">
            <div class="label">
                У мальчика в руках вертушка,<br>
                крутится вокруг своей оси, пока есть нажатие
            </div>
        </div>

    </div>
</div>

<script>
const card = document.getElementById('flexCard');

card.addEventListener('click', () => {
    card.classList.toggle('is-clicked');
});

card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('is-clicked');
    }
});
</script>

<?php include __DIR__ . "/partials/footer.php"; ?>
