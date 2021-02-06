
const addChannelToGroup = (channelId, groupId) => {
    fetch('http://....ngrok.io/channel/update-partial/' + channelId + '/', {
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

const getGroups = () => {
    groups = null
    fetch('')
    .then(response => response.json())
    .then(data => groups = data)
    return groups
}