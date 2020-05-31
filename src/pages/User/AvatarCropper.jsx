import React, { useState, useCallback } from 'react'

import Cropper from 'react-easy-crop'
import { Button, Modal } from 'semantic-ui-react'

import './User.css'


const AvatarCropper = (props) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels)
	}, [])

    function createFile(url, filename, mimeType){
        return (
			fetch(url)
				.then(res => res.arrayBuffer())
				.then(buf => new File([buf], filename, { type: mimeType }))
        )
	}
	
	const createImage = url => {
		return new Promise((resolve, reject) => {
			const image = new Image()
			image.addEventListener('load', () => resolve(image))
			image.addEventListener('error', error => reject(error))
			image.src = url
		})
	}

	const getCroppedImg = async (imageSrc, sizes) => {
		const image = await createImage(imageSrc)
		const canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')

		const maxSize = Math.max(image.width, image.height)
		const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

		canvas.width = safeArea
		canvas.height = safeArea

		ctx.drawImage(
			image,
			safeArea / 2 - image.width * 0.5,
			safeArea / 2 - image.height * 0.5
		)
		const data = ctx.getImageData(0, 0, safeArea, safeArea)

		canvas.width = sizes.width
		canvas.height = sizes.height

		ctx.putImageData(
			data,
			0 - safeArea / 2 + image.width * 0.5 - sizes.x,
			0 - safeArea / 2 + image.height * 0.5 - sizes.y
		)
		
		const imageUrl = canvas.toDataURL('image/png');
		props.setNewAvatar(imageUrl)
		return imageUrl
	}

	const onCropImage = async () => {
		const image = await getCroppedImg(props.avatar, croppedAreaPixels)
		createFile(image, 'avatar.png', 'image/png')
    		.then(file => props.cropImage(file))
	}

	return (
		<Modal className="crop-modal" open={true}>
			<Modal.Content className="crop-modal">
				<div className="cropper-container">
					<Cropper
						image={props.avatar}
						crop={crop}
						zoom={zoom}
						aspect={1 / 1}
						onCropChange={setCrop}
						onCropComplete={onCropComplete}
						onZoomChange={setZoom}
					/>
				</div>
			</Modal.Content>
			<div className="crop-button">
				<Button onClick={onCropImage} color="red">Crop image</ Button>
			</div>
		</Modal>
	)
}

export default AvatarCropper