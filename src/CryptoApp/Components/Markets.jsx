import React from 'react'
import useAxios from '../Hooks/useAxios'
import Coin from './Coin';
import Skeleton from './Skeleton';

const Markets = () => {

const { response,loading } = useAxios('coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en');
console.log("reso",response);


if(loading){
  return(
    <div className='wrapper_container mt-8'>
    <Skeleton classname=" h-8 w-32"/>
    <Skeleton classname=" h-8 w-full mt-2"/>
    <Skeleton classname=" h-8 w-full mt-2"/>
    <Skeleton classname=" h-8 w-full mt-2"/>
    <Skeleton classname=" h-8 w-full mt-2"/>
    <Skeleton classname=" h-8 w-full mt-2"/>
    <Skeleton classname=" h-8 w-full mt-2"/>
    <Skeleton classname=" h-8 w-full mt-2"/>
    </div>
  )
 }
  return (
    <section className=' mt-8'>
        <h1 className=' mb-2 text-2xl'>Markets</h1>
        {response && response.map(coin => <Coin key={coin.id} coin={coin}/>)}
    </section>
  )
}

export default Markets;