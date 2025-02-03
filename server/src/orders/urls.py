from flask import request

from ..app import app
from .controllers import create_order

@app.route("/orders", methods=['GET', 'POST'])
def orders_create_controller():
    data = request.get_json()
    if request.method == 'POST': return create_order(data)
    else: return 'Method is Not Allowed'
