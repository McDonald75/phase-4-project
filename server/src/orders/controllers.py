from flask import request, jsonify
import uuid

from .. import db
from ..models.models import Order, order_product_association, Product

def create_order(data):
    order = Order(
        user_id=data.get('user_id'),
        quantity_ordered=data.get('quantity_ordered'),
        total_price=data.get('total_price'),
        status=data.get('status')
    )
    db.session.add(order)
    db.session.commit()
    return jsonify({'message':'order created', 'data':order.to_dict()}), 201
def get_orders_by_farmer(farmer_id):
    results = Order.query.all()
    print([order.to_dict() for order in results])
    return jsonify({'message':'order by farmer', 'data':[order.to_dict() for order in results   ]})
def get_order_by_user_id(user_id):
    if not user_id : return jsonify({'message':'you must provide user id'}), 400
    orders = Order.query.filter_by(user_id=user_id)
    return jsonify({'message':'orders', 'data':[order.to_dict() for order in orders]})
def update_order_status(data):
    order = Order.query.get_or_404(data.get('id'))
    order.status = data.get('status', order.status)

    db.session.commit()
    return jsonify({'message':'order status updated', 'data':order.to_dict()})

def delete_order(order_id):
    order = Order.query.get_or_404(order_id)
    db.session.delete(order)
    db.session.commit()
    return jsonify({'message': 'Order deleted'}), 200