from flask import request, jsonify
import uuid

from .. import db
from ..models.models import Product


def create_product():
    data = request.get_json()
    product = Product(
        name=data.get('name'),
        na=data.get('na'),
        description=data.get('description'),
        price_per_unit=data.get('price_per_unit'),
        quantity_available=data.get('quantity_available'),
        user_id=data.get('user_id')
    )
    db.session.add(product)
    db.session.commit()
    return jsonify(product.to_dict()), 201
def get_products():
    products = Product.query.all()
    return jsonify({'message':'products', 'data':[product.to_dict() for product in products]})
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict())
def get_products_by_merchant(id):
    if not id : return jsonify({'message':'you must provide farmer id'}), 400
    products = Product.query.filter_by(user_id=id)
    return jsonify({'message':'farmer products', 'data':[product.to_dict() for product in products]}),200
    
def delete_product(product_id):
    print(product_id)
    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted'}), 200

def update_product(data):
    product = Product.query.get_or_404(data.get('id'))
    
    product.name = data.get('name', product.name)
    product.na = data.get('na', product.na)
    product.description = data.get('description', product.description)
    product.price_per_unit = data.get('price_per_unit', product.price_per_unit)
    product.quantity_available = data.get('quantity_available', product.quantity_available)

    db.session.commit()
    return jsonify(product.to_dict())
def update_product_name(data):
    product = Product.query.get_or_404(data.get('id'))
    product.name = data.get('name', product.name)
    db.session.commit()
    return jsonify({'message':'product updated', 'data':product.to_dict()})
