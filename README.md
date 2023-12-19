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
  train_generator = tf.keras.preprocessing.image.ImageDataGenerator(
    rescale=1./255.,
    horizontal_flip = True,
    rotation_range = 0.2,
    zoom_range = 0.2,
    width_shift_range = 0.2,
    height_shift_range = 0.2,
  )

   val_generator = tf.keras.preprocessing.image.ImageDataGenerator(
    rescale=1./255.
  )
   test_generator = tf.keras.preprocessing.image.ImageDataGenerator(
    rescale=1./255.
  )
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
- Training using transfer learning method. Transfer learning is the reuse of knowledge from previously trained models to perform new tasks. The transfer learning model (pre-trained model) used is image feature extraction with MobileNetV2 architecture that has been trained on ImageNet.
- This architecture was chosen because it can produce high accuracy and produce a tflite model with a small size, making it easy to deploy on Android.
- Perform freeze layer technique on all layers on MobileNetV2. Then the transfer learning model is added with several layers to make the model accuracy more better
   * Added ```Flatten()``` layer
   * Added ```BatchNormalization()``` layer
   * Added ```Dense(units=2048, activation='relu')``` layer
   * Added ```Dropout(units=0.5)``` layer
   * Added output layer ```Dense(units=10, activation='softmax')```
- The training process uses Adam's optimizer with ```learning_rate = 0.00001```
- Training in setting with 400 epochs.
- Set the callbacks to stop training when ```acc``` and ```val_acc``` reach 95%.
  
## 5. Evaluate Model
- Evaluate the model by looking at the accuracy and loss graphs.
  ```
  acc = history.history['acc']
  val_acc = history.history['val_acc']

  loss = history.history['loss']
  val_loss = history.history['val_loss']

  epochs_range = range(len(acc))

  plt.figure(figsize=(8, 8))
  plt.subplot(1, 2, 1)
  plt.plot(epochs_range, acc, label='Training Accuracy')
  plt.plot(epochs_range, val_acc, label='Validation Accuracy')
  plt.legend(loc='lower right')
  plt.title('Training and Validation Accuracy')

  plt.subplot(1, 2, 2)
  plt.plot(epochs_range, loss, label='Training Loss')
  plt.plot(epochs_range, val_loss, label='Validation Loss')
  plt.legend(loc='upper right')
  plt.title('Training and Validation Loss')
  plt.show()
  ``` 
- Evaluate test data to get confusion matrix and F1-Score.
  ```
  predictions = model.predict(test_ds)
  y_pred = np.argmax(predictions, axis=1)
  print("y_pred :",y_pred,"\n")
  y_true = test_ds.classes
  print("y_true :",y_true,"\n")
  confusion = confusion_matrix(y_true, y_pred)
  
  plt.figure(figsize=(8, 6))
  plt.imshow(confusion, cmap=plt.cm.Blues)
  plt.title('Confusion Matrix')
  plt.colorbar()

  num_classes = len(np.unique(y_true))
  tick_marks = np.arange(num_classes)
  plt.xticks(tick_marks, range(num_classes))
  plt.yticks(tick_marks, range(num_classes))

  plt.xlabel('Predicted')
  plt.ylabel('True')

  for i in range(num_classes):
    for j in range(num_classes):
        plt.text(j, i, confusion[i, j],
                 horizontalalignment='center',
                 color='white' if confusion[i, j] > (confusion.max() / 2) else 'black')

  plt.tight_layout()
  plt.show()

  f1 = f1_score(y_true, y_pred, average='weighted')
  print("\nF1 Score:", f1)
  ``` 
## 6. Export Model
- Export model to tflite format.
   ```
  converter = tf.lite.TFLiteConverter.from_keras_model(model)
  tflite_model = converter.convert()
  with open('model.tflite', 'wb') as f:
  f.write(tflite_model)
  ```
## 7. Result
The results can be seen in the following [link](https://github.com/ndikrp/Balanzio/blob/Machine-Learning/Model/Notebook.md)
