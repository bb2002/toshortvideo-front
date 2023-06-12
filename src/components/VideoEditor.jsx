import React, { useState } from 'react';
import { Form, Typography, Input, Select, Slider } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { styled } from 'styled-components';

const { Title } = Typography;

const VideoEditorContainer = styled.div`
	display: flex;
`;

const PreviewContainer = styled.div`
	position: relative;
	height: 330px;
	width: 185px;
	margin: 8px;
	overflow: hidden;
	border-radius: 8px;
`;

const PreviewBackgroundContainer = styled.div`
	height: 330px;
	width: 185px;
	/*background-color: black;*/
	filter: blur(3px);
`;

const PreviewImgContainer = styled.div`
	position: absolute;
	height: 330px;
	width: 185px;
	display: flex;
	justify-content: center;
  align-items: center;
	overflow: hidden;
	top: 0;
	left: 0;

	img {
		width: 185px;
	}
`;

const PreviewTextContainer = styled.div`
	position: absolute;
	top: 20px;
`;

const PreviewText = styled.p`
	width: 185px;
	text-align: center;
	margin: 0;
	white-space: nowrap;
`;

const Watermark = styled.p`
	position:absolute;
	top: 90%;
	width: 185px;
	text-align: center;
	color: gray;
	font-size: 8px;
`;

const EditorContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	margin-left: 48px;
	margin-top: 8px;
`

const EditorInputGroup = styled.div`
	display: flex;
	width: 100%;
`

const VideoEditor = ({ data }) => {
	const [recipe, setRecipe] = useState({})

  return (
		<VideoEditorContainer>
			<PreviewContainer>
				<PreviewBackgroundContainer style={{ backgroundImage: 'url("'+data.thumbnailUrl+'")' }} />
				<PreviewTextContainer>
					<PreviewText style={{ color: 'white' }}>이게 어떻게 힐러임 탱커 때려잡는 브리기테</PreviewText>
					<PreviewText style={{ color: 'white' }}>TEXT2</PreviewText>
				</PreviewTextContainer>
				<PreviewImgContainer>
					<img src={data.thumbnailUrl} />
				</PreviewImgContainer>
				<Watermark>Make with toshort.video</Watermark>
			</PreviewContainer>

			<EditorContainer>
				<Title level={3} style={{ marginBottom: 16 }}>동영상 편집 구성</Title>
				<EditorInputGroup>
					<Form layout="vertical" requiredMark="optional" style={{ flex: 1.5 }}>
						<Form.Item
							label="상단 텍스트"
							tooltip={{ title: '최대 20자 까지 입력 가능', icon: <InfoCircleOutlined /> }}>
							<Input type="text" placeholder="상단 텍스트 입력" maxLength={20}/>
						</Form.Item>
					</Form>
					<Form layout="vertical" style={{ flex: 0.5, marginLeft: 8 }}>
						<Form.Item label="상단 텍스트 색상">
							<Input type="color" />
						</Form.Item>
					</Form>
					<Form layout="vertical" style={{ flex: 0.5, marginLeft: 8 }}>
						<Form.Item label="상단 텍스트 크기">
							<Input type="range" min={0.05} max={0.15} step={0.01} value={0.1} />
						</Form.Item>
					</Form>
					<Form layout="vertical" style={{ flex: 0.5, marginLeft: 8  }}>
						<Form.Item label="상단 텍스트 폰트">
							<Select defaultValue="NotoSans">
								<Select.Option value="NotoSansKR">NotoSansKR</Select.Option>
								<Select.Option value="SCDream">SCDream</Select.Option>
							</Select>
						</Form.Item>
					</Form>
				</EditorInputGroup>
			</EditorContainer>
		</VideoEditorContainer>
	)
}

export default VideoEditor;