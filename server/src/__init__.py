from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate

from .config import config

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_mode):
    app = Flask(__name__)
    # CORS(app)
    CORS(app)
    app.config.from_object(config[config_mode])
    # print(config.get('development'))

    db.init_app(app)
    migrate.init_app(app, db)

    return app