# MobileNet Model - Machine Learning Notebook

MobileNet Model is a deep learning model for classifying food image. This model is made using transfer learning method with MobileNetV2 architecture. The following is the methodology for making the MobileNet Model.

### 1. Data Gathering
* The dataset collection method uses the data scraping method from Google and Kaggle.
* The dataset is a food image data.
* The dataset consists of 10 categories/classes, namely ayam goreng, capcay, daging rendang, gudeg, mie goreng, nasi goreng, sate ayam, soto lamongan, tahu sumedang, tempe goreng.
* The total image data is 1073 data.

### 2. Data Prepocessing
* Perform data cleaning by deleting image data that does not represent a certain category.
* The dataset is divided into 3 folders, namely train (70%), validation (20%), test (10%).
* In the data train the data augmentation method is applied to add diversity to the dataset with the following details
  ```
  rescale=1./255.
  horizontal_flip = True
  rotation_range = 0.2
  zoom_range = 0.2
  width_shift_range = 0.2
  height_shift_range = 0.2
  ```
* Resize the image to `150x150` pixels.
  ```
  img_height = 150
  img_width = 150
  ```
* Change all image color to rgb and shuffle the train and validation data so that the model does not learn from sequence patterns that may exist in the data.
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


### 3. Training Model
- Training using transfer learning method. Transfer learning is the reuse of knowledge from previously trained models to perform new tasks. The transfer learning model (pre-trained model) used is image feature extraction with MobileNetV2 architecture that has been trained on ImageNet.
- This architecture was chosen because it can produce high accuracy and produce a tflite model with a small size, making it easy to deploy on Android.
- Perform freeze layer technique on all layers on MobileNetV2. Then the transfer learning model is added with several layers to make the model accuracy more better
   * Added ```Flatten()``` layer
   * Added ```BatchNormalization()``` layer
   * Added ```Dense(units=2048, activation='relu')``` layer
   * Added ```Dropout(units=0.2)``` layer
   * Added output layer ```Dense(units=10, activation='softmax')```
- The training process uses Adam's optimizer with ```learning_rate = 0.00001```
- Training in setting with 400 epochs.
- Set the callbacks to stop training when ```acc``` and ```val_acc``` reach 95%.

### 4. Evaluate Model
![image](https://github.com/ndikrp/Balanzio/assets/142479564/96e7652b-327c-4c11-9535-c9c0fe387e12)
- Training reach 500 from 500 epoch.
- Result
  * loss        : 0.0203
  * accuracy    : 0.9911
  * val_loss    : 0.3476
  * val_accuracy: 0.9010
 
- Evaluate test data to get confusion matrix and F1-Score.
  
  ![image](https://github.com/ndikrp/Balanzio/assets/142479564/b4a2d3f9-fa8b-41f2-98e9-eea863444e79)
  * F1-Score       : 0.866
- Review the prediction.

  ![image](https://github.com/ndikrp/Balanzio/assets/142479564/d523bd91-5867-424a-91a7-1c2af63e77c1)

### 5. Export Model
- Export model to tflite format.
   ```
  # Convert the model.
  converter = tf.lite.TFLiteConverter.from_keras_model(model)
  tflite_model = converter.convert()

  # Save the model.
  with open('model.tflite', 'wb') as f:
  f.write(tflite_model)
  ```

  

