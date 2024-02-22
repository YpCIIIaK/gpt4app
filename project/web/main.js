// jquery нужен

let text = document.getElementById('textb');
let button1 = document.getElementById('Math');
let button2 = document.getElementById('Python');
let button3 = document.getElementById('Idk');

//изменение текста
button1.addEventListener('click', function() {
    text.innerHTML = 'You chose gpt-3.5 model!';
    text.style.color = 'royalblue';
    text.style.fontFamily = 'monospace';
    text.style.fontStyle = 'normal';
    text.style.fontOpticalSizing = 'auto';
    text.style.fontWeight = 'bold';
    text.style.fontVariationSettings = "wdth"+100;
    text.style.fontSize = '33px';
});

button2.addEventListener('click', function() {
    text.innerHTML = 'You chose gpt-4 model!';
});

button3.addEventListener('click', function() {
    text.innerHTML = 'You chose idk!';
});

// передача текста нажатой кнопки
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('button')) {
            let buttontext = event.target.textContent;
            pressedBtn(buttontext);
            console.log(buttontext)
        }
    });
});

// передача промпт и ответа для проверки
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('showButton')) {
            let inputprompt = document.getElementById('inputid').value;
            let answer = document.getElementById('answerInput').value;
            let answerPrompt = inputprompt + " and answer is: " + answer;
            inputPr(inputprompt);
            inputCheck(answerPrompt);
            console.log(inputprompt);
            console.log(answerPrompt);
        }
    });
});

// передача в питон текста нажатой кнопки
eel.expose(pressedBtn);
async function pressedBtn(buttontext) {
    await eel.pressedBtn(buttontext)();
}

// передача промпта в питон
eel.expose(inputPr);
async function inputPr(inputprompt){
    await eel.inputPr(inputprompt)();
}

// передача ответа в питон
eel.expose(inputCheck);
async function inputCheck(answerPrompt){
    await eel.inputCheck(answerPrompt)();
}

// получение от гпт ответа и вставка в html
eel.expose(get_quote);
async function get_quote() {
    try {
        console.log("Getting quote...");
        let response = await eel.get_quote()();
        console.log("Response from server:", response);

        if (response && response.error) {
            console.error("An error occurred:", response.error);
        } else {
            document.getElementById('in').innerHTML = await response;
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

//проверка ответа пользователя
eel.expose(check);
async function check(){
    try{
        console.log("Checking...")
        let responce2 = eel.check();
        console.log("Response from server:", responce2);
        document.getElementById('checkMessage').innerHTML = responce2;
    }
    catch (error){
        console.error("An error occurred:", error);
    }
}

//запуск функций
jQuery('#show').on('click', function () {
    get_quote();
});

jQuery('checkButton').on('click', function () {
    check();
});

let ParticlesActive = false;
function generateParticles(e) {
  if (ParticlesActive) {
    [1, .9, .8, .5, .1].forEach(function(i) {
      var j = (1 - i) * 50;
      var elem = document.createElement('div');
      var size = Math.ceil(Math.random() * 5 * i) + 'px';
      elem.style.position = 'fixed';
      elem.style.top = e.pageY + Math.round(Math.random() * j - j / 2) + 'px';
      elem.style.left = e.pageX + Math.round(Math.random() * j - j / 2) + 'px';
      elem.style.width = size;
      elem.style.height = size;
      elem.style.background = 'hsla(' +
        Math.round(Math.random() * 360) + ', ' +
        '100%, ' +
        '50%, ' +
        i + ')';
      elem.style.borderRadius = size;
      elem.style.pointerEvents = 'none';
      document.body.appendChild(elem);
      window.setTimeout(function() {
        document.body.removeChild(elem);
      }, Math.round(Math.random() * i * 500));
    });
  }
}

// Функция-обработчик нажатия кнопки
function handleButtonClick() {
  ParticlesActive = !ParticlesActive;

  // Добавляем или удаляем слушатель в зависимости от состояния isParticlesActive
  if (ParticlesActive) {
    window.addEventListener('mousemove', generateParticles, false);
  } else {
    window.removeEventListener('mousemove', generateParticles, false);
  }
}

// Слушатель события нажатия на кнопку
document.getElementById('toggleParticlesBtn').addEventListener('click', handleButtonClick, false);

// Получаем все кнопки цвета
let colorButtons = document.querySelectorAll('.colorBtn');

let card = document.getElementById('card');
let pressButton = document.getElementById('show')

//обработчик события к каждой кнопке
colorButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        card.classList.remove(
            'border-primary',
            'border-secondary',
            'border-success',
            'border-danger',
            'border-warning',
            'border-info',
            'border-light',
            'border-dark'
        );
        pressButton.classList.remove(
            'border-primary',
            'border-secondary',
            'border-success',
            'border-danger',
            'border-warning',
            'border-info',
            'border-light',
            'border-dark'
        );

        let colorId = button.id;
        switch (colorId) {
            case 'Blue':
                card.classList.add('border-primary')
                pressButton.classList.add('border-primary')
                break;
            case 'Gray':
                card.classList.add('border-secondary')
                pressButton.classList.add('border-secondary')
                break;
            case 'Green':
                card.classList.add('border-success')
                pressButton.classList.add('border-success')
                break;
            case 'Red':
                card.classList.add('border-danger')
                pressButton.classList.add('border-danger')
                break;
            case 'Yellow':
                card.classList.add('border-warning')
                pressButton.classList.add('border-warning')
                break;
            case 'Aqua':
                card.classList.add('border-info')
                pressButton.classList.add('border-info')
                break;
            case 'White':
                card.classList.add('border-light')
                pressButton.classList.add('border-light')
                break;
            case 'Dark':
                card.classList.add('border-dark')
                pressButton.classList.add('border-dark')
                break;
        }
    });
});


// document.addEventListener('contextmenu', function (event) {
//       event.preventDefault();
// });