import sys
import threading
import eel
import g4f
from g4f.client import Client
import logging #попробую заменить принты для глубокого поимани ошибки

logging.basicConfig(level=logging.DEBUG)#для ошибок

eel.init("web")

g4f.debug.logging = True
print(g4f.Provider.Bing.params)

inputp = ''

# получение промпта
@eel.expose
def inputPr(inputprompt):
    global inputp
    if inputprompt:
        inputp = inputprompt
        print(f"Received value in inputprompt: {inputp}")
    else:
        print("No value received in inputprompt")
    return inputp


inputCh = ''


# получение ответа для обратного запроса
@eel.expose
def inputCheck(answerPrompt):
    global inputCh
    if answerPrompt:
        inputCh = answerPrompt
        print(f"Received value in inputprompt: {inputCh}")
    else:
        print("No value received in inputprompt")
    return inputCh

# функция для создания запроса и получения ответа от гпт 3.5
@eel.expose
def gptresm():
    client = Client()
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": inputp}],
    )
    print('getting response')
    return response.choices[0].message.content

# функция для создания запроса и получения ответа от гпт 4
@eel.expose
def gptresp():
    try:
        client = Client()
        response = client.chat.completions.create(
            model=g4f.models.gpt_4,
            messages=[{"role": "user", "content": inputp}],
        )
        print('getting response:', response.choices[0].message.content)
        logging.debug('getting response: %s', response.choices[0].message.content)
        return response.choices[0].message.content
    except Exception as e:
        error_message = f"An error occurred in gptresp(): {str(e)}"
        sys.stdout.flush() # что бы не перескакивало(не работает наверное)
        logging.error(error_message)
        return {"error": error_message}

pressed = ''

# получение текста нажатой кнопки math python idk
@eel.expose
def pressedBtn(buttontext):
    global pressed
    pressed = buttontext
    return pressed

# выбор модели и получение ответов
@eel.expose
def get_quote():
    try:
        with open('prompt.txt', 'a') as file:
            text_variable = inputp
            file.write(text_variable + '\n')
        if pressed == 'Math':
            print('Math Quote')
            return gptresm()
            print("gpt3.5")
        elif pressed == 'Python':
            print('Python Quote')
            return gptresp()
            print("gpt4")
        elif pressed == 'Idk':
            print('Idk Quote')
            return 0
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return "An error occurred while writing to the file."

# создание запроса на проверку и получение
@eel.expose
def check():
    try:
        client = Client()
        responсe2 = client.chat.completions.create(
            model=g4f.models.gpt_4,
            messages=[{"role": "user", "content": inputCh + "is it correct?"}],
        )
        print(responсe2)
        return responсe2.choices[0].message.content
    except Exception as e:
        print(f"An error occurred in check(): {str(e)}")
        return None

# открытие на фулл окно(не работает)
@eel.expose
def open_fullscreen_window():
    eel.open('index.html', size=(1920, 1080), mode='fullscreen')

# запуск окна
def start_eel():
    eel.start("main.html", size=(1200, 800))

#для принтов, в инете нашёл
eel_thread = threading.Thread(target=start_eel)
eel_thread.start()
eel_thread.join()