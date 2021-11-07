import { combineReducers } from '@reduxjs/toolkit'
import subjectsReducer from './subjectsSlice'
import gradesReducer from './gradesSlice'

const rootReducer = combineReducers({
    subjectsReducer,
    gradesReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer