import { OTHER_GROUP_ID } from '../constants/Constants'

const API_URL = 'http://51116cf96cb0.ngrok.io/';

export const addChannelToGroup = (channelId, groupId) => {
    if (groupId == OTHER_GROUP_ID) {
        return deleteChannel(channelId);
    }
    fetch(`${API_URL}channels/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: channelId,
            feed_id: groupId
        })
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status)
            }
            return response.json()
        })
        .then(data => console.log(data))
}

export const deleteChannel = async (channelId) => {
    return await fetch(`${API_URL}channels/` + channelId + '/', {
        method: 'DELETE'
    })
        // .then(response => response.json())
        // .then(data => { return data; })
}

export const createNewFeed = async (feedName) => {
    fetch(`${API_URL}feeds/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: feedName })
    }).then(response => response.json())
        .then(data => console.log("posted new feed"))
}

export const getVideosForGroup = async (groupId) => {
    return await fetch(`${API_URL}feeds/` + groupId + '/')
        .then(response => response.json())
        .then((data) => {
            return data
        })
}

export const getGroups = async () => {
    return await fetch(`${API_URL}feeds/`)
        .then(response => response.json())
        .then((data) => {
            return data["results"];
        })
}

export const deleteGroup = async (groupId) => {
    return await fetch(`${API_URL}feeds/` + groupId + '/', {
        method: 'DELETE'
    })
    // .then(response => response.json())
    // .then(data => { return data; });
}

const mergeChannelJSONObjs = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    // union keys without duplicates
    const keys_union = keys1.concat(keys2.filter((item) => keys1.indexOf(item) < 0));
    const result = {};
    keys_union.forEach(function (key) {
        if (obj1[key]) {
            result[key] = [...obj1[key]];
            obj2[key].forEach((channel => {
                if (result[key].find(o => o["id"] === channel["id"]) === undefined) {
                    result[key].push(channel);
                }
            }));
        } else {
            result[key] = [...obj2[key]];
        }
    });
    return result;
}

export const getChannels = (nextPageToken = '', channels = {}) => {
    url = `${API_URL}channels/`
        + (nextPageToken !== ''
            ? '?nextPageToken=' + nextPageToken
            : '');
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(response => {
            if (response.status !== 200) {
                throw `${response.status}: ${response.statusText}`;
            }
            response.json()
                .then(data => {
                    nextPageToken = data["nextPageToken"];
                    console.log("next page token: " + nextPageToken);
                    if ("nextPageToken" in data) {
                        delete data["nextPageToken"];
                    }
                    channels = mergeChannelJSONObjs(channels, data);
                    if (nextPageToken !== undefined && nextPageToken !== '') {
                        resolve(getChannels(nextPageToken, channels));
                    } else {
                        console.log("resolving promise");
                        resolve(channels);
                    }
                }).catch(err => reject(new Error(err.message)));
        }).catch(err => reject(new Error(err.message)))
    });
}
