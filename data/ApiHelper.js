
export const addChannelToGroup = (channelId, groupId) => {
    fetch('http://b21376844d94.ngrok.io/channel/update-partial/' + channelId + '/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"pk": channelId, "feed_id": groupId})
    })
    .then(response => response.json())
    .then(data => console.log("added channel to group"))
}

export const getGroups = async () => {
    var groups = null
    return await fetch('http://46e56975047d.ngrok.io/feeds/')
    .then(response => response.json())
    .then((data) => {
        return data
    })
}
