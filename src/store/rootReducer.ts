import { combineReducers } from '@reduxjs/toolkit'
import testReducer from './testSlice'

const rootReducer = combineReducers({
    // put reducers from another files in here
    testData: testReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer