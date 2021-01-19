const firstName = [
    'Паук', 'Козел', 'Кит',
    'Крокодил', 'Носорог', 'Кенгуру',
    'Кот', 'Бегемот', 'Пес',
    'Жираф', 'Бобер', 'Буйвол',
    'Щенок', 'Свин', 'Бык'
]

const lastName = [
    'Забавный', 'Сонливый', 'Быстрый',
    'Медленный', 'Крупный', 'Солидный',
    'Северный', 'Декоративный', 'Особенный',
    'Славянский', 'Успешный', 'Осторожный',
    'Буйный', 'Юный', 'Субъективный'
]

export const nameGeneration = () => {
    const randomFirstName = firstName[Math.floor(Math.random() * (firstName.length - 1))];
    const randomLastName = lastName[Math.floor(Math.random() * (lastName.length - 1))];

    return randomLastName + ' ' + randomFirstName;
}