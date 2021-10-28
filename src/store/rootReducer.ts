import { combineReducers } from '@reduxjs/toolkit'
import subjectsReducer from './subjectsSlice'

const rootReducer = combineReducers({
    subjectsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer