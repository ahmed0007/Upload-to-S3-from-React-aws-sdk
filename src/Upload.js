import AWS from 'aws-sdk';
import React , {useState} from 'react';
// installed using npm install buffer --save
window.Buffer = window.Buffer || require("buffer").Buffer;

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    // dirName
    // the configuration information is fetched from the .env file
      const uploadfile = (fileName, file, folderName) => {
        const bucketName = process.env.REACT_APP_BUCKET_NAME;
        const region = process.env.REACT_APP_REGION;
        const accessKeyId = process.env.REACT_APP_ACCESS;
        const secretAccessKey = process.env.REACT_APP_SECRET;
        var bucket = new AWS.S3({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            // sessionToken: "SESSION_TOKEN", // optional you can remove if you don't want pass
            region: region
        });
        console.log({bucketName} );
        const params = {
          Bucket: bucketName,
          Key: folderName + fileName,
          Body: file,
          ContentType: file.type
        };
        return bucket.upload(params, function(err, data) {
     
          if (err) {
            console.log('There was an error uploading your file: ', err);
            return false;
          }
          console.log('Successfully uploaded file.', data);
          return true;
        });
      }


      const tuuid  = (oldname) => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        const parts = oldname.replace(/[\s-]/g, '_').split('.');
        const extention = parts[parts.length - 1];
        parts.pop();
        return  parts.join('-') + '_' + mm + '_' + dd + '_' + yyyy + '.' + extention;
        
      }
     
      const uploadSampleFile = () => {
        var progressDiv = document.getElementById("myProgress");
        var progressBar = document.getElementById("myBar");
        let file = document.getElementById("myFile").files[0];

        let folderName = "course.images/";
        let uniqueFileName = tuuid(file.name); 
        let fileUpload = {
          id: "",
          name: file.name,
          nameUpload: uniqueFileName,
          size: file.size,
          type: "",
          timeReference: 'Unknown',
          progressStatus: 0,
          displayName: file.name,
          status: 'Uploading..',
        }
        uploadfile(uniqueFileName, file, folderName)
          .on('httpUploadProgress', function(progress) {
            let progressPercentage = Math.round(progress.loaded / progress.total * 100);
            console.log(progressPercentage);
            progressBar.style.width = progressPercentage + "%";
            if (progressPercentage < 100) {
              fileUpload.progressStatus = progressPercentage;
     
            } else if (progressPercentage == 100) {
              fileUpload.progressStatus = progressPercentage;
     
              fileUpload.status = "Uploaded";
            }
          })
      }
    


    return <div>
        
        <input type="file" id="myFile" multiple size="50" onChange={uploadSampleFile}/>
        <br></br>    
        <div id="myProgress">      
            <div id="myBar"></div>    
        </div>  
        
    </div>
}

export default Upload;