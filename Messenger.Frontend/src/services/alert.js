import { toast } from 'react-toastify';

export const showSuccessAlert = (message, position = toast.POSITION.TOP_RIGHT) => {
	toast.success(message, position);
};

export const showErrorAlert = (message, position = toast.POSITION.TOP_RIGHT) => {
	toast.error(message, position);
};

export const showApiEndpointErrorAlert = (error, position = toast.POSITION.TOP_RIGHT) => {
	if (error.response) {
		showErrorAlert(error.response.data.message);
		return;
	}

	toast.error('Щось пішло не так!', position);
};
