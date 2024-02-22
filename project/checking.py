import sys
import eel
import g4f
from main import inputCh
import logging


# создание запроса на проверку и получение
@eel.expose
def check():
    try:
        responсe2 = g4f.ChatCompletion.create(
            model=g4f.models.gpt_4,
            messages=[{"role": "user", "content": inputCh + "is it correct?"}],
        )
        print(responсe2)
        return responсe2
    except Exception as e:
        print(f"An error occurred in check(): {str(e)}")
        return None
