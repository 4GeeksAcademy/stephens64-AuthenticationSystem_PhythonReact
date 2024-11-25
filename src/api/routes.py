"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/user', methods=['POST'])
def create_user():
    
    new_user = User(email=request.json["email"], password=request.json['pw'])
    db.session.add(new_user)
    db.session.commit()

    response_body = {
        "message": "user " + request.json["email"] + "was created - Please login"
        }

    return jsonify(response_body), 200

@api.route("/signup", methods=["POST"])
def signup_route():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email is None or password is None:
        return jsonify({ "msg": "Missing E-mail and/or Password"}), 400
    

    if User.query.filter_by(email = email).first():
        return jsonify({ "msg": "Email already in use"}), 400
    
    new_user = User(email=email, password=password, is_active=True)

    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 201

@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Query your database for email and password
    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        # The user was not found on the database
        return jsonify({"msg": "Bad email or password"}), 401
    
    # Create a new token with the user id inside
    access_token = create_access_token(identity=user.email)
    return jsonify({ "token": access_token, "user_id": user.id }), 200

# need to add private route ! ! ! ! ! ! ! ! ! ! !
@api.route("/private", methods=["GET"])
@jwt_required()
def private_routes():
    current_user=get_jwt_identity()
    user=User.query.filter_by(email=current_user).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404
    
    return jsonify(logged_in_as = current_user), 200