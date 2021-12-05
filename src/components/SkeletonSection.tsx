import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

interface ISkeleton {
    numberItem?: number
}

export const SkeletonSection: React.FC<ISkeleton> = props => {
    const { numberItem = 3 } = props
    const renderItem = (index?: number) => {
        return <div className="rp-skeleton_item" key={index}>
            <Box sx={{ width: '100%', height: 300 }}>
                <Box sx={{ pb: 1 }}>
                    <Skeleton />
                    <Skeleton width="60%" />
                </Box>
                <Skeleton variant="rectangular" width={'100%'} height={250} />
            </Box>
        </div>
    }

    return <div className="rp-skeleton">
        {renderItem()}
        <div className="rp-skeleton_wrapper">
            {[...Array(numberItem)]?.map((item, i) => renderItem(i))}
        </div>
    </div>
}
