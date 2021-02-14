
export const addChannelToGroup = (channelId, channelName, groupId) => {
    // console.log('group id: ' + groupId)
    // return 'ddd'
    fetch('http://8a11e5b6f41b.ngrok.io/channels/', {
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
    fetch('http://8a11e5b6f41b.ngrok.io/feeds/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: feedName })
    }).then(response => response.json())
    .then(data => console.log("posted new feed"))
}

export const getGroups = async () => {
    return await fetch('http://8a11e5b6f41b.ngrok.io/feeds/')
        .then(response => response.json())
        .then((data) => {
            return data
        })
}

export const getChannels = async () => {
    return await fetch('http://8a11e5b6f41b.ngrok.io/channels/')
        .then(response => response.json())
        .then((data) => {
            return data
        })
}
