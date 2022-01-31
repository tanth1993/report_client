import { combineReducers } from '@reduxjs/toolkit'
import subjectsReducer from './subjectsSlice'
import gradesReducer from './gradesSlice'
import overviewSlice from './overviewSlice'
import studentsSlice from './studentsSlice'
const rootReducer = combineReducers({
    subjectsReducer,
    gradesReducer,
    overviewSlice,
    studentsSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer