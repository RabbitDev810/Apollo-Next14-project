import {useState, useEffect} from "react"
import axios from "axios"
import {useRouter} from "next/router"
import { createClient } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const InputGroup = ({title, onChange, error, type="text"}) => {
    return (
        <div className="mx-10 flex flex-col mb-5">
            <p className="text-[14px] text-white/50 mb-1">{title}</p>
            <input type={type} onChange={onChange} className="outline-none rounded py-1 px-2 bg-white/10 focus:outline-[#10C8EC] hover:outline"></input>
            <p className="text-[12px] text-red-400 mt-1">{error}</p>
        </div>
    )
}

const Login = ({setLogin}) => {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [generalError, setGeneralError] = useState("")

    const [processing, setProcessing] = useState(false)

    const supabase = createClientComponentClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

    const submit = async () => {
        setProcessing(true)
        if(username == "") {
            setUsernameError("Username must have a value")
            setPasswordError("")
            setGeneralError("")
            setProcessing(false)
            return
        } else if(password == "") {
            setPasswordError("Password must have a value")
            setUsernameError("")
            setGeneralError("")
            setProcessing(false)
            return
        } else {
            setUsernameError("")
            setPasswordError("")
            setGeneralError("")

            const { data, error } = await supabase.auth.signInWithPassword({
                email: username,
                password: password
            })

            console.log("Data:")
            console.log(data)

            if(!error) {
                router.reload()
            } else {
                console.log(error.message)
                setGeneralError(typeof(error?.message) == "undefined" || error?.message == null ? "An error occured" : error?.message)
            }

            setProcessing(false)
        }
    }

    return (
        <div className="fixed flex top-0 w-[100vw] h-[100vh] bg-black/20 backdrop-blur-lg z-50">
            <div className="m-auto bg-[#0b0b0b] 2xl:w-[20vw] rounded-lg p-5 flex flex-col">
                <p className="text-3xl text-white mb-10">Login</p>
                <InputGroup title="Email" onChange={(e)=>{setUsername(e.target.value)}} error={usernameError}></InputGroup>
                <InputGroup title="Password" onChange={(e)=>{setPassword(e.target.value)}} type="password" error={passwordError}></InputGroup>
                <p onClick={()=>{setLogin(false)}} className="text-[14px] mb-5 mx-auto cursor-pointer">Dont have an account? <span className="underline text-[#10C8EC]">Sign Up</span></p>
                <button disabled={processing} onClick={submit} className="mx-5 bg-[#10C8EC] text-white py-2 rounded mt-auto hover:scale-105 hover:bg-[#2dcfef] transition-all">Login</button>
                <p className="mt-5 text-red-400 text-[12px] font-medium">{generalError}</p>
            </div>
        </div>  
    )
}

const Signup = ({setLogin}) => {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [generalError, setGeneralError] = useState("")

    const [processing, setProcessing] = useState(false)
    const supabase = createClientComponentClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

    const submit = async () => {
        setProcessing(true)
        if(username == "") {
            setUsernameError("Username must have a value")
            setPasswordError("")
            setGeneralError("")
            setProcessing(false)
            return
        } else if(password.length < 8) {
            setPasswordError("Password must be longer than 8 characters")
            setUsernameError("")
            setGeneralError("")
            setProcessing(false)
            return
        } else if(password != confirmPassword) {
            setPasswordError("Passwords must match")
            setUsernameError("")
            setGeneralError("")
            setProcessing(false)
            return
        } else {
            setUsernameError("")
            setPasswordError("")
            const { data: signupData, error: signupError } = await supabase.auth.signUp({
                email: username,
                password: password
            })

            if(!signupError) {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: username,
                    password: password
                })

                await supabase.from("users").insert({
                    id: signupData.user.id,
                    username: username
                })

                router.reload()
            } else {
                console.log(signupError.message)
                setGeneralError(typeof(signupError?.message) == "undefined" || signupError?.message == null ? "An error occured" : signupError?.message)
            }
            
            setProcessing(false)
        }
    }

    return (
        <div className="fixed flex top-0 w-[100vw] h-[100vh] bg-black/20 backdrop-blur-lg z-50">
            <div className="m-auto bg-[#0b0b0b] 2xl:w-[20vw] h-fit rounded-lg p-5 flex flex-col">
                <p className="text-3xl text-white mb-10">Sign Up</p>
                <InputGroup title="Email" error={usernameError} onChange={(e)=>{setUsername(e.target.value)}}></InputGroup>
                <InputGroup title="Password" error={passwordError} type="password" onChange={(e)=>{setPassword(e.target.value)}}></InputGroup>
                <InputGroup title="Confirm Password" type="password" onChange={(e)=>{setConfirmPassword(e.target.value)}}></InputGroup>
                <p onClick={()=>{setLogin(true)}} className="text-[14px] mx-auto mb-5 cursor-pointer">Already have an account? <span className="underline text-[#10C8EC]">Log In</span></p>
                <button onClick={submit} disabled={processing} className="mx-5 bg-[#10C8EC] text-white py-2 rounded mt-auto hover:scale-105 hover:bg-[#2dcfef] transition-all">Sign Up</button>
                <p className="mt-5 text-red-400 text-[12px] font-medium">{generalError}</p>
            </div>
        </div>  
    )
}

const AuthModal = () => {
    const [login, setLogin] = useState(true)

    return (
        <>
            {login ? (
                <Login setLogin={setLogin}></Login>
            ): (
                <Signup setLogin={setLogin}></Signup>
            )}
        </>
    )
}

export default AuthModal