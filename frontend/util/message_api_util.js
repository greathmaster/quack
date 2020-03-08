export const createNewMessage = (message) => {
	return $.ajax({
	  url: 'api/messages',
	  method: 'POST',
	  data: { message: message }
	})
  }