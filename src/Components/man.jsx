import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const apiBaseUrl = import.meta.env.VITE_API_URL || "/api"

const man = () => {
    const [form, setform] = useState({ site: "", email: "", password: "" })
    const [passarr, setpassarr] = useState([])

    const getpass = async () => {
        let req = await fetch(`${apiBaseUrl}/`)
        let third = await req.json()
        setpassarr(third)
        console.log(third)
    }

    useEffect(() => {
        getpass()
    }, [])

    const wref = useRef()
    const passref = useRef()
    const showpass = () => {
        const isHidden = wref.current.type === "password"
        wref.current.type = isHidden ? "text" : "password"
        passref.current.src = isHidden
            ? "/visibility_off_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png"
            : "/visibility_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png"
    }
    const savepass = async () => {
        const newItem = { ...form, id: uuidv4() }
        const next = [...passarr, newItem]
        setpassarr(next)
        let req = await fetch(`${apiBaseUrl}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem)
        });
        setform({ site: "", email: "", password: "" })
    }
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const copy = (text) => {
        toast('🦄 Copied text', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }
    const delpass = async(id) => {
        const next = passarr.filter((item) => item.id !== id)
        setpassarr(next)
        let req = await fetch(`${apiBaseUrl}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id})
        });
    }
    const editpass = (id) => {
        const current = passarr.find((i) => i.id === id)
        if (!current) return
        setform({ site: current.site, email: current.email, password: current.password })
        const next = passarr.filter((item) => item.id !== id)
        setpassarr(next)
        localStorage.setItem("passwords", JSON.stringify(next))
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 
        [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            <div className=" mx-auto  max-w-5xl text-center py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl outline-none text-white placeholder-gray-500 transition">
                <h1 className="text-3xl font-bold text-white">pass man</h1>
                <p className=' text-gray-400'>A simple password manager</p>
                <div className="text-white flex flex-col p-4 gap-4 items-center">
                    <input value={form.site} onChange={handlechange} className='bg-cyan-950 border border-gray-800 text-white rounded-lg w-full px-2 py-4 pr-6' type="text" placeholder='enter the url' name='site' />
                    <div className="flex w-full gap-2">
                        <input value={form.email} onChange={handlechange} className='bg-cyan-950 text-white border border-gray-800 rounded-lg w-[80%] p-2' type="text" placeholder='enter the email' name='email' />
                        <div className="relative">
                            <input value={form.password} onChange={handlechange} className='bg-cyan-950 text-white border border-gray-800 rounded-lg w-full px-2 py-4 pr-6' type="password" placeholder='enter the password' name='password' ref={wref} />
                            <span className='absolute top-5 right-2 text-gray-400 cursor-pointer ' onClick={showpass}>
                                <img ref={passref} src="/visibility_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png" alt="show" className='w-5 h-5' />
                            </span>
                        </div>
                    </div>
                    <button onClick={savepass} className='bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg w-fit'>
                        Add Password
                    </button>
                </div>
                <div className="passwords text-left">
                    <h2 className='font-bold text-2xl p-2 text-cyan-400'>Stored Passwords</h2>
                    {passarr.length === 0 && <p className='text-gray-400 mx-2'>No passwords stored yet.</p>}
                    {passarr.length > 0 && (
                        <table className="table-auto w-full border border-white/30 rounded-lg overflow-hidden text-cyan-50 text-center bg-white/10 backdrop-blur-md">
                            <thead className="bg-cyan-700/80 text-cyan-100">
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Email</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passarr.map((item) => (
                                    <tr key={item._id} className="bg-cyan-950/45 hover:bg-cyan-900/55">
                                        <td className='py-2 text-center w-30 '><a href={item.site} target='_blank'>{item.site}</a><span className="material-symbols-outlined cursor-pointer text-gray-400 ml-2 mb-2" onClick={() => copy(item.site)}>
                                            copy_all
                                        </span></td>
                                        <td className='py-2 text-center w-30'>{item.email}<span className="material-symbols-outlined cursor-pointer text-gray-400 ml-2 mb-2" onClick={() => copy(item.email)}>
                                            copy_all
                                        </span></td>
                                        <td className='py-2 text-center w-30'>{"*".repeat(item.password.length)}<span className="material-symbols-outlined cursor-pointer text-gray-400 ml-2 mb-2" onClick={() => copy(item.password)}>
                                            copy_all
                                        </span></td>
                                        <td className='py-2 text-center w-30'>
                                            <span className="material-symbols-outlined cursor-pointer mx-2" onClick={() => { delpass(item.id) }}>
                                                delete
                                            </span>
                                            <span className="material-symbols-outlined cursor-pointer mx-2 " onClick={() => { editpass(item.id) }}>
                                                edit
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>)}
                </div>
            </div>
        </>
    )

}

export default man

