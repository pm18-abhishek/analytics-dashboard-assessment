'use client'

import Image from "next/image"
import light from '@/assets/light.png'
import dark from '@/assets/dark.png'
import user from '@/assets/user.png'

const Navbar = ({theme, setTheme}) =>
{
    const handleTheme = () =>
    {
        localStorage.setItem('theme', theme === "light" ? "dark" : "light");
        setTheme((prev)=> prev === "light" ? "dark" : "light")
    }

    return(
        <div className="bg-opacity-50 backdrop-blur-md shadow-lg border-b-gray-300 flex justify-between p-4 italic" style={{color: "#6366F1"}}>
            <p className="text-3xl font-bold ">EVon-AI</p> 
            <div className="flex gap-4">
                <Image className="w-8 h-8 cursor-pointer" src={ theme === "light" ? light : dark } alt='icon' onClick={handleTheme}/>
                <Image className="w-8 h-8 cursor-pointer" src={user} alt='user'/>
            </div>
            
        </div>
    )
}

export default Navbar
