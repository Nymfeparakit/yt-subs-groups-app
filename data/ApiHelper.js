
export const addChannelToGroup = (channelId, channelName, groupId) => {
    // console.log('group id: ' + groupId)
    // return 'ddd'
    fetch('http://8659686f3108.ngrok.io/channels/', {
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
    fetch('http://8659686f3108.ngrok.io/feeds/', {
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
    return await fetch('http://c04ea33bef51.ngrok.io/feeds/' + groupId + '/')
    .then(response => response.json())
    .then((data) => {
        return data
    })
}

export const getGroups = async () => {
    return await fetch('http://8659686f3108.ngrok.io/feeds/')
        .then(response => response.json())
        .then((data) => {
            return data
        })
}

export const getChannels = async () => {
    // return await fetch('http://c04ea33bef51.ngrok.io/channels/')
    //     .then(response => response.json())
    //     .then((data) => {
    //         return data
    //     })
    return new Promise((resolve, reject) => fetch(url)
        .then(response => {
            if (response.status !== 200) {
                throw `${response.status}: ${response.statusText}`;
            }
            response.json()
            .then(data => {
                channels = channels.concat(data);
                // if ()
            })
        })
    )
}
