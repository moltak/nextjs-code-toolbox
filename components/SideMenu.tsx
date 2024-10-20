'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SideMenu = () => {
  const pathname = usePathname()

  const menuItems = [
    { href: '/', label: 'CSV to JSON' },
    { href: '/json-formatter', label: 'JSON FORMATTER' },
    { href: '/json-to-csv', label: 'JSON to CSV' },
    { href: '/json-to-yaml', label: 'JSON to YAML' },
  ]

  return (
    <nav className="w-64 bg-gray-800 min-h-screen p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Code Toolbox</h1>
      <ul>
        {menuItems.map((item) => (
          <li key={item.href} className="mb-2">
            <Link
              href={item.href}
              className={`block p-2 rounded ${
                pathname === item.href
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SideMenu
