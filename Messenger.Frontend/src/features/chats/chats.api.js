import { createAsyncThunk } from '@reduxjs/toolkit';

import { ChatService } from '../../services/ChatService';
import { showApiEndpointErrorAlert } from '../../services/alert';

export const pinChat = createAsyncThunk(
	'chat/pinChat',
	async (id, { fulfillWithValue, rejectWithValue }) => {
		try {
			// TODO add request
			return fulfillWithValue(id);
		} catch (error) {
			return rejectWithValue();
		}
	}
);

export const createUserChat = createAsyncThunk(
	'chat/createUserChat',
	async (id, { fulfillWithValue, rejectWithValue }) => {
		try {
			const data = await ChatService.create(id);

			const { id } = data;
			return fulfillWithValue(id);
		} catch (error) {
			showApiEndpointErrorAlert(error);

			return rejectWithValue();
		}
	}
);

export const fetchChat = createAsyncThunk(
	'chat/fetchChat',
	async (id, { fulfillWithValue, rejectWithValue }) => {
		try {
			const data = await ChatService.getById(id);
			return fulfillWithValue(data);
		} catch (error) {
			showApiEndpointErrorAlert(error);

			return rejectWithValue();
		}
	}
);

export const fetchUserChats = createAsyncThunk(
	'chat/fetchUserChats',
	async (_, { fulfillWithValue, rejectWithValue }) => {
		try {
			const data = await ChatService.get();
			return fulfillWithValue(data);
		} catch (error) {
			showApiEndpointErrorAlert(error);

			return rejectWithValue();
		}
	}
);
