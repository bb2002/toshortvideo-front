import React, { useState } from 'react'
import { styled } from 'styled-components'
import HeaderComp from '../components/Header'
import { Alert, Collapse, Typography, Upload } from 'antd'
import { VideoCameraAddOutlined } from '@ant-design/icons'
import VideoEditor from '../components/VideoEditor'

const { Dragger } = Upload

const Headline = styled.div`
	margin-top: 96px;
	margin-bottom: 96px;

	#headline-title {
		text-align: center;
		color: #FA8231;
		margin-bottom: 8px;
	}

	#headline-content {
		text-align: center;
		color: #5A5A5A;
		font-size: 0.82rem;
	}
`

const MainPage = () => {
  const [errorAlert, setErrorAlert] = useState(null)
  const [uploadingFile, setUploadingFile] = useState(null)
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      response: {
        uuid: '22c61ea6-789c-4de0-a447-20f1f8b87c60',
        originalVideoName: 'video.mp4',
        videoSize: 1128375,
        videoMimetype: 'video/mp4',
        videoDuration: 5.055,
        downloadUrl: 'https://toshortvideo.d472b93232e7d3b8189d494a36bc92a8.r2.cloudflarestorage.com/uploadedVideos/22c61ea6-789c-4de0-a447-20f1f8b87c60?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=2ed46946fc06273087b504258cf4a3bf%2F20230603%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230603T085539Z&X-Amz-Expires=86400&X-Amz-Signature=931692b492cc4496ff38ee2b1c45823c8f3c89cc9453c90059f5732dc3eb9439&X-Amz-SignedHeaders=host',
        thumbnailUrl: 'https://toshortvideo.d472b93232e7d3b8189d494a36bc92a8.r2.cloudflarestorage.com/thumbnailImages/8b9d779b-0add-4a52-a55f-c442f4ad3178?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=2ed46946fc06273087b504258cf4a3bf%2F20230612%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230612T031958Z&X-Amz-Expires=86400&X-Amz-Signature=dc5b25a7a75a2140c6a080255525afec90f7e80b60bd81bd343f26d1306dfa0f&X-Amz-SignedHeaders=host',
        expiredAt: '2023-06-04T08:55:39.827Z',
        id: 2,
        createdAt: '2023-06-02T23:55:39.856Z'
      }
    }

  ])

  const props = {
    action: 'https://tsvapi.blbt.app/editor/upload',
    multiple: true,
    method: 'PUT',
    name: 'file',
    onChange (info) {
      const { status } = info.file

      if (status === 'uploading') {
        setUploadingFile(info.file)
        setErrorAlert(null)
      } else {
        if (status === 'done') {
          setUploadedFiles([...uploadedFiles, info.file])
        }

        if (status === 'error') {
          setErrorAlert('동영상을 업로드하지 못했습니다.')
        }

        setUploadingFile(null)
      }
    }
  }

  return (
		<>
			<HeaderComp />
			<div className="container">
				<Headline>
					<Typography.Title level={1} id="headline-title">세상에서 가장 빠르게 숏츠 영상 만들기</Typography.Title>
					<p id="headline-content">1분짜리 영상 만드는데 편집만 20분? 이제 영상 업로드하고 글자만 바꿔 숏츠 영상을 찍어내세요.</p>
				</Headline>

				{
					errorAlert && <>
						<Alert message={errorAlert} type="error" showIcon style={{ marginBottom: 32 }} />
					</>
				}

				{
					uploadedFiles.length > 0 && <>
						<Collapse accordion items={uploadedFiles.map(({ response }) => ({
						  key: response.uuid,
						  label: response.originalVideoName,
						  children: <VideoEditor data={response} />
						}))} />
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
			</div>
		</>
  )
}

export default MainPage
