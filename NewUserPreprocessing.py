

# confirm mtcnn was installed correctly
import mtcnn
# print version
print(mtcnn.__version__)


# In[4]:


# face detection for the 5 Celebrity Faces Dataset
from os import listdir
from os.path import isdir
from PIL import Image
from matplotlib import pyplot
import numpy as np
from numpy import savez_compressed
from numpy import asarray
from mtcnn.mtcnn import MTCNN
import cv2
import dlib


# In[5]:


## extracting face under one folder alone
#warnings.filterwarnings("ignore") 
# extract a single face from a given photograph
def extract_face(filename, required_size=(160, 160)):
    
    image = cv2.cvtColor(cv2.imread(filename), cv2.COLOR_BGR2RGB)
    #using MTCNN for detecting features
    detector = MTCNN()
    results = (detector.detect_faces(image))
    print(results)

    if not results:
      
          print("no result")
          return None
    else: 

        bounding_box = results[0]['box']
        keypoints = results[0]['keypoints']
        r = dlib.rectangle(bounding_box[0], bounding_box[1], bounding_box[0]+bounding_box[2], bounding_box[1] + bounding_box[3])     

        crop_img = image[bounding_box[1]:bounding_box[1]+ bounding_box[3], bounding_box[0]:bounding_box[0]+bounding_box[2]]
        crop_img1 = cv2.cvtColor(crop_img, cv2.COLOR_BGR2RGB)
        scale_percent = 220 # percent of original size
        width = int(crop_img1.shape[1] * scale_percent / 100)
        height = int(crop_img1.shape[0] * scale_percent / 100)
        dim = (width, height)
        # resize image
        resized = cv2.resize(crop_img1, dim, interpolation = cv2.INTER_AREA)
        reimage = cv2.resize(resized, (160,160), interpolation = cv2.INTER_AREA)
        face_array = asarray(reimage)      
        return face_array
 





 # New section

# In[7]:




# load images and extract faces for all images in a directory
def load_faces(directory):
	faces = list()
	# enumerate files
	for filename in listdir(directory):
		# path
		path = directory + filename
		# get face
		face = extract_face(path)
		# store
		if face is not None:
			faces.append(face)
	return faces
 
# load a dataset that contains one subdir for each class that in turn contains images
def load_dataset(directory):
	X, y = list(), list()
	# enumerate folders, on per class
	for subdir in listdir(directory):
		# path
		path = directory + subdir + '/'
		# skip any files that might be in the dir
		if not isdir(path):
			continue
		# load all faces in the subdirectory
		faces = load_faces(path)
		# create labels
		labels = [subdir for _ in range(len(faces))]
		# summarize progress
		print('>loaded %d examples for class: %s' % (len(faces), subdir))
		# store
		X.extend(faces)
		y.extend(labels)
	return asarray(X), asarray(y)
 
def load_save_dataset1():
    print("LOADEDDDDDDD")
  # load MASKED train dataset
    trainX, trainy = load_dataset('C:/Users/Tanya/Desktop/FYP/facial-recognition-login-master/py side/newUser/train_masked/')
  # print(trainX.shape, trainy.shape)
  # load test dataset
    testX, testy = load_dataset('C:/Users/Tanya/Desktop/FYP/facial-recognition-login-master/py side/newUser/val_masked/')
  # save arrays to one file in compressed format
  # print(trainX,trainy)
    print('Loaded: ', trainX.shape, trainy.shape, testX.shape, testy.shape)
    savez_compressed('C:/Users/Tanya/Desktop/FYP/FYP - Full Stack/new_user_masked.npz', trainX, trainy, testX, testy)

    data = np.load('C:/Users/Tanya/Desktop/FYP/FYP - Full Stack/new_user_masked.npz')

    trainX, trainy, testX, testy = data['arr_0'], data['arr_1'], data['arr_2'], data['arr_3']
    print('Loaded: ', trainX.shape, trainy.shape, testX.shape, testy.shape)
print("RUNNING NEW USER PREPROCESSING")
# load_save_dataset()


# In[ ]:




