import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { AppThunk } from './index'
import * as Repo from '@dev/repositories'
import { IData, gradeNameTypes } from '@dev/interfaces'


interface IOverviewSlice {
    data: IData
    isLoading: boolean
}

const initialState: IOverviewSlice = { isLoading: false, data: { ten: [], eleven: [], twelve: [] } }

const overviewSlice = createSlice({
    name: 'overview',
    initialState,
    reducers: {
        getData: (state, action: PayloadAction<IData>) => {
            state.data = action.payload
            state.isLoading = false
            return state
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
            return state
        },
        onResetState: (state) => {
            state = initialState
            return state
        },
    }
})

export const { getData, setIsLoading, onResetState } = overviewSlice.actions
export default overviewSlice.reducer

export const getAvgScorces = (): AppThunk => async (dispatch) => {
    dispatch(setIsLoading(true))
    let rspAvgTenScores = Repo.gradeTenScoreRepo.getAvgScores()
    let rspAvgElevenScores = Repo.gradeElevenScoreRepo.getAvgScores()
    let rspAvgTwelveScores = Repo.gradeTwelveScoreRepo.getAvgScores()

    let rsps = await Promise.all([rspAvgTenScores, rspAvgElevenScores, rspAvgTwelveScores])

    let dataKeys: gradeNameTypes[] = ['ten', 'eleven', 'twelve']
    let dataObj: IData = { ten: [], eleven: [], twelve: [] }

    if (rsps.length > 0) {
        rsps.forEach((a, i) => {
            dataObj[dataKeys[i]] = a || []
        })
    }

    dispatch(getData(dataObj))
}