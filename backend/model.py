from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from werkzeug.security import generate_password_hash

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///grocery.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String,unique=True,nullable=False)
    email = db.Column(db.String,nullable=False)
    password = db.Column(db.String,nullable=False)
    role = db.Column(db.String,default='user')

class Category(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String,unique=True,nullable=False)


with app.app_context():
    db.create_all()

    if User.query.filter_by(username='admin').first() is None:
        admin_password = generate_password_hash('adminpassword')
        admin= User(email='admin@grocery.com',username='admin',password=admin_password,role='admin')

        db.session.add(admin)
        db.session.commit()
    else:
        print('admin already exists')