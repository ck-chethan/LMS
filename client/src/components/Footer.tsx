import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="footer">
      <p>&copy; 2025 Scale Up. All rights reserved.</p>
      <div className="footer__links">
        {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map(
          (link, index) => (
            <Link
              key={index}
              href={`/${link.toLowerCase().replace(' ', '-')}`}
              className="footer__link"
              scroll={false}
            >
              {link}
            </Link>
          )
        )}
      </div>
    </div>
  )
}

export default Footer
