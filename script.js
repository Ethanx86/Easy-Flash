// Handle the adding/deleting of flashcard options from the deck.
var buttons = 1;
const questions = document.getElementById('Questions');
const plus = document.getElementById('+');
const minus = document.getElementById('-');
minus.disabled = true;
plus.addEventListener('click', () => {
    buttons++;
    const question = document.createElement('input');
    const space = document.createElement('p');
    const answer = document.createElement('input');
    const br = document.createElement('br');
    question.id = `${buttons}q`;
    answer.id = `${buttons}a`;
    space.innerHTML = '&nbsp;';
    question.placeholder = 'Question...';
    answer.placeholder = 'Answer...';
    questions.appendChild(question);
    questions.appendChild(answer);
    questions.appendChild(br);
    //questions.innerHTML += `\n<input id="${buttons}q" placeholder="Question..."> <input id="${buttons}a" placeholder="Answer..."><br>`;
    minus.disabled = false;
});

minus.addEventListener('click', () => {
    buttons--;
    questions.removeChild(questions.lastElementChild);
    questions.removeChild(questions.lastElementChild);
    questions.removeChild(questions.lastElementChild);
    minus.disabled = buttons == 1;
});
// Submit flashcards, store them, and activate test
const submit = document.getElementById('submit');
const config = document.getElementById('Configuration');
const test = document.getElementById('Test');
const flashcards = {};
submit.addEventListener('click', () => {
    for(let i = 1; i <= buttons; i++){
        flashcards[document.getElementById(`${i}q`).value] = document.getElementById(`${i}a`).value;
    }
    config.style.display = 'none';
    test.style.display = 'inline-block';
    question();
});
// The REAL meat of the program -- actually doing the flashcard app.
var answer;
function question(){
    // Start by getting a random question
    const questionNumber = Math.round(Math.random() * (buttons - 1));
    const question = Object.keys(flashcards)[questionNumber];
    answer = Object.values(flashcards)[questionNumber];
    // Display question
    const questionDisplay = document.getElementById('Question');
    questionDisplay.innerHTML = question;
}
// And finally -- handle the answer
const guessInput = document.getElementById('Answer');
var showingAnswer = false;
guessInput.addEventListener('keypress', (event) => {
    if(showingAnswer) {
        guessInput.value = '';
    }
    if(event.code === 'Enter') {
        // Handle a submitted answer
        const error = document.getElementById('error');
        const guess = guessInput.value;
        if(guess == answer){
            question();
            const audio = new Audio('correct.mp3');
            audio.play();
        } else {
            showingAnswer = true;
            error.innerHTML = `Incorrect! The answer is ${answer}`;
            setTimeout(() => {
                showingAnswer = false;
                error.innerHTML = '';
            }, 3000);
        }
    }
});