import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { AppThunk } from './index'
import * as Repo from '@dev/repositories'
import { IGradeModel } from '@dev/interfaces'

interface ISubjectState {
    list: IGradeModel[]
    isLoading: boolean
}

const initialState: ISubjectState = { isLoading: false, list: [] }

const gradeSlice = createSlice({
    name: 'grades',
    initialState,
    reducers: {
        getData: (state, action: PayloadAction<IGradeModel[]>) => {
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

export const { getData, setIsLoading } = gradeSlice.actions
export default gradeSlice.reducer

export const getGrades = (): AppThunk => async (dispatch) => {
    dispatch(setIsLoading(true))
    let rsp = await Repo.gradesRepo.getAllGrades()
    dispatch(getData(rsp))
}