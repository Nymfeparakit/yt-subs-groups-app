import React, { useState, useEffect } from 'react';
import { getVideosForGroup } from '../data/ApiHelper';

const GroupVideosScreen = ({ route }) => {

    const { groupId } = route.params;
    console.log("group id: " + groupId);

    const [videosList, setVideosList] = useState([]);
    useEffect(() => {
        getVideosForGroup(groupId).then(fetchedVideos => console.log(fetchedVideos));
    }, []);

};

export default GroupVideosScreen;