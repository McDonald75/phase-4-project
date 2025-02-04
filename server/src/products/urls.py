from flask import request

from ..app import app
from .controllers import create_product, get_products, get_products_by_merchant, delete_product, update_product_name, update_product

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
@app.route('/products/farmer/<int:id>', methods=['GET'])
def get_farmer_products(id):
    return get_products_by_merchant(id)
@app.route('/products/delete/<int:id>', methods=['DELETE'])
def delete_product_controller(id):
    return delete_product(id)
    
@app.route('/products/name', methods=['POST'])
def update_product_name_controller():
    data = request.get_json()
    
    print(data)
    return update_product_name(data)
    
@app.route('/products/update', methods=['POST', 'PUT'])
def update_product_controller():
    data = request.get_json()
    return update_product(data)