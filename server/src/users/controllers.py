from flask import request, jsonify
import uuid

from .. import db
from ..models.models import User

def get_users(data):
    print(data)
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400
    user = User.query.filter_by(email=email).first()
    return jsonify({'message':'login successful','data':user.to_dict()})

def create_user(data):
    user = User(
        name=data.get('name'),
        email=data.get('email'),
        phone_number=data.get('phone_number'),
        role=data.get('role')
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({'message':'user created','data':user.to_dict()}), 201

def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({'message':'users','data':user.to_dict()})
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)
    user.phone_number = data.get('phone_number', user.phone_number)
    user.role = data.get('role', user.role)

    db.session.commit()
    return jsonify(user.to_dict())
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted'}), 200






# from flask import Flask, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from ..models import db, User, Product, Order

# app = Flask(__name__)

# # Create tables if they don't exist
# @app.before_first_request
# def create_tables():
#     db.create_all()

# # 🟢 CREATE (POST) Routes
# @app.route('/users', methods=['POST'])

# @app.route('/products', methods=['POST'])
# def create_product():
#     data = request.get_json()
#     product = Product(
#         name=data.get('name'),
#         na=data.get('na'),
#         description=data.get('description'),
#         price_per_unit=data.get('price_per_unit'),
#         quantity_available=data.get('quantity_available'),
#         user_id=data.get('user_id')
#     )
#     db.session.add(product)
#     db.session.commit()
#     return jsonify(product.to_dict()), 201

# @app.route('/orders', methods=['POST'])
# def create_order():
#     data = request.get_json()
#     order = Order(
#         user_id=data.get('user_id'),
#         quantity_ordered=data.get('quantity_ordered'),
#         total_price=data.get('total_price'),
#         status=data.get('status')
#     )
#     db.session.add(order)
#     db.session.commit()
#     return jsonify(order.to_dict()), 201

# @app.route('/users/<int:user_id>', methods=['GET'])

# @app.route('/products', methods=['GET'])
# def get_products():
#     products = Product.query.all()
#     return jsonify([product.to_dict() for product in products])

# @app.route('/products/<int:product_id>', methods=['GET'])
# def get_product(product_id):
#     product = Product.query.get_or_404(product_id)
#     return jsonify(product.to_dict())

# @app.route('/orders', methods=['GET'])
# def get_orders():
#     orders = Order.query.all()
#     return jsonify([order.to_dict() for order in orders])

# @app.route('/orders/<int:order_id>', methods=['GET'])
# def get_order(order_id):
#     order = Order.query.get_or_404(order_id)
#     return jsonify(order.to_dict())

# # 🟡 UPDATE (PUT/PATCH) Routes
# @app.route('/users/<int:user_id>', methods=['PUT'])
# def update_user(user_id):
#     user = User.query.get_or_404(user_id)
#     data = request.get_json()
    
#     user.name = data.get('name', user.name)
#     user.email = data.get('email', user.email)
#     user.phone_number = data.get('phone_number', user.phone_number)
#     user.role = data.get('role', user.role)

#     db.session.commit()
#     return jsonify(user.to_dict())

# @app.route('/products/<int:product_id>', methods=['PUT'])
# def update_product(product_id):
#     product = Product.query.get_or_404(product_id)
#     data = request.get_json()
    
#     product.name = data.get('name', product.name)
#     product.na = data.get('na', product.na)
#     product.description = data.get('description', product.description)
#     product.price_per_unit = data.get('price_per_unit', product.price_per_unit)
#     product.quantity_available = data.get('quantity_available', product.quantity_available)

#     db.session.commit()
#     return jsonify(product.to_dict())

# @app.route('/orders/<int:order_id>', methods=['PUT'])
# def update_order(order_id):
#     order = Order.query.get_or_404(order_id)
#     data = request.get_json()
    
#     order.quantity_ordered = data.get('quantity_ordered', order.quantity_ordered)
#     order.total_price = data.get('total_price', order.total_price)
#     order.status = data.get('status', order.status)

#     db.session.commit()
#     return jsonify(order.to_dict())

# # 🔴 DELETE (DELETE) Routes
# @app.route('/users/<int:user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     user = User.query.get_or_404(user_id)
#     db.session.delete(user)
#     db.session.commit()
#     return jsonify({'message': 'User deleted'}), 200

# @app.route('/products/<int:product_id>', methods=['DELETE'])
# def delete_product(product_id):
#     product = Product.query.get_or_404(product_id)
#     db.session.delete(product)
#     db.session.commit()
#     return jsonify({'message': 'Product deleted'}), 200

# @app.route('/orders/<int:order_id>', methods=['DELETE'])
# def delete_order(order_id):
#     order = Order.query.get_or_404(order_id)
#     db.session.delete(order)
#     db.session.commit()
#     return jsonify({'message': 'Order deleted'}), 200

# # Run the Flask app
# if __name__ == '__main__':
#     app.run(debug=True)
