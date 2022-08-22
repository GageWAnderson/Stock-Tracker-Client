import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    portfolio: null,
}

export const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        updatePortfolio: (state, action) => {
            state.portfolio = action.payload;
        }
    },
})

export const { updatePortfolio } = portfolioSlice.actions

export default portfolioSlice.reducer