# Upload-to-S3-from-React

An easy to guide to setup an AWS S3 bucket and upload files to it from a React frontend

Steps to follow

1. Create the AWS S3 bucket as mentioned [here](https://medium.com/p/fbd8f0b26f5/)
2. copy content from s3_bucket_permission_config.js to bucket -> permission -> Cross-origin resource sharing (CORS)

3. Clone this repository
4. Run `npm install`

   We are using aws sdk, this repo has been updated to  facilitate the file uploads to th S3 bucket with progress bar
5. Create a `.env` file at the root of the repository and add the details in the following format

    ```
    REACT_APP_BUCKET_NAME=your-bucket-name
    REACT_APP_REGION=add the location of your bucket (eg: us-west-2)
    REACT_APP_ACCESS=got-from-the-security-credentials
    REACT_APP_SECRET=got-from-the-security-credentials
    ```
6. Run `npm start` to start the server on `PORT 3000` 

On uploading a file, it will get uploaded to the S3 bucket!
