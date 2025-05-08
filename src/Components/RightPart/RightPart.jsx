import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Button } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const RightPart = () => {
    const handleChangeTheme =()=>{
        console.log("handle change theme")
    }
  return (
    <>
    <div className="py-5 sticky top">
        <div className="relative flex items-center">
            <input type="text" className='py-3 rounded-full text-gray-500 w-full pl-12'/>
            <div className="absolute top-0 left-0 pl-3 pt-3">
                <SearchIcon className='text-gray-500'></SearchIcon>
            </div>
            <Brightness4Icon className='ml-3 cursor-pointer' onClick={handleChangeTheme}></Brightness4Icon>
        </div>
        <selection className="my-5"> 
            <h1 className='text-xl font-bold'>Get Verfied</h1>
            <h1 className='font-bold my-2'>Subscribe to unlock new Feature </h1>
            <Button variant="contained" sx={{padding:"10x",paddingX:"20px",borderRadius:"25px",}}>
                Get Verified
            </Button>   

        </selection>

        <section className='mt-7 space-y-5'>
            <h1 className='font-bold text-xl py-1'>What's happening </h1>
            <div>
                <p className='text-sm'>
                    Entertainment . Tending
                </p>
                <p className="font-bold">
                    Phillippines vs Switzerland
                </p>
            </div>
            {[1,1,1].map((item)=>
            <div className="flex justify-between w-full">
                <div>
                    <p>Entertainment . Trending</p>
                    <p className='font-bold'>#TheMarvels</p>
                    <p>34.3k Tweets</p>
                </div>
                <MoreHorizIcon> </MoreHorizIcon>
            </div>
            )}
        </section>
    </div>

    </>
  )
}

export default RightPart