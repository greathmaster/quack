export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const OPEN_INFO_BAR = "OPEN_INFO_BAR";
export const CLOSE_INFO_BAR = "CLOSE_INFO_BAR";

export const openModal = (modal) => {

	return {
		type: OPEN_MODAL,
		modal: modal
	}
}

export const closeModal = () => {

	return {
		type: CLOSE_MODAL,
	}
}

export const openInfoBar = (infobarContent) => {
	return {
		type: OPEN_INFO_BAR,
		infobarContent
	}
}

export const closeInfoBar = () => {
	return {
		type: CLOSE_INFO_BAR
	}
}