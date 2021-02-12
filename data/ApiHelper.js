
export const addChannelToGroup = (channelId, channelName, groupId) => {
    fetch('http://375417ee5b3b.ngrok.io/channels/', {
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

export const getGroups = async () => {
    var groups = null
    return await fetch('http://375417ee5b3b.ngrok.io/feeds/')
    .then(response => response.json())
    .then((data) => {
        return data
    })
}
