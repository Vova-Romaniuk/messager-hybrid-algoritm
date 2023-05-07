import axios from 'axios';

import { showErrorAlert } from './alert';

export const ImageService = {
	upload: async (image) => {
		console.log(image);
		const formData = new FormData();
		formData.set('key', 'a8933f7b26cdb54c9c89f74cf99f7224');
		formData.append('image', image);

		try {
			const response = await axios({
				method: 'post',
				url: 'https://api.imgbb.com/1/upload',
				data: formData,
			});

			return response.data.data.url;
		} catch (error) {
			showErrorAlert('Щось пішло не так при завантаженні фото!');
		}
	},
};
