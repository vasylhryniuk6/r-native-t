import {FlatList, Image, StyleSheet, View} from 'react-native';

import React, {useState} from 'react';

import {useGetGalleryPhotosQuery} from './gallery.service';
import Lightbox from 'react-native-lightbox-v2';
import {GalleryRoot} from '../../types';

export const GalleryScreen = () => {
  const [page, setPage] = useState(1);
  const {data} = useGetGalleryPhotosQuery(page);

  const renderItem = ({item}: {item: GalleryRoot}) => (
    //this error fixed by adding a propsWithChildren to the core node_modules packege react-native-lightbox-v2
    <Lightbox
      style={styles.container}
      renderContent={() => {
        return (
          <Image
            source={{uri: item.cover_photo.urls.regular}}
            style={styles.imageBox}
          />
        );
      }}>
      <View>
        <Image
          source={{uri: item.cover_photo.urls.regular}}
          style={styles.image}
        />
      </View>
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
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 100,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 9,
  },
  imageBox: {
    width: '100%',
    height: 300,
    borderRadius: 9,
  },
});
