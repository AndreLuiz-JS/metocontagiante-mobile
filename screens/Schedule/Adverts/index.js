import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Image, Dimensions } from 'react-native';
import { PinchGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';


import { styles } from './styles';

export default function AdvertsScreen() {
    const [ imgSize, setImgSize ] = useState({ width: 0, height: 0, scale: 1, lastEventScale: 0 })
    const [ horizontalScrollViewNode, setHorizontalScrollViewNode ] = useState();
    const [ verticalScrollViewNode, setVerticalScrollViewNode ] = useState();
    const [ scrollOffset, setScrollOffset ] = useState({ x: 0, y: 0 })
    const imgUri = 'https://metocontagiante-backend.herokuapp.com/api/advert/file';

    useEffect(() => {
        Image.getSize(imgUri, (w, h) => {
            const width = Dimensions.get('screen').width;
            const height = Dimensions.get('screen').width / w * h;
            setImgSize({ ...imgSize, width, height })
        })
    }, [])



    return (
        <SafeAreaView style={styles.container}>
            <PinchGestureHandler
                onGestureEvent={e => {
                    const { scale: eventScale, focalX: x, focalY: y } = e.nativeEvent;
                    const { scale: imgScale, lastEventScale } = imgSize;
                    const newScale = (eventScale < 1) ? imgScale - Math.abs(lastEventScale - eventScale) : imgScale + eventScale - lastEventScale;
                    if (newScale > 1 && newScale < 2.5) {
                        setImgSize({ ...imgSize, scale: newScale, lastEventScale: eventScale });
                        horizontalScrollViewNode.scrollTo({ x, y, animated: false });
                        verticalScrollViewNode.scrollTo({ x, y, animated: false });
                    }
                }}
                onHandlerStateChange={e => {
                    if (e.nativeEvent.state === 5)
                        setImgSize({ ...imgSize, lastEventScale: 0 })
                }}
            >
                <PanGestureHandler
                    maxPointers={1}
                    onGestureEvent={e => {
                        const { translationX, translationY } = e.nativeEvent;
                        const x = scrollOffset.x - translationX;
                        const y = scrollOffset.y - translationY;
                        horizontalScrollViewNode.scrollTo({ x, y: 0, animated: true });
                        verticalScrollViewNode.scrollTo({ x: 0, y, animated: true });
                    }}
                    onHandlerStateChange={e => {
                        if (e.nativeEvent.oldState === 4) {
                            const { x: scrollOffsetX, y: scrollOffsetY } = scrollOffset;
                            const { translationX, velocityX, translationY, velocityY } = e.nativeEvent;
                            const x = scrollOffsetX - translationX - velocityX / 10;
                            const y = scrollOffsetY - translationY - velocityY / 10;
                            const offset = { x: 0, y: 0 };
                            if (x > 0 && x < scrollOffset.w) offset.x = x;
                            if (x > scrollOffset.w) offset.x = scrollOffset.w;
                            if (y > 0 && y < scrollOffset.h) offset.y = y;
                            if (y > scrollOffset.h) offset.y = scrollOffset.h;
                            setScrollOffset({ ...scrollOffset, ...offset });
                            horizontalScrollViewNode.scrollTo({ x: offset.x, y: 0, animated: true });
                            verticalScrollViewNode.scrollTo({ x: 0, y: offset.y, animated: true });
                        }
                    }}
                >
                    <ScrollView style={styles.adverts}
                        ref={node => setVerticalScrollViewNode(node)}
                        onContentSizeChange={(w, h) => setScrollOffset({ ...scrollOffset, w: imgSize.width * imgSize.scale - Dimensions.get('screen').width, h: h - imgSize.height })}
                    >
                        <ScrollView style={styles.adverts}
                            horizontal={true}
                            ref={node => setHorizontalScrollViewNode(node)}
                        >

                            <Image
                                style={{
                                    width: imgSize.width * imgSize.scale,
                                    height: imgSize.height * imgSize.scale,
                                }}
                                source={{ uri: imgUri, cache: true }}
                            />
                        </ScrollView>
                    </ScrollView>
                </PanGestureHandler>
            </PinchGestureHandler>
        </SafeAreaView >
    )
} 