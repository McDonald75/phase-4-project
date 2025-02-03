from flask import request, jsonify
import uuid

from .. import db
from ..models.models import Order

def create_order(data):
    order = Order(
        user_id=data.get('user_id'),
        quantity_ordered=data.get('quantity_ordered'),
        total_price=data.get('total_price'),
        status=data.get('status')
    )
    db.session.add(order)
    db.session.commit()
    return jsonify(order.to_dict()), 201
def get_orders():
    orders = Order.query.all()
    return jsonify([order.to_dict() for order in orders])

def get_order(order_id):
    order = Order.query.get_or_404(order_id)
    return jsonify(order.to_dict())
def update_order(order_id):
    order = Order.query.get_or_404(order_id)
    data = request.get_json()
    
    order.quantity_ordered = data.get('quantity_ordered', order.quantity_ordered)
    order.total_price = data.get('total_price', order.total_price)
    order.status = data.get('status', order.status)

    db.session.commit()
    return order.to_dict()

def delete_order(order_id):
    order = Order.query.get_or_404(order_id)
    db.session.delete(order)
    db.session.commit()
    return jsonify({'message': 'Order deleted'}), 200
