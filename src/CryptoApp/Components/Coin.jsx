import React from 'react'
import {currencyFormat} from '../../utils'
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import { Link } from 'react-router-dom';

const Coin = ({coin}) => {
   // console.log("coin:",coin);
  return (
    <Link to={`/coin/${coin.id}`}>
    <div className=' grid grid-cols-3 sm:grid-cols-4 font-light p-2 border-b border-gray-200 border-2 rounded hover:bg-gray-200'>
        <div className=' flex items-center gap-1 w-full'>
            <img className=' w-6' src={coin.image} alt={coin.name} />
            <p>{coin.name}</p>
            <span className=' text-xs'>({coin.symbol})</span>
        </div>
        <span className=' w-full text-center'>{currencyFormat(coin.current_price)}</span>
        <span className={`flex gap-1 font-semibold ${coin.price_change_percentage_24h < 0 ? ' text-red-600': ' text-green-600'}`}>
            {coin.price_change_percentage_24h < 0 ? <IoIosTrendingDown />: <IoIosTrendingUp /> }
            {coin.price_change_percentage_24h}
        </span>
        <div className=' hidden sm:block'>
            <p className=' font-semibold'>Market Cap</p>
            <span>{currencyFormat(coin.market_cap)}</span>
        </div>
    </div>
    </Link>
  )
}

export default Coin