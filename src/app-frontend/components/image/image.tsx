import React, {FunctionComponent} from 'react';
import {Media} from "../../../api/model/media";
import {MEDIA_URL} from "../../../api/routing/routes/dashboard";
import {QueryString} from "../../../lib/location/query.string";

export interface ImageProps {
    image?: Media;
    h?: number;
    w?: number;
    fit?: "crop"|"contain"|"max"|"fill"|"stretch";
    q?: number;
    circle?: boolean;
    default?: string;
    fm?: "webp"|"jpg"|"pjpg"|"png"|"gif"
}

export const Image: FunctionComponent<ImageProps> = ({image, h, w, q, fit, circle, default: defaultImage, fm}) => {
    let id = 'default';
    if(typeof image === 'object' && image !== null){
        id = image?.id.toString();
    }
    
    let query = QueryString.stringify({
        q, w, h, fit, default: defaultImage, fm: fm || "webp"
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
