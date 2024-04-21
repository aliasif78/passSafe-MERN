import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css'
import React from 'react'

const Manager = () => {
    // Form
    const [form, setForm] = useState({ site: "", username: "", password: "" })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleCopy = (text) => {
        toast('Copied to clipboard.', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            progressStyle: { background: "#ff00a0" }
        });

        navigator.clipboard.writeText(text)
    }

    // Password
    const [showPassword, setShowPassword] = useState(false)
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()
    }, [])


    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const savePassword = async () => {
        if (form.site == "" || form.username == "" || form.password == "") {
            toast.error('Incomplete information.', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });

            return
        }

        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        let res = await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

        toast.success('Saved to Storage.', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });

        setForm({ site: "", username: "", password: "" })
    }

    const deletePassword = async (id) => {
        setPasswordArray(passwordArray.filter(x => x.id !== id))
        // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(x => x.id !== id)))
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

        toast.warning('Deleted from Storage.', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });

        setForm({ site: "", username: "", password: "" })
    }

    const editPassword = async (x, id) => {
        setForm({ site: x.site, username: x.username, password: x.password })

        setPasswordArray(passwordArray.filter(entry => entry.id !== x.id))
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

        toast('Editing Password...', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div>
                <div className='mainBody flex flex-col items-center text-center gap-7 h-[100vh] pt-20'>
                    <div className="heading">
                        <div className="logo text-3xl font-bold text-green-500 hover:text-pink-600 cursor-default transition-all duration-300">
                            <span className=''>{'<'}</span>
                            <span className='text-white'>{'Pass'}</span>
                            <span className=''>{'Safe>'}</span>
                        </div>
                        <p className='text-white'>Password Manager</p>
                    </div>

                    <div className="inputBars flex flex-col gap-3 w-full justify-center items-center align-middle">
                        <input type="text" value={form.site} onChange={handleChange} name='site' id='site' placeholder='Website URL' className='w-1/2 rounded-full p-1 pl-3 placeholder-neutral-500' />

                        <div className="flex flex-col sm:flex-row gap-2 w-1/2">
                            <input type="text" value={form.username} onChange={handleChange} name='username' id='username' placeholder='Username' className='rounded-full p-1 pl-3 placeholder-neutral-500 sm:w-2/3' />

                            {!showPassword && <div className="pass sm:w-1/3 flex flex-row relative justify-center items-center align-middle">
                                <input type="text" value={form.password} onChange={handleChange} name='password' id='password' placeholder='Password' className='rounded-full w-full p-1 pl-3 placeholder-neutral-500' />
                                <button onClick={() => { toggleShowPassword() }} className='absolute top-[13%] right-[4%] cursor-pointer'>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/vfczflna.json"
                                        trigger="morph"
                                        state="morph-cross"
                                        stroke="bold"
                                        colors="primary:#000000,secondary:#0a5c15"
                                        style={{ width: "25px", height: "25px" }}>
                                    </lord-icon>
                                </button>
                            </div>}

                            {showPassword && <div className="pass sm:w-1/3 flex flex-row relative justify-center items-center align-middle">
                                <input type="password" value={form.password} onChange={handleChange} name='password' id='password' placeholder='Password' className='rounded-full w-full p-1 pl-3 placeholder-neutral-500' />
                                <button onClick={() => { toggleShowPassword() }} className='absolute top-[13%] right-[4%] cursor-pointer'>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/vfczflna.json"
                                        trigger="hover"
                                        state="hover-cross"
                                        stroke="bold"
                                        colors="primary:#121331,secondary:#0a5c15"
                                        style={{ width: "25px", height: "25px" }}>
                                    </lord-icon>
                                </button>
                            </div>}
                        </div>

                        <button onClick={savePassword} className='savePassword flex flex-row justify-center items-center text-center align-middle w-fit gap-2 bg-green-600 text-black text-lg font-semibold rounded-full mt-3 p-2 px-4 cursor-pointer hover:bg-pink-700 transition-all duration-300'>
                            <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover" style={{ width: '25px', height: '25px' }} />
                            <span>Save</span>
                        </button>
                    </div>

                    <div className="yourPasswords text-white w-[75%] flex flex-col text-start gap-4">
                        <div className="heading text-2xl font-bold">Your Passwords</div>
                        {passwordArray.length === 0 && <p>No saved Passwords to display.</p>}

                        {passwordArray.length !== 0 &&
                            <div className="table-container text-xs md:text-base max-h-[50%] md:max-h-[38%] overflow-y-auto mb-[20%]">
                                <table className="table-auto text-neutral-400 w-[200%] sm:w-full rounded-t-md overflow-hidden">
                                    <thead className='bg-green-700 hover:bg-pink-800 transition-all duration-300 text-white cursor-default'>
                                        <tr className=''>
                                            <th>Website</th>
                                            <th>Username</th>
                                            <th>Password</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {passwordArray.map((x, index) => (
                                            <tr key={index} className='text-center bg-neutral-900'>
                                                <td className='max-w-40 p-2 px-5 overflow-hidden whitespace-nowrap overflow-ellipsis cursor-pointer hover:text-pink-600 transition-all duration-300' onClick={() => handleCopy(x.site)}><a href={x.site} target='_blank'>{x.site}</a></td>

                                                <td className='cursor-pointer hover:text-pink-600 transition-all duration-300' onClick={() => handleCopy(x.username)}>{x.username}</td>

                                                <td className='cursor-pointer hover:text-pink-600 transition-all duration-300' onClick={() => handleCopy(x.password)}>{x.password}</td>

                                                <td className='flex flex-row align-middle justify-center text-center items-center'>
                                                    <div className="flex flex-row gap-3 cursor-pointer invert text-pink-500 mt-[6%]">
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/wuvorxbv.json"
                                                            trigger="hover"
                                                            stroke="bold"
                                                            state="hover-line"
                                                            colors="primary:#000000,secondary:#00ff5e"
                                                            style={{ width: '24px', height: '24px' }}
                                                            onClick={() => editPassword(x)} />

                                                        <lord-icon id="myLordicon" src="https://cdn.lordicon.com/drxwpfop.json" trigger="hover" style={{ width: '24px', height: '24px' }} colors="primary:#000000,secondary:#000000" stroke="bold" onClick={() => deletePassword(x.id)} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manager