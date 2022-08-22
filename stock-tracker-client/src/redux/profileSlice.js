import { createSlice } from '@reduxjs/toolkit';
import endpoints from '../data/endpoints';

const initialState = {
    uuid: 1,
    preferences: {}
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        getProfile: (state) => {
            endpoints.getUserProfile(state.uuid)
                .then((response) => {
                    state.preferences = response.preferences;
                })
        }
    },
})

export const { getProfile } = profileSlice.actions

export default profileSlice.reducer