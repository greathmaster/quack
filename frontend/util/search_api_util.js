export const findUsers = info => {
	return $.ajax({
		url: "/search",
		method: "POST",
		data: { search: info },
	});
};
