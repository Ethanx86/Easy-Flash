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
    activate();
});
// The REAL meat of the program -- actually doing the flashcard app.
function activate(){
    // Start by getting a
}