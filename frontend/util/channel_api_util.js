export const fetchAllChannels = (user) => {
	return $.ajax({
	  url: `api/users/${user.id}`,
	  method: 'GET',
	})
  }

  export const fetchAllChannelMessages = (channelId) => {
	  return $.ajax({
		  url: `api/channels/${channelId}`,
		  method: 'GET'
	  })
  }