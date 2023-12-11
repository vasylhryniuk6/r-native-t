import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {useGetGalleryPhotosQuery} from './gallery.service';
import Lightbox from 'react-native-lightbox-v2';
import {GalleryRoot} from '../../types';

export const GalleryListScreen = () => {
  const [page, setPage] = useState(1);

  const {data} = useGetGalleryPhotosQuery(page);

  const renderItem = ({item}: {item: GalleryRoot}) => {
    return (
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
          <Text>{`${item.user.first_name} ${item.user.last_name}`}</Text>
        </View>
      </Lightbox>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}${item.title}`}
        numColumns={2}
        onEndReached={() => setPage(page + 1)}
      />
    </View>
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
    height: 100,
    borderRadius: 9,
    marginBottom: 5,
  },
  imageBox: {
    width: '100%',
    height: 300,
    borderRadius: 9,
  },
});
