import {FlatList, Image, StyleSheet} from 'react-native';

import React, {useState} from 'react';

import {useGetGalleryPhotosQuery} from './gallery.service';
import Lightbox from 'react-native-lightbox-v2';
import {GalleryRoot} from '../../types';

export const GalleryScreen = () => {
  const [page, setPage] = useState(1);
  const {data} = useGetGalleryPhotosQuery(page);

  const renderItem = ({item}: {item: GalleryRoot}) => (
    //this error fixed by adding a propsWithChildren to the core node_modules packege react-native-lightbox-v2
    <Lightbox style={styles.container}>
      <Image
        source={{uri: item.cover_photo.urls.regular}}
        style={styles.image}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 9,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 9,
  },
});
