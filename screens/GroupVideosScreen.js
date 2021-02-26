import React, { useState, useEffect } from 'react';
import { getVideosForGroup } from '../data/ApiHelper';
import { Image, FlatList, Text, SafeAreaView, View, StyleSheet } from 'react-native';

const GroupVideosScreen = ({ route }) => {

    const { groupId } = route.params;
    console.log("group id: " + groupId);

    const [videosList, setVideosList] = useState([]);
    useEffect(() => {
        getVideosForGroup(groupId).then(fetchedVideos => setVideosList(fetchedVideos));
    }, []);

    const renderItem = ({ item }) => {
        return (
            <View>
                <Image 
                source={{uri: item["video_img_url"]}}
                style={styles.videoImg}/>
                <Text>{item["title"]}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView>
            <FlatList 
                data={videosList}
                renderItem={renderItem}
                keyExtractor={item => item["id"]}
            />            
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
        videoImg: {
            width: 60,
            height: 45
        }
});

export default GroupVideosScreen;