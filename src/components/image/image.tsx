import React, {FunctionComponent} from 'react';
import {Media} from "../../api/model/media";
import {MEDIA_URL} from "../../api/routing/routes/dashboard";

export interface ImageProps {
    image: Media;
    h?: number;
    w?: number;
    fit?: string;
    q?: number;
    circle?: boolean;
}

export const Image: FunctionComponent<ImageProps> = ({image, h, w, q, fit, circle}) => {
    return (
        <>
            <img
                src={`${MEDIA_URL.replace(':id', image.id.toString())}?${q ? `q=${q}&` : ''}${w ? `w=${w}&` : ''}${h ? `h=${h}&` : ''}${fit ? `fit=${fit}&` : ''}`}
                alt={image.orgFileName}
                className={`img-fluid${circle ? ' rounded-circle' : ''}`}
            />
        </>
    );
};
