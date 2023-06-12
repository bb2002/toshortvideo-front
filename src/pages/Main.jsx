import { useState } from "react";
import { styled } from "styled-components";
import HeaderComp from "../components/Header";
import { Alert, Typography, Upload } from "antd";
import { VideoCameraAddOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

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
`;


const MainPage = () => {
	const [errorAlert, setErrorAlert] = useState(null);
	const [uploadingFile, setUploadingFile] = useState(null);
	const [uploadedFiles, setUploadedFiles] = useState([]);

	const props = {
		action: 'https://tsvapi.blbt.app/editor/upload',
		multiple: true,
		method: 'PUT',
		name: 'file',
		onChange(info) {
			const { status } = info.file;

			if (status === 'uploading') {
				setUploadingFile(info.file);
				setErrorAlert(null);
			} else {
				if (status === 'done') {
					setUploadedFiles([...uploadedFiles, info.file]);
				}
	
				if (status === 'error') {
					setErrorAlert('동영상을 업로드하지 못했습니다.');
				}

				setUploadingFile(null);
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
					uploadedFiles.map((uploadedFile) => (<>
						<p>{uploadedFile.response.uuid}</p>
					</>))
				}

				<Dragger {...props} fileList={uploadingFile ? [uploadingFile] : []}>
					<p className="ant-upload-drag-icon">
						<VideoCameraAddOutlined />
					</p>
					<p className="ant-upload-text">이곳에 편집할 동영상을 드래그하세요.</p>
					<p className="ant-upload-hint">
						mp4, mkv 확장의 파일을 지원하며, 업로드된 파일은 상단 '개발팀'의 업로드 정책을 따릅니다.
					</p>
				</Dragger>
			</div>
		</>
	)
}

export default MainPage;