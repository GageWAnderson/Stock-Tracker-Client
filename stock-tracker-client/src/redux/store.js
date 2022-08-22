import { configureStore } from '@reduxjs/toolkit';
import breadcrumbReducer from './breadcrumbSlice';
import portfolioReducer from './portfolioSlice';
import profileReducer from './profileSlice';

export const store = configureStore({
    reducer: {
        breadcrumb: breadcrumbReducer,
        portfolio: portfolioReducer,
        profile: profileReducer
    },
})