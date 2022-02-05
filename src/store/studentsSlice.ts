import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { AppThunk } from './index'
import * as Repo from '@dev/repositories'
import * as Interfaces from '@dev/interfaces'

interface ISubjectState {
    dataPaging: Interfaces.IPaginationData<Interfaces.IStudentModel[]>
    scoreSubjectsInGrade10: Interfaces.IGradeScoreModel[]
    scoreSubjectsInGrade11: Interfaces.IGradeScoreModel[]
    scoreSubjectsInGrade12: Interfaces.IGradeScoreModel[]
    isLoading: boolean
    isLoadingData: boolean
}

const initialState: ISubjectState = {
    dataPaging: { data: [], totalCount: 0 },
    scoreSubjectsInGrade10: [],
    scoreSubjectsInGrade11: [],
    scoreSubjectsInGrade12: [],
    isLoading: false,
    isLoadingData: false,

}

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Interfaces.IPaginationData<Interfaces.IStudentModel[]>>) => {
            state.dataPaging = action.payload
            state.isLoading = false
            return state
        },
        setScoreSubjectsInGrade10: (state, action: PayloadAction<Interfaces.IGradeScoreModel[]>) => {
            state.scoreSubjectsInGrade10 = action.payload
            state.isLoadingData = false
            return state
        },
        setScoreSubjectsInGrade11: (state, action: PayloadAction<Interfaces.IGradeScoreModel[]>) => {
            state.scoreSubjectsInGrade11 = action.payload
            state.isLoadingData = false
            return state
        },
        setScoreSubjectsInGrade12: (state, action: PayloadAction<Interfaces.IGradeScoreModel[]>) => {
            state.scoreSubjectsInGrade12 = action.payload
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
        onResetState: (state) => {
            state.scoreSubjectsInGrade10 = []
            state.scoreSubjectsInGrade11 = []
            state.scoreSubjectsInGrade12 = []
            return state
        },
    }
})

export const { setData, setIsLoading, setIsLoadingData, setScoreSubjectsInGrade10, setScoreSubjectsInGrade11, setScoreSubjectsInGrade12, onResetState } = studentsSlice.actions
export default studentsSlice.reducer

export const getStudents = (text: string, page: number, pageSize: number = 10): AppThunk => async (dispatch) => {
    const query: Interfaces.IStudentQuery = { page, pageSize, text }

    dispatch(setIsLoading(true))
    let rsp = await Repo.studentsRepo.getStudentsByQuery(query)
    dispatch(setData(rsp))
}

export const getStudentScoreByGrade = (studentId?: string, gradeId?: number): AppThunk => async (dispatch) => {
    if (!studentId || !gradeId) return
    dispatch(setIsLoadingData(true))

    let rsp = await Repo.studentsRepo.getStudentScoreByGrade(studentId, gradeId)
    switch (gradeId) {
        case 10:
            dispatch(setScoreSubjectsInGrade10(rsp))
            break;
        case 11:
            dispatch(setScoreSubjectsInGrade11(rsp))
            break;
        case 12:
            dispatch(setScoreSubjectsInGrade12(rsp))
            break;
        default:
            break;
    }
}