import React, {useState} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {useGetGalleryPhotosQuery} from './gallery.service';
import Lightbox from 'react-native-lightbox-v2';
import {GalleryRoot} from '../../types';

export const GalleryListScreen = () => {
  const [page, setPage] = useState(1);

  const {data} = useGetGalleryPhotosQuery(page);

  const renderItem = ({item}: {item: GalleryRoot}) => {
    return (
      <Lightbox
        style={{flex: 1, margin: 8}}
        renderContent={() => (
          <Image
            source={{uri: item.cover_photo.urls.regular}}
            style={{width: '100%', height: 150, borderRadius: 9}}
          />
        )}>
        <View>
          <Text>{item.title}</Text>
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
