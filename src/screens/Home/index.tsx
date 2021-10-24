import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSubject } from '@dev/store/testSlice';
import { RootState } from '@dev/store/rootReducer';
interface IHome {

}

export const Home: React.FC<IHome> = props => {
    const dispatch = useDispatch()
    const testData: any[] = useSelector(
        (state: RootState) => state.testData
    )
    React.useEffect(() => {
        dispatch(getSubject())

    }, [])

    console.log(testData)
    return <div className="home">
        {testData?.map(t => t['_id']?.toString() + ', ' ?? 'unknown')}
        Home Component Home Component Home Component Home Component Home Component
    </div>
}

