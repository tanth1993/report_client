import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { AppThunk } from './index'
import * as Repo from '@dev/repositories'
import * as Interfaces from '@dev/interfaces'

interface ISubjectState {
    list: Interfaces.IGradeModel[]
    avgScores: Interfaces.ITotal<string>[]
    avgScoresByGenderMale: Interfaces.ITotal<string>[]
    avgScoresByGenderFemale: Interfaces.ITotal<string>[]

    isLoading: boolean
    isLoadingData: boolean
}

const initialState: ISubjectState = {
    list: [],
    avgScores: [],
    avgScoresByGenderFemale: [],
    avgScoresByGenderMale: [],

    isLoading: false,
    isLoadingData: false,

}

const gradeSlice = createSlice({
    name: 'grades',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Interfaces.IGradeModel[]>) => {
            state.list = action.payload
            state.isLoading = false
            return state
        },
        setAvgScores: (state, action: PayloadAction<Interfaces.ITotal<string>[]>) => {
            state.avgScores = action.payload
            state.isLoadingData = false
            return state
        },
        setAvgScoresByMale: (state, action: PayloadAction<Interfaces.ITotal<string>[]>) => {
            state.avgScoresByGenderMale = action.payload
            state.isLoadingData = false
            return state
        },
        setAvgScoresByFemale: (state, action: PayloadAction<Interfaces.ITotal<string>[]>) => {
            state.avgScoresByGenderFemale = action.payload
            state.isLoadingData = false
            return state
        },

        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
            return state
        },
        setIsLoadingData: (state, action: PayloadAction<boolean>) => {
            state.isLoadingData = action.payload
            return state
        },
    }
})

export const { setData, setIsLoading, setAvgScores, setIsLoadingData, setAvgScoresByFemale, setAvgScoresByMale } = gradeSlice.actions
export default gradeSlice.reducer

export const getGrades = (): AppThunk => async (dispatch) => {
    dispatch(setIsLoading(true))
    let rsp = await Repo.gradesRepo.getAllGrades()
    rsp.sort((a, b) => (a?.number ?? 0) - (b?.number ?? 0))
    dispatch(setData(rsp))
}

export const getAvgScoresData = (gradeId: number): AppThunk => async (dispatch) => {
    dispatch(setIsLoadingData(true))
    let rsp = await Repo.gradesRepo.getAvgScoresAccordingBySubjects(gradeId)
    dispatch(setAvgScores(rsp))
}

export const getAvgScoresDataByGender = (isMale: boolean, gradeId: number): AppThunk => async (dispatch) => {
    dispatch(setIsLoadingData(true))
    const query: Interfaces.IQuery = { isMale, gradeId }
    let rsp = await Repo.gradesRepo.getAvgScoresAccordingByGendersBySubjects(query)

    if (isMale)
        dispatch(setAvgScoresByMale(rsp))
    else
        dispatch(setAvgScoresByFemale(rsp))
}
