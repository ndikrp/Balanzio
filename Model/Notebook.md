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
