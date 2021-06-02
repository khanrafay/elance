import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'TimeAgoElement': any; // The 'any' just for testing purposes
    }
  }
}