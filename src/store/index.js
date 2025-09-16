import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from './slice'

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer
  }
})

export default store
