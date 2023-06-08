import { styled } from "styled-components";
import HeaderComp from "../components/Header";
import { Typography, message, Upload } from "antd";
import { InboxOutlined } from '@ant-design/icons';

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
`

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const MainPage = () => {
  return (
		<>
			<HeaderComp />

			<Headline>
				<Typography.Title level={1} id="headline-title">세상에서 가장 빠르게 숏츠 영상 만들기</Typography.Title>
				<p id="headline-content">1분짜리 영상 만드는데 편집만 20분? 이제 영상 업로드하고 글자만 바꿔 숏츠 영상을 찍어내세요.</p>
			</Headline>

			<Dragger {...props}>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p className="ant-upload-text">Click or drag file to this area to upload</p>
				<p className="ant-upload-hint">
					Support for a single or bulk upload. Strictly prohibited from uploading company data or other
					banned files.
				</p>
			</Dragger>
		</>
	)
}

export default MainPage;