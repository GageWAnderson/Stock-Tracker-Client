import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    breadcrumbs: ['Home'],
}

export const breadcrumbSlice = createSlice({
    name: 'breadcrumbs',
    initialState,
    reducers: {
        addBreadcrumb: (state, action) => {
            state.breadcrumbs.push(action.payload);
        },
        removeBreadcrumb: (state) => {
            state.breadcrumbs.pop();
        },
        replaceBreadcrumbs: (state, action) => {
            state.breadcrumbs = [];
            action.payload.forEach(breadcrumb => {
                state.breadcrumbs.push(breadcrumb);
            });
        }
    },
})

export const { addBreadcrumb, removeBreadcrumb, replaceBreadcrumbs } = breadcrumbSlice.actions

export default breadcrumbSlice.reducer