export function formatTimestamp(dateTimeString) {
	const d = new Date(dateTimeString);
	return d.toLocaleTimeString([], { timeStyle: "short" });
}

//Taken from https://stackoverflow.com/questions/10527983/best-way-to-detect-mac-os-x-or-windows-computers-with-javascript-or-jquery
//From user: Benny Neugebauer
export function isMacintosh() {
	return navigator.platform.indexOf('Mac') > -1
  }
  
export function isWindows() {
	return navigator.platform.indexOf('Win') > -1
  }

  export function displayName(user) {
	  if(user.nickname) {
		  return user.nickname
	  }
	  return user.username;
  }
