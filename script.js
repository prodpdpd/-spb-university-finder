
// Получаем HTML-элементы
const universityList = document.getElementById("universityList");
const searchInput = document.getElementById("search");
const directionSelect = document.getElementById("direction");
const result = document.getElementById("result");

// Безопасное отображение текста
function safeText(text) {
    const element = document.createElement("span");
    element.textContent = text;
    return element.innerHTML;
}

// Отображение университетов
function displayUniversities(list) {
    universityList.innerHTML = "";

    if (list.length === 0) {
        universityList.innerHTML =
            "<p>Университеты не найдены.</p>";
        return;
    }

    list.forEach(university => {
        const card = document.createElement("div");
        card.className = "uni-card";

        const title = document.createElement("h3");
        title.textContent = university.name;

        const description = document.createElement("p");
        description.textContent = university.description;

        const tags = document.createElement("div");

        university.tags.forEach(tag => {
            const span = document.createElement("span");
            span.className = "tag";
            span.textContent = tag;
            tags.appendChild(span);
        });

        const link = document.createElement("a");
        link.href = university.site;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Официальный сайт ↗";

        card.append(title, description, tags, link);
        universityList.appendChild(card);
    });
}

// Поиск университетов
function searchUniversity() {
    const query = searchInput.value.toLowerCase().trim();

    const filtered = universities.filter(university => {
        return (
            university.name.toLowerCase().includes(query) ||
            university.short.toLowerCase().includes(query) ||
            university.description.toLowerCase().includes(query) ||
            university.tags.some(tag =>
                tag.toLowerCase().includes(query)
            )
        );
    });

    displayUniversities(filtered);
}

// Уникальная функция подбора университета
function findUniversity() {
    const selectedDirection = directionSelect.value;

    const matches = universities.filter(university =>
        university.direction === selectedDirection
    );

    if (matches.length === 0) {
        result.textContent =
            "Пока нет подходящих университетов.";
        return;
    }

    result.innerHTML = "";

    const heading = document.createElement("h3");
    heading.textContent = "Тебе могут подойти:";
    result.appendChild(heading);

    matches.forEach(university => {
        const item = document.createElement("div");
        item.className = "recommendation";

        const name = document.createElement("strong");
        name.textContent = university.short;

        const description = document.createElement("p");
        description.textContent = university.description;

        const link = document.createElement("a");
        link.href = university.site;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Посмотреть университет ↗";

        item.append(name, description, link);
        result.appendChild(item);
    });
}

// Первоначальная загрузка каталога
displayUniversities(universities);
