from flask import request

from ..app import app
from .controllers import create_product, get_products

@app.route("/products", methods=['POST'])
def create_product_controller():
    data = request.get_json()
    if request.method == 'POST': return create_product()
    if request.method == 'GET': return get_products()
    else: return 'Method is Not Allowed'

@app.route("/products/all", methods=['POST'])
def get_product_controller():
    if request.method == 'POST': return get_products()
    else: return 'Method is Not Allowed'
