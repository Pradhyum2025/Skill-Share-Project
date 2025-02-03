import React from 'react'
import Logo from './Logo'


export default function FooterLogo() {
  return (
    <>
    <div className="flex items-center space-x-3">
   <Logo/>
  </div>
  <p className="mt-4 font-semibold md:font-semibold font-normal sm:text-sm text-[0.8rem] opacity-60 mt-4 mb-7">
    Making the world a better place through constructing elegant
    hierarchies.
  </p>
    </>
  )
}
