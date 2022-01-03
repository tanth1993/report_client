import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { AppThunk } from './index'
import * as Repo from '@dev/repositories'
// import { ISubjectModel } from '@dev/interfaces'
import * as Interfaces from '@dev/interfaces'

interface ISubjectState {
    list: Interfaces.ISubjectModel[]

    avgScores: Interfaces.ITotal<string>[],
    avgScoresByGrade10: Interfaces.ITotal<number>[],
    avgScoresByGrade11: Interfaces.ITotal<number>[],
    avgScoresByGrade12: Interfaces.ITotal<number>[],

    isLoading: boolean
    isLoadingData: boolean
}

const initialState: ISubjectState = {
    list: [],

    avgScores: [],
    avgScoresByGrade10: [],
    avgScoresByGrade11: [],
    avgScoresByGrade12: [],

    isLoading: false,
    isLoadingData: false,

}

const subjectSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Interfaces.ISubjectModel[]>) => {
            state.list = action.payload
            state.isLoading = false
            return state
        },
        setAvgScores: (state, action: PayloadAction<Interfaces.ITotal<string>[]>) => {
            state.avgScores = action.payload
            state.isLoadingData = false
            return state
        },

        setAvgScoresByGrade10: (state, action: PayloadAction<Interfaces.ITotal<number>[]>) => {
            state.avgScoresByGrade10 = action.payload
            state.isLoadingData = false
            return state
        },
        setAvgScoresByGrade11: (state, action: PayloadAction<Interfaces.ITotal<number>[]>) => {
            state.avgScoresByGrade11 = action.payload
            state.isLoadingData = false
            return state
        },
        setAvgScoresByGrade12: (state, action: PayloadAction<Interfaces.ITotal<number>[]>) => {
            state.avgScoresByGrade12 = action.payload
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

export const { setData, setIsLoading, setAvgScoresByGrade11, setAvgScoresByGrade10, setAvgScoresByGrade12, setIsLoadingData, setAvgScores } = subjectSlice.actions
export default subjectSlice.reducer

export const getSubjects = (): AppThunk => async (dispatch) => {
    dispatch(setIsLoading(true))
    let rsp = await Repo.subjectsRepo.getAllSubjects()
    dispatch(setData(rsp))
}

export const getAvgScoresData = (subjectId: string): AppThunk => async (dispatch) => {
    if (!subjectId) return
    dispatch(setIsLoadingData(true))
    const query: Interfaces.IQuery = { subjectId }
    let rsp = await Repo.subjectsRepo.getAvgScoresAccordingBySubject(query)
    dispatch(setAvgScores(rsp))
}

export const getAvgScoresDataScaleByGrade = (subjectId: string, gradeId: number): AppThunk => async (dispatch) => {
    dispatch(setIsLoadingData(true))
    const query: Interfaces.IQuery = { subjectId, gradeId }
    let rsp = await Repo.subjectsRepo.getAmountStuInScaleBySubject(query)
    switch (gradeId) {
        case 10:
            dispatch(setAvgScoresByGrade10(rsp))
            break;
        case 11:
            dispatch(setAvgScoresByGrade11(rsp))
            break;
        case 12:
            dispatch(setAvgScoresByGrade12(rsp))
            break;
        default:
            break;
    }
}