import React from 'react'

function Header() {
  return (
    <div
      style={{
        position: 'sticky',
        height: '60px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        boxSizing: 'border-box',
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            marginRight: '10px',
          }}
        />
        <span
          style={{
            fontWeight: 'bold',
            fontSize: '16px',
          }}
        >
          User Name
        </span>
      </div>
      <div>
        <img
          src="https://via.placeholder.com/80"
          alt="Logo"
          style={{
            width: '80px',
            height: '40px',
          }}
        />
      </div>
      <div>
        <button
          style={{
            backgroundColor: '#007aff',
            color: '#fff',
            borderRadius: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Add Post
        </button>
      </div>
    </div>
  )
}

export default Header
