import { useState } from 'react'

import useAuthContext from '../../context/AuthContext'

const ForgotPassword = () => {
  const { errors, status, passwordRessetRequest } = useAuthContext()
  const [email, setEmail] = useState('')

  const handlePasswordRessetRequest = async (event) => {
    event.preventDefault()
    passwordRessetRequest(email)
  }

  return (
    <section className={ 'bg-[#F4F7FF] py-20 lg:py-[120px]' }>
      <div className={ 'container mx-auto' }>
        <div className={ '-mx-4 flex flex-wrap' }>
          <div className={ 'w-full px-4' }>
            <div
              className={ 'relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center'
              + 'sm:px-12 md:px-[60px]' }
            >
              <div className={ 'mb-10 text-center md:mb-16' }>Forgot Password</div>
              { status && <div className={ 'bg-green-700 m-2 p-2 rounded text-white' }>{ status }</div> }
              <form onSubmit={ handlePasswordRessetRequest }>
                <div className={ 'mb-4' }>
                  <input
                    type="email"
                    value={ email }
                    onChange={ (event) => setEmail(event.target.value) }
                    placeholder="Email"
                    className={ 'bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base ' +
                    'text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none' }
                    autoComplete={ 'username' }
                  />
                  { errors.email && (
                    <div className="flex">
                      <span className={ 'text-red-400 text-sm m-2 p-2' }>
                        { errors.email[0] }
                      </span>
                    </div>
                  ) }
                </div>
                <div className={ 'mb-10' }>
                  <button
                    type="submit"
                    className={ 'w-full px-4 py-3 bg-indigo-500 hover:bg-indigo-700 rounded-md text-white' }
                  >Resset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword
