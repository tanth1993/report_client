import { combineReducers } from '@reduxjs/toolkit'
import subjectsReducer from './subjectsSlice'
import gradesReducer from './gradesSlice'
import overviewSlice from './overviewSlice'
const rootReducer = combineReducers({
    subjectsReducer,
    gradesReducer,
    overviewSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer