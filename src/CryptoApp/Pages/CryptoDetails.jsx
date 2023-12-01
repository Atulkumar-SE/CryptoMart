import React from 'react'
import HistoryChart from '../Components/HistoryChart'
import CoinDetail from '../Components/CoinDetail'

const CryptoDetails = () => {
  return (
    <div className='wrapper_container mt-10'>
      <HistoryChart/>
      <CoinDetail/>
    </div>
  )
}

export default CryptoDetails