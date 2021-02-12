
export const addChannelToGroup = (channelId, channelName, groupId) => {
    fetch('http://dde555e60d40.ngrok.io/channels/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: channelId,
            name: channelName,
            feed: groupId
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
    fetch('http://dde555e60d40.ngrok.io/feeds/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'name': feedName })
    }).then(response => response.json())
    .then(data => console.log("posted new feed"))
}

export const getGroups = async () => {
    return await fetch('http://dde555e60d40.ngrok.io/feeds/')
        .then(response => response.json())
        .then((data) => {
            return data
        })
}

export const getChannels = async () => {
    return await fetch('http://dde555e60d40.ngrok.io/channels/')
        .then(response => response.json())
        .then((data) => {
            return data
        })
}
