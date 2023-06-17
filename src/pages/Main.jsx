import React, { useState } from 'react'
import { styled } from 'styled-components'
import HeaderComp from '../components/Header'
import { Alert, Button, Collapse, Typography, Upload } from 'antd'
import { VideoCameraAddOutlined, RocketOutlined } from '@ant-design/icons'
import VideoEditor from '../components/VideoEditor'
import Footer from '../components/Footer'
import axios from 'axios'
import { REQUEST_ENCODE_API, UPLOAD_API } from '../constant'
import { redirect } from "react-router-dom";
import HeadLineComp from '../components/HeadLine'

const { Dragger } = Upload

const ButtonContainer = styled.div`
	width: 100%;
	margin-top: 16px;
	margin-bottom: 64px;
	display: flex;
`

const getDefaultRecipe = (data) => ({
	text1: {
		text: 'TEXT1',
		color: '#FF0000',
		font: 'NotoSansKR',
		fontSize: 0.1
	},
	text2: {
		text: 'TEXT2',
		color: '#FF0000',
		font: 'NotoSansKR',
		fontSize: 0.1
	},
	video: {
		startAt: 0,
		endAt: data.videoDuration,
		blankFill: 'Black',
		videoSize: '0.65'
	}
})

const MainPage = () => {
  const [errorAlert, setErrorAlert] = useState(null)
  const [uploadingFile, setUploadingFile] = useState(null)
  const [uploadedFiles, setUploadedFiles] = useState([])
	const [encodingRecipe, setEncodingRecipe] = useState([])
	const [isEncodingRequested, setIsEncodingRequested] = useState(false)

  const props = {
    action: UPLOAD_API,
    multiple: false,
    method: 'PUT',
    name: 'file',
    onChange (info) {
      const { status } = info.file

      if (status === 'uploading') {
        setUploadingFile(info.file)
        setErrorAlert(null)
      } else {
        if (status === 'done') {
					const data = info.file.response
          setUploadedFiles([...uploadedFiles, info.file])
					setEncodingRecipe([...encodingRecipe, { uuid: data.uuid, recipe: getDefaultRecipe(data) }])
        }

        if (status === 'error') {
          setErrorAlert('동영상을 업로드하지 못했습니다.')
        }

        setUploadingFile(null)
      }
    }
  }

	const onRequestEncodeingButtonClicked = async () => {
		setIsEncodingRequested(true)
		axios.post(REQUEST_ENCODE_API, encodingRecipe).then((response) => {
			const { data } = response
			window.location.href = `/${data.orderUUID}`
		}).catch((ex) => {
			setErrorAlert(ex.message)
		})
	}

	const onRecipeChanged = (recipe, uuid) => {
		const recipes = encodingRecipe.filter((recipe) => recipe.uuid !== uuid);
		setEncodingRecipe([...recipes, { uuid, recipe }])
	}

  return (
		<>
			<HeaderComp />
			<div className="container">
				<HeadLineComp />

				{
					errorAlert && <>
						<Alert message={errorAlert} type="error" showIcon style={{ marginBottom: 32 }} />
					</>
				}

				{
					uploadedFiles.length > 0 && <>
						<Collapse accordion defaultActiveKey={encodingRecipe.map((recipe => recipe.uuid))} items={uploadedFiles.map(({ response }) => ({
						  key: response.uuid,
						  label: response.originalVideoName,
						  children: <VideoEditor 
								data={response}
								defaultRecipe={getDefaultRecipe(response)}
								onRecipeChanged={(recipe) => onRecipeChanged(recipe, response.uuid)} />
						}))} />
						<ButtonContainer>
							<Button 
								type="primary"
								icon={<RocketOutlined />}
								size="large"
								style={{ marginLeft: 'auto' }}
								onClick={onRequestEncodeingButtonClicked}
								loading={isEncodingRequested}>
								인코딩 시작
							</Button>
						</ButtonContainer>

						<div style={{ height: 40 }} />
					</>
				}

				<Dragger {...props} fileList={uploadingFile ? [uploadingFile] : []}>
					<p className="ant-upload-drag-icon">
						<VideoCameraAddOutlined />
					</p>
					<p className="ant-upload-text">이곳에 편집할 동영상을 드래그하세요.</p>
					<p className="ant-upload-hint">
						mp4, mkv 확장의 파일을 지원하며, 업로드된 파일은 상단 &apos;개발팀&apos;의 업로드 정책을 따릅니다.
					</p>
				</Dragger>

				<Footer />
			</div>
		</>
  )
}

export default MainPage
