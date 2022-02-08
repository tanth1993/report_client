import * as React from 'react';
import * as Interfaces from '@dev/interfaces'
import { dateLocaleVNFormatter, femaleAvt, maleAvt } from '@dev/utils';
;


interface IInfoSection {
    item?: Interfaces.IStudentModel
}

const prefixId = '00ST'

export const InfoSection: React.FC<IInfoSection> = props => {
    const { birthday, isMale, name, studentId } = props.item || {}

    const renderAvt = () => {
        const genderAvt = isMale ? maleAvt : femaleAvt
        return <div className="rp-info_avt">
            {genderAvt}
        </div>
    };

    const renderInfoMeta = () => {
        const studentIdStr = prefixId + (studentId?.split('-')?.[0]?.toLocaleUpperCase() || '')
        const genderStr = isMale ? "Nam" : "Nữ"
        const dateInVN = dateLocaleVNFormatter(birthday)
        return <div className="rp-info_meta">
            {/* studentId */}
            <div className="rp-info_meta_section">
                <h4>Mã học sinh</h4>
                <p>{studentIdStr}</p>
            </div>

            {/* fullName  */}
            <div className="rp-info_meta_section">
                <h4>Họ và tên</h4>
                <p>{name}</p>
            </div>

            {/* birthday  */}
            <div className="rp-info_meta_section">
                <h4>Ngày sinh</h4>
                <p>{dateInVN}</p>
            </div>

            {/* gender  */}
            <div className="rp-info_meta_section">
                <h4>Giới tính</h4>
                <p>{genderStr}</p>
            </div>
        </div>
    }

    return <div className="rp-info">
        {renderAvt()}
        {renderInfoMeta()}
    </div>
}
