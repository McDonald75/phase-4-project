import os

from dotenv import load_dotenv
load_dotenv()

# App Initialization
from . import create_app 
app = create_app(os.getenv("CONFIG_MODE"))

# ----------------------------------------------- #

@app.route('/')
def hello():
    return "Hello World!"

from .users import urls
from .products import urls
from .orders import urls

# ----------------------------------------------- #

if __name__ == "__main__":
    # app.run(host='0.0.0.0', port=5000)
    app.run()