import React from 'react'
import { View, ScrollView, Text, Image, Dimensions } from 'react-native'
import { styles } from './styles';

const screenWidth = Dimensions.get('screen').width;

export const Carousel = (props) => {
    const [ ref, setRef ] = React.useState();
    const [ autoScroll, setAutoScroll ] = React.useState(true);
    const [ scrollToX, setScrollToX ] = React.useState(0);
    const { images } = props;
    const itemsPerInterval = props.itemsPerInterval === undefined
        ? 1
        : props.itemsPerInterval;

    const [ interval, setInterval ] = React.useState(1);
    const [ intervals, setIntervals ] = React.useState(1);
    const [ width, setWidth ] = React.useState(0);

    const init = (width) => {
        // initialise width
        setWidth(width);
        // initialise total intervals
        const totalItems = images.length;
        setIntervals(Math.ceil(totalItems / itemsPerInterval));
    }

    const getInterval = (offset) => {
        for (let i = 1; i <= intervals; i++) {
            if (offset < (width / intervals) * i) {
                return i;
            }
            if (i == intervals) {
                return i;
            }
        }
    }

    let bullets = [];
    for (let i = 1; i <= intervals; i++) {
        bullets.push(
            <Text
                key={i}
                style={{
                    ...styles.bullet,
                    opacity: interval === i ? 0.5 : 0.1
                }}
            >
                &bull;
        </Text>
        );
    }

    React.useEffect(() => {
        if (ref && autoScroll)
            ref.scrollTo({ x: scrollToX, y: 0, animated: true });
        setTimeout(() => setScrollToX((scrollToX + width / intervals) >= width ? 0 : scrollToX + width / intervals), 7000)
    }, [ scrollToX, autoScroll, width ])

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal={true}
                contentContainerStyle={{ ...styles.scrollView, width: (screenWidth) * intervals }}
                showsHorizontalScrollIndicator={false}
                onContentSizeChange={(w, h) => init(w)}
                onScroll={data => {
                    setWidth(data.nativeEvent.contentSize.width);
                    setInterval(getInterval(data.nativeEvent.contentOffset.x));
                }}
                scrollEventThrottle={200}
                pagingEnabled
                decelerationRate="fast"
                ref={scrollViewReference => setRef(scrollViewReference)}
                onTouchStart={() => setAutoScroll(false)}
                onTouchEnd={() => setAutoScroll(true)}
            >
                {images.map((item, index) => {
                    return (
                        <Image
                            key={index}
                            source={{ uri: item.source }}
                            style={styles.image}
                            width={screenWidth}
                            height={screenWidth / 2.25}
                        />
                    );
                }
                )}
            </ScrollView>
            <View style={styles.bullets}>
                {bullets}
            </View>
        </View>
    )
}

export default Carousel;