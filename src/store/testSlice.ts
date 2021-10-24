import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'
import { AppThunk } from './index'
import * as Repo from '@dev/repositories'

const test = createSlice<any, SliceCaseReducers<any[]>, string>({
    name: 'test',
    initialState: [],
    reducers: {
        getDataTest: (state, action: PayloadAction<any>) => {
            // const {} = action
            // console.log(action)
            state = action.payload
            return state
        }
    }
})
export const { getDataTest } = test.actions
export default test.reducer

export const getSubject = (): AppThunk => async (dispatch) => {
    let rsp = await Repo.subjectsRepo.getAllSubjects()
    dispatch(getDataTest(rsp))
}