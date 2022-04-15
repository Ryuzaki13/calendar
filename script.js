/*

Для работы необходим такой HTML элемент

<div class="date">
    <div class="text"></div>
</div>

*/


// Функция для добавления текущей даты и события на нажатие всем элементом
// с классом date
function UpdateDateElement() {
    // Выбрать на странице все элементы с классом date
    let dateElements = document.querySelectorAll(".date-contaiter");
    // Получить текущую дату
    let currentDate = new Date();
    // Циклом пройтись по всем элементом, которым нужно
    // установить собитие и текущую дату
    for (let i = 0; i < dateElements.length; i++) {
        // Внутри каждого элемента должен быть элемент с
        // классом text, в котором отображается "выбранная" дата
        let text = dateElements[i].querySelector(".text");
        // Проверить, что этот элемент существует
        if (text) {
            // Установить текст в этот элемент
            // toJSON() получает строку в формате ГГГГ-ММ-ДД чч:мм:сс
            // slice обрезает строку с первого по 10 символ, чтобы
            // осталась только дата
            text.textContent = currentDate.toJSON().slice(0, 10);
            text.dataset.date = new Date().getTime();

            let btnPrev = dateElements[i].querySelector(".btnp");
            let btnNext = dateElements[i].querySelector(".btnn");

            if (btnPrev) {
                btnPrev.onclick = setDate.bind(text, -1);
            }
            if (btnNext) {
                btnNext.onclick = setDate.bind(text, 1);
            }
        }
        // Для текущего элемента установить событие на клик
        // оно будет открывать календарь
        let date = dateElements[i].querySelector(".date");
        date.onclick = ShowCalendar.bind(text);
    }
}

function setDate(offset) {
    let date = new Date(+this.dataset.date);
    if (date.toString() == "Invalid Date") return;

    if (offset < 0) {
        if (date.getMonth() <= 0) {
            date.setFullYear(date.getFullYear() - 1);
            date.setMonth(11);
        } else {
            date.setMonth(date.getMonth() + offset);
        }
    } else {
        if (date.getMonth() >= 11) {
            date.setFullYear(date.getFullYear() + 1);
            date.setMonth(0);
        } else {
            date.setMonth(date.getMonth() + offset);
        }
    }
    
    this.dataset.date = date.getTime();
    this.textContent = date.toJSON().slice(0, 10);

    ShowCalendar.call(this);
}

// Функция создания календаря
function ShowCalendar(e) {
    // Предже всего нужно удалить все предыдущие календари (если они были)
    // Получить все элементы с классом calendar
    let oldCalendar = document.querySelectorAll(".calendar");
    // Пройти циклом по всем элементам
    for (let i = 0; i < oldCalendar.length; i++) {
        // И каждый из них удалить со страницы
        oldCalendar[i].remove();
    }
    // Создать новый элемент, он и будет окном календаря
    let w = document.createElement("div");
    // Добавить ему класс, который стилизует его как надо
    w.className = "calendar";
    // Получить текущую дату
    let date = new Date(+this.dataset.date);
    // И установить первый календарный день текущего месяца
    date.setDate(1);
    // Сохранить в переменной номер текущего месяца
    // чтобы по нему ориентироваться, когда нужно будет остановить цикл
    let month = date.getMonth();
    // Получить номер текущего дня (например, 1 число это среда)
    // значит календарь должен иметь две пустых ячейки
    let weekDay = date.getDay();
    // Пока переменная weekDay больше нуля
    while (weekDay > 0) {
        // добавлять в окно пустой элемент
        w.append(document.createElement("div"));
        // уменьшить значение переменной на единицу
        weekDay--;
    }
    // Формирование самого календаря.
    // Пока в переменной date номер даты совпадает с тем,
    // что ранее сохранили - добавить новый элемент
    while (month == date.getMonth()) {
        // Создать новый элемент
        let day = document.createElement("div");
        // В его текст записать дату (день)
        day.textContent = date.getDate();
        // Добавить этот элемент в окно календаря
        w.append(day);
        // Увеличить дату на 1 день. 86400000 миллисекунд = 24 часа
        date.setTime(date.getTime() + 86400000);
    }
    // Чтобы расположить календарь ровно под элементом выбора даты
    // нужно узнать его расположение на странице
    let dateBound = this.getBoundingClientRect();
    // Добавить стиль в окно свойств left и top
    w.style.left = dateBound.left + "px";
    w.style.top = dateBound.bottom + "px";
    // Добавить окно на страницу
    document.body.append(w);
}

document.addEventListener("DOMContentLoaded", () => {
    UpdateDateElement();
});