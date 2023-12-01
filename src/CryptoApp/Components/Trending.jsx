import React from 'react'
import useAxios from '../Hooks/useAxios'
import CoinTrending from './CoinTrending';
import Skeleton from './Skeleton';

const Trending = () => {

    const {response, loading}= useAxios('search/trending');
   // console.log(response);
   if(loading){
    return(
      <div className='wrapper_container mt-8'>
      <Skeleton classname=" h-8 w-32"/>
      <Skeleton classname=" h-8 w-full mt-2"/>
      <Skeleton classname=" h-8 w-full mt-2"/>
      <Skeleton classname=" h-8 w-full mt-2"/>
      <Skeleton classname=" h-8 w-full mt-2"/>
      </div>
    )
   }
  return (
    <div className=' mt-8'>
        <h1 className=' text-2xl mb-2'>Trending</h1>
        {response && response.coins.map(coin => <CoinTrending key={coin.item.coin_id} coin={coin.item}/>)}
    </div>
  )
}

export default Trending