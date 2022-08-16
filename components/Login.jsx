/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { supabase } from '../services/supabaseClient'


const style = {
  wrapper: 'flex min-h-screen flex-col items-center justify-center space-y-2',
  loginBtn:
    'group flex items-center space-x-4 transition-all duration-200 ease-in rounded border-gray-300 border p-4 hover:bg-white',
  loginBtnText: 'font-bold group-hover:text-black',
}

const Login = () => {
  const signInWithGoogle = async () => {
    try {
      await supabase.auth.signIn({
        provider: 'google',
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={style.wrapper}>
      <img className="h-52" src="/logo.png" alt="reddit/logo" />

      <button className={style.loginBtn} onClick={signInWithGoogle}>
        <img className="w-6 h-6" src="/google.png" alt="google/logo" />
        <span className={style.loginBtnText}>Sign In with Google</span>
      </button>
    </div>
  )
}

export default Login
