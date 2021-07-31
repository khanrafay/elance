import React, {FunctionComponent, useCallback, useEffect, useRef, useState} from "react";
import {request} from "../../../api/request/request";
import {MEDIA_UPLOAD_MULTIPLE} from "../../../api/routing/routes/backend.app";
import {Media} from "../../../api/model/media";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons/faSpinner";
import {Image} from "../image/image";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {getErrorClass, getErrors} from "../../../lib/error/error";

interface FileUploaderProps {
  onUpload: Function;
  onDelete?: Function;
  label?: string;
  errorElement?: any;
  initialFiles?: string[];
}

export const FileUploader: FunctionComponent<FileUploaderProps> = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<Media[]>([]);
  const file = useRef<HTMLInputElement>(null);
  
  const uploadFile = useCallback(async (values: any) => {
    setLoading(true);
    
    let data = new FormData();
    if (values.target.files.length > 0) {
      Object.values(values.target.files).forEach((file: any) => {
        data.append('file[]', file);
      });
    }
    
    try {
      let response = await request(MEDIA_UPLOAD_MULTIPLE, {
        body: data,
        method: 'POST'
      });
      let json: {data: Media[]} = await response.json();
      
      setUploadedFile(json.data);
  
      if (file.current) {
        file.current.value = '';
      }
      
      if (typeof props.onUpload === 'function') {
        props.onUpload(json.data);
      }
      
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  }, [props.onUpload]);
  
  const deleteFile = async (index: number) => {
    if(!window.confirm('Delete file?')){
      return false;
    }
    setLoading(true);
    
    let files = [...uploadedFile];
    files.splice(index, 1);
    
    setUploadedFile(files);
    
    if (file.current) {
      file.current.value = '';
    }
    
    if (props.onDelete) {
      props.onDelete(index, files);
    }
    
    setLoading(false);
  };
  
  useEffect(() => {
    if(props.initialFiles) {
      setUploadedFile(props.initialFiles.map(i => {return {id: i, orgFileName: ''}}));
    }
  }, [props.initialFiles]);
  
  return (
    <>
      <div className="form-group">
        <label htmlFor="file">{props.label || 'Choose file'} {isLoading &&
        <FontAwesomeIcon icon={faSpinner} spin />}</label>
        <input
          type="file"
          className={`form-control ${getErrorClass(props.errorElement)}`}
          id="file"
          name="file_uploader"
          onChange={uploadFile}
          disabled={isLoading}
          ref={file}
          multiple
        />
        {getErrors(props.errorElement)}
      </div>
      <div className="row">
        {uploadedFile && uploadedFile.map((file, index) => (
          <div className="col-3 mb-3" key={index}>
            <div className="d-inline-block position-relative">
              <Image image={file} w={200} />
              <button type="button" className="btn btn-danger position-absolute top-0 right-0" onClick={() => deleteFile(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
};