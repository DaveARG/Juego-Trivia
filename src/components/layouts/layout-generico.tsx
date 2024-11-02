import { Outlet } from 'react-router-dom'

export default function LayoutGenerico() {
    return (
        <>
            <div className='bg'></div>
            <div className='bg bg2'></div>
            <div className='bg bg3'></div>
            <div className='flex h-screen w-screen items-center justify-center '>
                <Outlet />
            </div>
        </>
    )
}
