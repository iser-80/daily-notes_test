import { View, Text, FlatList, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import Pagination from './pagination';
import SliderItem from './sliderItem';
import { sliderData } from '../data/data';

export default function Slider() {
    const {width, height} = Dimensions.get('screen')
    const [activeIndex, setActiveIndex] = useState(0)

    const handleScroll = (event) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / width);
      setActiveIndex(index);
    };
  
    const viewabilityConfig = useRef({
      itemVisiblePercentThreshold: 50,
    }).current;

  return (
    <View className='flex-1'>
        <FlatList
            data={sliderData}
            renderItem={({ item }) => 
                <SliderItem item={item} />
            } 
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={handleScroll}
            viewabilityConfig={viewabilityConfig}
            snapToAlignment='center'
      />
      <Pagination data={sliderData} activeIndex={activeIndex} />
    </View>
  )
}