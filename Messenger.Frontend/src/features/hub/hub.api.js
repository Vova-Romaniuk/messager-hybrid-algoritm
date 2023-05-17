import { createAsyncThunk } from '@reduxjs/toolkit';

import { HubService } from '../../services/HubService';
import { showApiEndpointErrorAlert } from '../../services/alert';

const hubService = new HubService();

export const connectToHub = createAsyncThunk(
	'hub/connect',
	async (chatsIds, { rejectWithValue, fulfillWithValue }) => {
		try {
			hubService.configure();
			const connection = await hubService.startConnection();

			connection.invoke('JoinToUsersRooms', chatsIds);

			return fulfillWithValue(connection);
		} catch (error) {
			showApiEndpointErrorAlert(error);
			return rejectWithValue();
		}
	}
);
