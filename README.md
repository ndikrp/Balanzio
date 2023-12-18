# BALANZIO_MACHINE LEARNING 
![Balanzio](https://github.com/ndikrp/Balanzio/blob/2fbd99f001acf4ae1090a2943bb85a5d47ceec78/assets/balanzio-datar.png)

HELLO, We are the Machine Learning team of Balanzio!

The Balanzio model is an architectural model used by the Balanzio application to be able to produce accurate food image predictions.

# Instructions
## 1. Install Packages & Libraries
 ```
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import os
import matplotlib.pyplot as plt
import numpy as np
from sklearn.metrics import confusion_matrix, f1_score
  ```
## 2. Data Gathering
- Load [dataset](https://drive.google.com/drive/folders/14UEZ12_-2ohkbi6r8T6aE0cLlHbhgeLP?usp=drive_link)
 ```
train_dir = "/content/drive/MyDrive/Dataset/Train"
val_dir = "/content/drive/MyDrive/Dataset/Valid"
test_dir = "/content/drive/MyDrive/Dataset/Test"
  ```
## 3. Data Prepocessing
- Perform data augmentation for data train, valid, and test to add diversity to the dataset with the following details
```
  rescale=1./255.
  horizontal_flip = True
  rotation_range = 0.2
  zoom_range = 0.2
  width_shift_range = 0.2
  height_shift_range = 0.2
  ```
- Resize the image to `150x150` pixels.
  ```
  img_height = 150
  img_width = 150
  ```
- Change all image color to rgb and shuffle the train and validation data so that the model does not learn from sequence patterns that may exist in the data.
  ```
  train_ds = train_generator.flow_from_directory(
    directory = train_dir,
    target_size = (img_height, img_width),
    color_mode = 'rgb',
    class_mode = 'categorical',
    batch_size = train_batch_size,
    shuffle = True,
    seed = 42,
  )

  val_ds = val_generator.flow_from_directory(
    directory = val_dir,
    target_size = (img_height, img_width),
    color_mode = 'rgb',
    class_mode = 'categorical',
    batch_size = val_batch_size,
    shuffle = True,
    seed = 42,
  )

  test_ds = test_generator.flow_from_directory(
    directory = test_dir,
    target_size = (224, 224),
    color_mode = 'rgb',
    class_mode = 'categorical',
    batch_size = test_batch_size,
    shuffle = False
  )
  ```
## 4. Training Model
## 5. Evaluate Model
## 6. Export Model
