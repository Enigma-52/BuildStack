import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

export const Link = ({ 
  href, 
  children, 
  className = '', 
  prefetch = true,
  replace = false,
  scroll = true,
  onClick,
  ...props 
}) => {
  const navigate = useNavigate()

  const handleClick = (e) => {
    if (onClick) {
      onClick(e)
    }

    // Handle external links
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return
    }

    e.preventDefault()
    
    if (replace) {
      navigate(href, { replace: true })
    } else {
      navigate(href)
    }

    if (scroll) {
      window.scrollTo(0, 0)
    }
  }

  // Handle external links
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a 
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    )
  }

  // Internal links
  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  prefetch: PropTypes.bool,
  replace: PropTypes.bool,
  scroll: PropTypes.bool,
  onClick: PropTypes.func,
}