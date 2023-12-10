import {FlatList, Image} from 'react-native';

import React, {useState} from 'react';

import {useGetGalleryPhotosQuery} from './gallery.service';
import Lightbox from 'react-native-lightbox-v2';
import {GalleryRoot} from '../../types';

export const GalleryScreen = () => {
  const [page, setPage] = useState(1);
  const {data} = useGetGalleryPhotosQuery(page);

  const renderItem = ({item}: {item: GalleryRoot}) => (
    <Lightbox style={{flex: 1, margin: 8}}>
      <Image
        source={{uri: item.cover_photo.urls.regular}}
        style={{width: '100%', height: 150, borderRadius: 8}}
      />
    </Lightbox>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={2}
      onEndReached={() => setPage(page + 1)}
    />
  );
};
