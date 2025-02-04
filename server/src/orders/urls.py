from flask import request

from ..app import app
from .controllers import create_order, get_order_by_user_id, update_order_status, get_orders_by_farmer

@app.route("/orders", methods=['GET', 'POST'])
def orders_create_controller():
    data = request.get_json()
    if request.method == 'POST': return create_order(data)
    else: return 'Method is Not Allowed'
@app.route('/orders/user/<int:id>',  methods=['GET', 'POST'])
def get_orders_controller(id):
    return get_order_by_user_id(id)

@app.route('/orders/status', methods=['POST', 'PATCH', 'PUT'])
def update_orders_status_controller():
    data = request.get_json()
    return update_order_status(data)
@app.route('/orders/farmer/<int:id>', methods=['GET', 'POST'])
def get_orders_by_farmer_controller(id):
    return get_orders_by_farmer(id)
    