'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SideMenu = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const menuItems = [
    { href: '/', label: 'CSV to JSON' },
    { href: '/json-formatter', label: 'JSON Formatter' },
    { href: '/json-to-csv', label: 'JSON to CSV' },
    { href: '/json-to-yaml', label: 'JSON to YAML' },
  ]

  const toggleMenu = () => setIsOpen(!isOpen)

  const MenuContent = () => (
    <ul>
      {menuItems.map((item) => (
        <li key={item.href} className="mb-2">
          <Link
            href={item.href}
            className={`block p-2 rounded ${
              pathname === item.href ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => isMobile && setIsOpen(false)}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      {isMobile && (
        <header className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center z-20">
          <h1 className="text-2xl font-bold">Code Toolbox</h1>
          <button className="p-2 bg-gray-700 rounded" onClick={toggleMenu}>
            ☰
          </button>
        </header>
      )}
      <nav
        className={`${
          isMobile
            ? `fixed inset-y-0 left-0 transform ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
              } transition-transform duration-300 ease-in-out z-30 pt-16`
            : 'relative'
        } w-64 bg-gray-800 min-h-screen p-4`}
      >
        {!isMobile && <h1 className="text-2xl font-bold text-white mb-6">Code Toolbox</h1>}
        <MenuContent />
      </nav>
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-20" onClick={toggleMenu}></div>
      )}
    </>
  )
}

export default SideMenu
