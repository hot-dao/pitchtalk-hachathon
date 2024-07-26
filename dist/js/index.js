window.onload = function() {
    $('.blog-list').masonry({
        itemSelector: '.blog-list__item',
        gutter: 24,
    });
};

// FAQ Toggle
document.addEventListener("DOMContentLoaded", function () {
    const asks = Array.from(document.querySelectorAll(".ask-block"));

    // Initialize each ask-block height
    asks.forEach(el => {
        const header = el.querySelector(".ask-block-header");
        const body = el.querySelector(".ask-block-body");
        const headerBox = header.getBoundingClientRect();
        el.style.height = `${headerBox.height}px`;
        body.style.display = "none"; // Hide all bodies initially
    });

    asks.forEach((el) => {
        el.querySelector(".ask-block-header").addEventListener("click", () => {
            const header = el.querySelector(".ask-block-header");
            const body = el.querySelector(".ask-block-body");
            const headerBox = header.getBoundingClientRect();

            const isOpen = el.classList.contains("open");
            if (!isOpen) {
                body.style.display = "block";
                const height = body.scrollHeight;
                el.style.height = `${headerBox.height + height}px`;
                el.classList.add("open");
            } else {
                el.style.height = `${headerBox.height}px`;
                setTimeout(() => {
                    body.style.display = "none"; // Hide the body after animation
                    el.classList.remove("open");
                }, 300); // Adjust the timeout to match the transition duration
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const burgerClosetButton = document.querySelector(".burger-closet");
    const burgerOpenButton = document.querySelector(".burger-open");
    const headerBlock = document.querySelector(".menu");
    const body = document.body;

    // По клику на кнопку открываем меню
    burgerClosetButton.addEventListener("click", function () {
        headerBlock.classList.add("active");
        body.classList.add("overflow-hidden");
    });

    // По клику на кнопку закрываем меню
    burgerOpenButton.addEventListener("click", function () {
        headerBlock.classList.remove("active");
        body.classList.remove("overflow-hidden");
    });
});


// Функция для закрытия меню
function closeMenu() {
    const headerBlock = document.querySelector(".menu");
    headerBlock.classList.remove("active");
    document.body.classList.remove("overflow-hidden");
  }

// Получаем все кнопки с атрибутом data-url
var buttons = document.querySelectorAll('[data-url]');

// Добавляем обработчик событий для каждой кнопки
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        var dataUrl = button.getAttribute('data-url');
        var targetElement = document.getElementById(dataUrl);

        if (targetElement) {
            // Используем smooth scroll для плавного перехода
            targetElement.scrollIntoView({ behavior: 'smooth' });

            // Если ширина экрана <= 1000, закрываем меню
            if (window.innerWidth <= 1000) {
              closeMenu();
            }
        }
    });
});
