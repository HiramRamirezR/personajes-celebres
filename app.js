import characters from './characters.js';

console.log(characters);

let currentCharacterIndex = 0;
let currentTypeIndex = 0;
let currentWorkIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('result');

function displayQuestion() {
    const character = characters[currentCharacterIndex];
    const imageUrl = character.image;

    // Limpiamos el contenedor de pregunta
    const questionContainer = document.getElementById('question');
    questionContainer.innerHTML = '';

    // Mostramos la imagen del personaje
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.alt = character.name; // Proporciona un texto alternativo para la accesibilidad
    questionContainer.appendChild(imageElement);

    // Mostramos las opciones de selección (nombre del personaje)
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    const names = characters.map(char => char.name); // Obtenemos solo los nombres de los personajes
    names.forEach(name => {
        const button = document.createElement('button');
        button.textContent = name;
        button.addEventListener('click', () => checkName(name === character.name));
        optionsContainer.appendChild(button);
    });
}

function checkName(isCorrect) {
    if (isCorrect) {
        // Acción cuando el nombre seleccionado es correcto
        console.log('¡Correcto! Puedes continuar seleccionando el área.');
        
        // Aquí podrías agregar código para avanzar a la siguiente etapa de la aplicación
        // Por ejemplo, avanzar a la selección del área:
        displayTypeOptions();
    } else {
        // Acción cuando el nombre seleccionado es incorrecto
        console.log('¡Incorrecto! Intenta de nuevo.');
        // Aquí podrías agregar código para manejar la respuesta incorrecta
    }
}


function checkAnswer(isCorrect) {
    if (isCorrect) {
        score++;
        resultElement.textContent = '¡Correcto!';
        displayTypeOptions();
    } else {
        resultElement.textContent = 'Incorrecto. Inténtalo de nuevo.';
    }
}

function displayTypeOptions() {
    const character = characters[currentCharacterIndex];
    const types = [
        "Músico",
        "Escritor",
        "Científico",
        "Actor",
        "Inventor",
        "Matemático",
        "Pintor",
        "Escultor",
        "Arquitecto"
    ];
    const correctType = character.type.toLowerCase(); // Convertimos a minúsculas para comparación

    console.log("Tipo correcto del personaje:", correctType);

    questionElement.textContent = `¿En qué área se destaca ${character.name}?`;
    optionsElement.innerHTML = '';
    types.forEach(type => {
        const button = document.createElement('button');
        button.textContent = type;
        button.addEventListener('click', () => {
            const selectedType = type.toLowerCase();
            console.log("Tipo seleccionado por el usuario:", selectedType);
            console.log("¿Es correcto?", selectedType === correctType);
            checkType(selectedType === correctType);
        });
        optionsElement.appendChild(button);
    });
}



function checkType(isCorrect) {
    if (isCorrect) {
        resultElement.textContent = '¡Correcto!';
        displayWorkOptions();
    } else {
        resultElement.textContent = 'Incorrecto. Inténtalo de nuevo.';
        optionsElement.innerHTML = '';
    }
}

function displayWorkOptions() {
    const character = characters[currentCharacterIndex];
    const works = character.works;
    const correctWorkIndex = Math.floor(Math.random() * works.length);
    const correctWork = works[correctWorkIndex];

    questionElement.textContent = `¿Cuál de estas obras es de ${character.name}?`;
    optionsElement.innerHTML = '';
    works.forEach(work => {
        const button = document.createElement('button');
        button.textContent = work;
        button.addEventListener('click', () => checkWork(work === correctWork));
        optionsElement.appendChild(button);
    });
}

function checkWork(isCorrect) {
    if (isCorrect) {
        score++;
        resultElement.textContent = '¡Correcto!';
    } else {
        resultElement.textContent = 'Incorrecto. Inténtalo de nuevo.';
    }
    currentCharacterIndex++;
    if (currentCharacterIndex < characters.length) {
        setTimeout(displayQuestion, 1000);
    } else {
        resultElement.textContent += ` Tu puntuación final es ${score}/${characters.length * 2}.`;
    }
}

displayQuestion();
