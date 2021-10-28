import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { AppThunk } from './index'
import * as Repo from '@dev/repositories'
import { ISubjectModel } from '@dev/interfaces'

interface ISubjectState {
    list: ISubjectModel[]
    isLoading: boolean
}

const initialState: ISubjectState = { isLoading: false, list: [] }

const subjects = createSlice({
    name: 'subjects',
    initialState,
    reducers: {
        getData: (state, action: PayloadAction<ISubjectModel[]>) => {
            state.list = action.payload
            state.isLoading = false
            return state
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
            return state
        },
    }
})

export const { getData, setIsLoading } = subjects.actions
export default subjects.reducer

export const getSubjects = (): AppThunk => async (dispatch) => {
    dispatch(setIsLoading(true))
    let rsp = await Repo.subjectsRepo.getAllSubjects()
    dispatch(getData(rsp))
}