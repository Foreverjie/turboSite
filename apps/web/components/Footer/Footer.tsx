import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div className="phone">
      <nav className="tab-bar mt-auto flex justify-between w-full p-9 pt-6 rounded-t-[31px] rounded-b-[41px] bg-[#151519]">
        <button className="home active cursor-pointer block relative bg-transparent border-0 p-4 m-0 text-gray-500 transition-colors duration-[350ms]">
          <svg viewBox="0 0 24 24">
            <path d="M3 18V10.5339C3 9.57062 3.46259 8.66591 4.24353 8.1019L10.2435 3.76856C11.2921 3.01128 12.7079 3.01128 13.7565 3.76856L19.7565 8.1019C20.5374 8.66591 21 9.57062 21 10.5339V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18Z" />
          </svg>
        </button>
        <button className="chart cursor-pointer block relative bg-transparent border-0 p-4 m-0 text-gray-500 transition-colors duration-[350ms]">
          <svg viewBox="0 0 24 24">
            <path d="M2.99625 7.99624C2.99625 5.23482 5.23482 2.99625 7.99625 2.99625H16.0037C18.7652 2.99625 21.0037 5.23482 21.0037 7.99625V16.0037C21.0037 18.7652 18.7652 21.0037 16.0037 21.0037H7.99624C5.23482 21.0037 2.99625 18.7652 2.99625 16.0037V7.99624Z" />
            <g>
              <path d="M7.49813 13.2605V16.0016" />
              <path d="M10.4994 7.99832V16.0017" />
              <path d="M13.5006 11.5068V16.0016" />
              <path d="M16.5019 6.75208V16.0017" />
            </g>
          </svg>
        </button>
        <button className="marker cursor-pointer block relative bg-transparent border-0 p-4 m-0 text-gray-500 transition-colors duration-[350ms]">
          <svg viewBox="0 0 24 24">
            <path d="M12 21C12 21 9.39536 18.8605 7.3637 16C6.06474 14.1711 5 12.0475 5 10C5 6.134 8.134 3 12 3C15.866 3 19 6.134 19 10C19 12.0475 17.9353 14.1711 16.6363 16C14.6046 18.8605 12 21 12 21Z" />
          </svg>
        </button>
        <button className="trophy cursor-pointer block relative bg-transparent border-0 p-4 m-0 text-gray-500 transition-colors duration-[350ms] before:content-[''] after:content-[''] before:absolute after:absolute before:bg-current after:bg-current before:left-1/2 after:left-1/2">
          <div className="left">
            <svg viewBox="0 0 24 24">
              <path d="M9 6.5H4C3.448 6.5 3 6.948 3 7.5V9.5C3 11.157 4.343 12.5 6 12.5H9" />
            </svg>
          </div>
          <div className="right">
            <svg viewBox="0 0 24 24">
              <path d="M15 6.5H20C20.552 6.5 21 6.948 21 7.5V9.5C21 11.157 19.657 12.5 18 12.5H15" />
            </svg>
          </div>
          <svg viewBox="0 0 24 24">
            <path d="M16 3.5H8C7.44772 3.5 7 3.94772 7 4.5V12.5C7 14.7091 8.79086 16.5 11 16.5H13C15.2091 16.5 17 14.7091 17 12.5V4.5C17 3.94772 16.5523 3.5 16 3.5Z" />
          </svg>
        </button>
        <button className="user cursor-pointer block relative bg-transparent border-0 p-4 m-0 text-gray-500 transition-colors duration-[350ms]">
          <div className="circle">
            <svg viewBox="0 0 24 24">
              <path d="M17.307 19.257C16.923 17.417 14.705 16 12 16C9.29499 16 7.07699 17.417 6.69299 19.257" />
            </svg>
          </div>
          <svg viewBox="0 0 24 24">
            <path d="M18.364 5.63604C21.8787 9.15076 21.8787 14.8492 18.364 18.3639C14.8493 21.8787 9.1508 21.8787 5.6361 18.3639C2.12138 14.8492 2.12138 9.15074 5.6361 5.63604C9.15082 2.12132 14.8493 2.12132 18.364 5.63604Z" />
          </svg>
        </button>
      </nav>
    </div>
  )
}

export default Footer
