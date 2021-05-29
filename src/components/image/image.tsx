import React, {FunctionComponent} from 'react';
import {Media} from "../../api/model/media";
import {MEDIA_URL} from "../../api/routing/routes/dashboard";
import {QueryString} from "../../lib/location/query.string";

export interface ImageProps {
    image?: Media;
    h?: number;
    w?: number;
    fit?: string;
    q?: number;
    circle?: boolean;
    default?: string;
}

export const Image: FunctionComponent<ImageProps> = ({image, h, w, q, fit, circle, default: defaultImage}) => {
    let id = 'default';
    if(typeof image === 'object' && image !== null){
        id = image?.id.toString();
    }
    
    let query = QueryString.stringify({
        q, w, h, fit, default: defaultImage
    });
    
    return (
        <>
            <img
                src={`${MEDIA_URL.replace(':id', id)}?${query}`}
                alt={image?.orgFileName}
                className={`img-fluid${circle ? ' rounded-circle' : ''}`}
            />
        </>
    );
};
