import React, {FunctionComponent, useEffect, useMemo, useState} from "react";
import {formRequest, jsonRequest} from "../../../../api/request/request";
import {
  ADMIN_BANNERS_DELETE,
  ADMIN_BANNERS_LIST,
  ADMIN_BANNERS_UPLOAD
} from "../../../../api/routing/routes/backend.admin";
import {Media} from "../../../../api/model/media";
import {Image} from "../../../../app-common/components/image/image";
import {FileUploader} from "../../../../app-common/components/upload/file.uploader";


export const FeaturedBanners: FunctionComponent = () => {
  const [banners, setBanners] = useState<Media[]>([]);
  const [isLoading, setLoading] = useState(false);
  
  const initialFiles = useMemo(() => {
    let files: string[] = [];
    banners.map(banner => {
      files.push(banner.id);
    })
    
    return files;
  }, [banners]);
  
  const loadBanners = async () => {
    setLoading(true);
    try {
      let response = await jsonRequest(ADMIN_BANNERS_LIST);
      let json = await response.json();
      
      setBanners(json.banners);
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadBanners();
  }, []);
  
  const onUpload = async (files: Media[]) => {
    await files.forEach(async (file) => {
      await jsonRequest(ADMIN_BANNERS_UPLOAD, {
        method: 'POST',
        body: JSON.stringify(file)
      })
    });
    
    loadBanners();
  };
  
  const onDelete = async (index: number, newFiles: Media[]) => {
    let file = banners[index];
    if(file === undefined){
      return;
    }
    
    setLoading(true);
    try {
      let response = await jsonRequest(ADMIN_BANNERS_DELETE.replace(':id', file.id), {
        method: 'DELETE'
      });
    
      loadBanners();
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <FileUploader onUpload={onUpload} initialFiles={initialFiles} onDelete={onDelete} />
    </>
  );
};