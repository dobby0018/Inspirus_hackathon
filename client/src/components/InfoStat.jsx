import React from 'react'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';

function InfoStat({type, value, icon}) {
  return (
    <div className='info-stat'>
        <p className='info-stat-type'>{type}</p>
        <div className='info-stat-icon'>
            {icon}
        </div>
        <p className='info-stat-value'>{value}</p>
    </div>
  )
}

export default InfoStat