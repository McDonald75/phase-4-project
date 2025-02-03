from flask import request

from ..app import app
from .controllers import get_users, create_user, get_user

@app.route("/user/auth", methods=['POST'])
def auth_user_controller():
    data = request.get_json()
   
    if request.method == 'POST': return get_users(data)
    else: return 'Method is Not Allowed'

@app.route("/user/register", methods=['POST'])
def register_user_controller():
    data = request.get_json()
    print(data)
    if request.method == 'POST': return create_user(data)
    else: return 'Method is Not Allowed'

@app.route("/users/<int:user_id>", methods=['GET', 'PUT', 'DELETE'])
def retrieve_update_destroy_accounts(account_id):
    if request.method == 'GET': return get_user()
