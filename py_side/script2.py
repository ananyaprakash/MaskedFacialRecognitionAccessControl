# Import all the necessary files!
import os
import tensorflow as tf
from tensorflow.keras import layers
from tensorflow.keras import Model
from flask import Flask, request
from keras.models import load_model
import cv2
import json
import numpy as np
from flask_cors import CORS
from tensorflow.python.keras.backend import set_session
import base64
from datetime import datetime
from random import choice
from numpy import load
from numpy import expand_dims
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import Normalizer
from sklearn.svm import SVC
from matplotlib import pyplot
import shutil
import os

graph = tf.compat.v1.get_default_graph()

app = Flask(__name__)
CORS(app)
sess =tf.compat.v1.Session()
set_session(sess)

from Preprocess import extract_face, load_save_dataset
from Facenet_FYP_DY2 import model_creation,predict_name, get_embedding

from NewUserPreprocessing import load_save_dataset1
# load_save_dataset()
model_SVC, out_encoder  = model_creation()
model = load_model('C:/Users/Tanya/Desktop/FYP/FYP - Full Stack/facenet_keras.h5')

@app.route('/enroll', methods=['POST'])
def enroll():
    try:
        username = request.get_json()['username']
        path = 'newUser/train_masked/'         
        #SEPARATION INTO TRAIN AND VAL
        source_dir = 'newUser/train_masked/'+username
        target_dir = 'newUser/val_masked/'+username

        file_names = os.listdir(source_dir)
        counter = 0
        for file_name in file_names:
            if counter ==2 :
                break
            shutil.move(os.path.join(source_dir, file_name), target_dir)
            counter+=1
#         print("Okkkkkkk1")    
        global sess
        global graph
        with graph.as_default():
            set_session(sess)
#             database[username] = img_to_encoding(path, model) 
            load_save_dataset1()
#             print("OKKKKKKK 22222")
#             import NewUserEnrollment
            os.system("python NewUserEnrollment.py")
#             print("OKKKKK 3333333")

       
        # MOVING TRAIN_MASKED       
        source_dir = 'newUser/train_masked/'+username
        target_dir = 'C:/Users/Tanya/Desktop/FYP/FYP - Full Stack/5 celebrities dataset/train_masked/'+username
        
        dest = shutil.move(source_dir, target_dir)  

        # MOVING VAL_MASKED FOLDER            
        source_dir = 'newUser/val_masked/'+username
        target_dir = 'C:/Users/Tanya/Desktop/FYP/FYP - Full Stack/5 celebrities dataset/val_masked/'+username
        
        dest = shutil.move(source_dir, target_dir)  
              
        return json.dumps({"status": 200})
    except:
#         print("submitttttt")
        return json.dumps({"status": 500})

@app.route('/register', methods=['POST'])
def register():
    try:
        
        username = request.get_json()['username']
        img_data = request.get_json()['image64']
        
        if not os.path.exists('newUser/train_masked/'+username[:-1]):
            os.makedirs('newUser/train_masked/'+username[:-1])
        if not os.path.exists('newUser/val_masked/'+username[:-1]):
            os.makedirs('newUser/val_masked/'+username[:-1])
        with open('newUser/train_masked/'+username[:-1]+"/"+username+'.jpg', "wb") as fh:
            fh.write(base64.b64decode(img_data[22:]))
        
        global sess
        global graph
        with graph.as_default():
            set_session(sess)
                
        return json.dumps({"status": 200})
    except:

        return json.dumps({"status": 500})


@app.route('/verify', methods=['POST'])
def change():
    img_data = request.get_json()['image64']
    img_name = str(int(datetime.timestamp(datetime.now())))
    with open('images/'+img_name+'.jpg', "wb") as fh:
        fh.write(base64.b64decode(img_data[22:]))
    path = 'images/'+img_name+'.jpg'
    global sess
    global graph
    print("okkkkkkkkk111111")
    print(model)
#     print(model_SVC)
#     print(out_encoder)
    model_SVC,out_encoder = model_creation()
    identity = predict_name(get_embedding(model,extract_face(path)),model_SVC,out_encoder)
    

    with graph.as_default():
        set_session(sess)
        print(identity)
    os.remove(path)

    return json.dumps({"identity": str(identity)})


if __name__ == "__main__":
    app.run(debug=True)