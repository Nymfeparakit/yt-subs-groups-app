import React, { useState, useEffect } from 'react';
import { getVideosForGroup } from '../data/ApiHelper';
import { Image, FlatList, Text, SafeAreaView, View, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';
import { TouchableOpacity } from 'react-native-gesture-handler';

const GroupVideosScreen = ({ route }) => {

    const { groupId } = route.params;
    console.log("group id: " + groupId);

    const [videosList, setVideosList] = useState([]);
    useEffect(() => {
        getVideosForGroup(groupId).then(fetchedVideos => setVideosList(fetchedVideos));
    }, []);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
            onPress={() => Linking.openURL('https://www.youtube.com/watch?v=' + item["id"])}>
                <View style={styles.container}>
                    <Image 
                    source={{uri: item["video_img_url"]}}
                    style={styles.videoImg}/>
                    <Text style={styles.videoTitle}>{item["title"]}</Text>
                </View>
            </TouchableOpacity>
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
        container: {
            marginHorizontal: 10
        },
        videoImg: {
            width: 120,
            height: 90
        },
        videoTitle: {
            fontWeight: 'bold',
            marginTop: 5,
            marginBottom: 20
        }
});

export default GroupVideosScreen;