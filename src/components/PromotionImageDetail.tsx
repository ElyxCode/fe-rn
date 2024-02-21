import React from 'react';
import {Image} from 'react-native';

type imageProps = {
  image: string;
  height: number;
};

export const PromotionImageDetail = ({image, height}: imageProps) => {
  return (
    <Image
      resizeMode="stretch"
      source={{uri: image}}
      height={height}
      style={{
        borderRadius: 12,
        marginHorizontal: 20,
      }}
    />
  );
};
