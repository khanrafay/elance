import React, {FunctionComponent, useRef, useState} from "react";
import {request} from "../../api/request/request";
import {MEDIA_UPLOAD, MEDIA_URL} from "../../api/routing/routes/routes";
import {Media} from "../../api/model/media";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons/faSpinner";
import {Image} from "../image/image";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";

interface FileUploaderProps {
  onUpload: Function;
  onDelete?: Function;
  label?: string;
}

export const FileUploader: FunctionComponent<FileUploaderProps> = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<Media>();
  const file = useRef<HTMLInputElement>(null);
  const uploadFile = async (values: any) => {
    setLoading(true);
    console.log(values);
    
    let data = new FormData();
    if(values.target.files.length > 0) {
      data.append('file', values.target.files[0]);
    }
    
    try{
      let response = await request(MEDIA_UPLOAD, {
        body: data,
        method: 'POST'
      });
      let json = await response.json();
      
      setUploadedFile(json.media);
      
      if(typeof props.onUpload === 'function'){
        props.onUpload(json.media);
      }
      
    }catch (e) {
      // throw e;
    }finally {
      setLoading(false);
    }
  };
  
  const deleteFile = async () => {
    setLoading(true);
    setUploadedFile(undefined);
    
    if(file.current){
      file.current.value = '';
    }
    
    if(props.onDelete){
      props.onDelete();
    }
    
    setLoading(false);
  };
  
  return (
    <>
      <div className="form-group">
        <label htmlFor="file">{props.label || 'Choose file'} {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}</label>
        <input
          type="file"
          className="form-control"
          id="file"
          name="file_uploader"
          onChange={uploadFile}
          disabled={isLoading}
          ref={file}
        />
      </div>
      {uploadedFile && (
        <div className="mb-3">
          <div className="d-inline-block position-relative">
            <Image image={uploadedFile} h={200}/>
            <button type="button" className="btn btn-danger position-absolute top-0 right-0" onClick={deleteFile}>
              <FontAwesomeIcon icon={faTrash}/>
            </button>
          </div>
        </div>
      )}
      
    </>
  )
};