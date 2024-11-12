import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const UserAuth = ({children})=>{
    const navigate=useNavigate()
    const token = useSelector((store)=>store.userSlice.token)
   
    useEffect(()=>{
        if(!token){
            navigate('/register')
        }
    },[])

    

    if(token){
        return children
    }
}

export default UserAuth