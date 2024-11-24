import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const Image = ({
	src,
	alt,
	width,
	height,
	className = '',
	loading = 'lazy',
	placeholder = 'blur',
	quality = 75,
	onLoad,
	...props
}) => {
	const [imageSrc, setImageSrc] = useState(src)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		setImageSrc(src)
	}, [src])

	const handleLoad = (event) => {
		setIsLoading(false)
		if (onLoad) {
			onLoad(event)
		}
	}

	const handleError = (error) => {
		setError(error)
		setIsLoading(false)
		// You can set a fallback image here
		setImageSrc('/path-to-fallback-image.jpg')
	}

	const imgStyle = {
		opacity: isLoading ? 0.5 : 1,
		transition: 'opacity 0.3s ease-in-out',
	}

	// Optional blur placeholder
	const blurDataURL = placeholder === 'blur' ?
		'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0cHBwcHx0cHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBz/2wBDAR0XFx8bHxwcHxwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
		: undefined

	return (
		<img
			src={imageSrc}
			alt={alt}
			width={width}
			height={height}
			className={className}
			loading={loading}
			onLoad={handleLoad}
			onError={handleError}
			style={imgStyle}
			{...(blurDataURL && { placeholder: blurDataURL })}
			{...props}
		/>
	)
}

Image.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	className: PropTypes.string,
	loading: PropTypes.oneOf(['lazy', 'eager']),
	placeholder: PropTypes.oneOf(['blur', 'empty']),
	quality: PropTypes.number,
	onLoad: PropTypes.func,
}