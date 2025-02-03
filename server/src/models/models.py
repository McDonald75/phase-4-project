from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.dialects.postgresql import ENUM  # Use PostgreSQL's ENUM type
from sqlalchemy import Table

from .. import db

role_enum = ENUM('FARMER', 'BUYER', name='role_enum', create_type=True)
status_enum = ENUM('PENDING', 'ACCEPTED', 'DECLINED', 'COMPLETED', name='status_enum', create_type=True)

# Models go here!
order_product_association = Table('order_product_association', db.Model.metadata,
    db.Column('order_id', db.Integer, db.ForeignKey('orders.id', ondelete='CASCADE'), primary_key=True),
    db.Column('product_id', db.Integer, db.ForeignKey('products.id', ondelete='CASCADE'), primary_key=True)
)

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String, nullable=False)
    role = db.Column(role_enum, nullable=False)  # Use named ENUM

    orders = db.relationship("Order", back_populates='user')
    products = db.relationship("Product", back_populates='user')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone_number': self.phone_number,
            'role': self.role,
        }

    def __repr__(self):
        return f"<User {self.name}>"

class Product(db.Model, SerializerMixin):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    na = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    price_per_unit = db.Column(db.Integer, nullable=False)
    quantity_available = db.Column(db.Integer, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    user = db.relationship('User', back_populates='products')
    orders = db.relationship('Order', secondary=order_product_association, back_populates='products')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price_per_unit': self.price_per_unit,
            'quantity_available': self.quantity_available,
        }

    def __repr__(self):
        return f"<Product {self.name}>"

class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    quantity_ordered = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Integer, nullable=False)
    status = db.Column(status_enum, nullable=False)  # Use named ENUM

    user = db.relationship('User', back_populates='orders')
    products = db.relationship('Product', secondary=order_product_association, back_populates='orders')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'quantity_ordered': self.quantity_ordered,
            'total_price': self.total_price,
            'status': self.status,
        }

    def __repr__(self):
        return f"<Order {self.id}>"
