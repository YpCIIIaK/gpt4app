import sys
import eel # установить pip install eel
import g4f # установить pip install -U g4f
import logging


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


# функция для создания запроса и получения ответа от гпт 3.5
@eel.expose
def gptresm(inputp):
    try:
        response = g4f.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": inputp}],
        )
        print('getting response:', response)
        logging.debug('getting response: %s', response)
        return response
    except Exception as e:
        error_message = f"An error occurred in gptresm(): {str(e)}"
        sys.stdout.flush()
        logging.error(error_message)
        return {"error": error_message}


# функция для создания запроса и получения ответа от гпт 4
@eel.expose
def gptresp():
    try:
        response = g4f.ChatCompletion.create(
            model=g4f.models.gpt_4,
            messages=[{"role": "user", "content": inputp}],
        )
        print('getting response:', response)
        logging.debug('getting response: %s', response)
        return response
    except Exception as e:
        error_message = f"An error occurred in gptresp(): {str(e)}"
        sys.stdout.flush() # что бы не перескакивало(не работает наверное)
        logging.error(error_message)
        return {"error": error_message}
