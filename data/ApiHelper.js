
export const addChannelToGroup = (channelId, channelName, groupId) => {
    // console.log('group id: ' + groupId)
    // return 'ddd'
    fetch('http://945b65311d57.ngrok.io/channels/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: channelId,
            name: channelName,
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

export const createNewFeed = async (feedName) => {
    fetch('http://945b65311d57.ngrok.io/feeds/', {
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
    return await fetch('http://945b65311d57.ngrok.io/feeds/' + groupId + '/')
    .then(response => response.json())
    .then((data) => {
        return data
    })
}

export const getGroups = async () => {
    return await fetch('http://945b65311d57.ngrok.io/feeds/')
        .then(response => response.json())
        .then((data) => {
            return data
        })
}

export const getChannels = (nextPageToken = '', channels = []) => {
    // return await fetch('http://945b65311d57.ngrok.io/channels/')
    //     .then(response => response.json())
    //     .then((data) => {
    //         return data
    //     })
    url = 'http://945b65311d57.ngrok.io/channels/' 
        + (nextPageToken !== '' 
        ? '?nextPageToken=' + nextPageToken 
        : '');
    return new Promise((resolve, reject) => {fetch(url)
        .then(response => {
            if (response.status !== 200) {
                throw `${response.status}: ${response.statusText}`;
            }
            response.json()
            .then(data => {
                channels = channels.concat(data);
                if ("nextPageToken" in data) {
                    resolve(getChannels(data["nextPageToken"], channels));
                } else {
                    console.log("resolving promise");
                    channels = channels[0];
                    delete channels["nextPageToken"];
                    resolve(channels);
                }
            }).catch(err => reject(new Error(err.message)));
        }).catch(err => reject(new Error(err.message)))});
}
