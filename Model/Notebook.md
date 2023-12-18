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
* Resize the image to `150x150` pixels.
* Change all image color to rgb.
* In the data train the data augmentation method is applied to add diversity to the dataset with the following details
  ```
  horizontal_flip = True
  rotation_range = 0.2
  zoom_range = 0.2
  width_shift_range = 0.2
  height_shift_range = 0.2
  ```

### 3. Training Model
- Training using transfer learning method. Transfer learning is the reuse of knowledge from previously trained models to perform new tasks. The transfer learning model (pre-trained model) used is image feature extraction with MobileNetV2 architecture that has been trained on ImageNet.
- This architecture was chosen because it can produce high accuracy and produce a tflite model with a small size, making it easy to deploy on Android.
- Perform freeze layer technique on all layers on MobileNetV2. Then the transfer learning model is added with several layers to make the model accuracy more better
   * Added ```Flatten()``` layer
   * Added ```Dense(units=2048, activation='relu')``` layer
   * Added ```Dense(units=2048, activation='relu')``` layer
   * Added ```Dropout(units=0.2)``` layer
   * Added output layer ```Dense(units=10, activation='softmax')```
- The training process uses Adam's optimizer with ```learning_rate = 0.00001```
- Training in setting with 500 epochs.
- Set the callbacks to stop training when ```acc``` and ```val_acc``` reach 95%.

