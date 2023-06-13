import React, { useState } from 'react'
import { Form, Typography, Input, Select, Space } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { styled } from 'styled-components'

const { Title } = Typography

const VideoEditorContainer = styled.div`
	display: flex;
`

const PreviewContainer = styled.div`
	position: relative;
	height: 330px;
	width: 185px;
	margin: 8px;
	overflow: hidden;
	border-radius: 8px;
`

const PreviewBackgroundContainer = styled.div`
	height: 330px;
	width: 185px;
	/*background-color: black;*/
	filter: blur(3px);
`

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
`

const PreviewTextContainer = styled.div`
	position: absolute;
	top: 20px;
`

const PreviewText = styled.p`
	width: 185px;
	text-align: center;
	margin: 0;
	white-space: nowrap;
`

const Watermark = styled.p`
	position:absolute;
	top: 90%;
	width: 185px;
	text-align: center;
	color: gray;
	font-size: 8px;
`

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
  const [recipe, setRecipe] = useState({
    text1: {
      text: 'TEXT1',
      color: '#FF0000',
      font: 'NotoSansKR',
      weight: 'Bold',
      fontSize: 0.1
    },
    text2: {
      text: 'TEXT2',
      color: '#FF0000',
      font: 'NotoSansKR',
      weight: 'Bold',
      fontSize: 0.1
    },
    video: {
      startAt: 0,
      endAt: data.videoDuration,
      blankFill: 'Black',
      videoSize: '0.65'
    }
  })

  const onInputChanged = ({ target }) => {
    const [depth1, depth2] = target.id.split('.')
    const newRecipe = { ...recipe }
    newRecipe[depth1][depth2] = target.value
    setRecipe(newRecipe)

    console.log(newRecipe)
  }

  return (
		<VideoEditorContainer>
			<PreviewContainer>
				<PreviewBackgroundContainer style={{ backgroundImage: 'url("' + data.thumbnailUrl + '")' }} />
				<PreviewTextContainer>
					<PreviewText style={{ color: recipe.text1.color }}>{recipe.text1.text}</PreviewText>
					<PreviewText style={{ color: recipe.text2.color }}>{recipe.text2.text}</PreviewText>
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
							<Input id="text1.text" type="text" placeholder="상단 텍스트 입력" maxLength={20} onChange={onInputChanged} value={recipe.text1.text} />
						</Form.Item>
					</Form>
					<Form layout="vertical" style={{ flex: 0.5, marginLeft: 8 }}>
						<Form.Item label="상단 텍스트 색상">
							<Input id="text1.color" type="color" onChange={onInputChanged} value={recipe.text1.color} />
						</Form.Item>
					</Form>
					<Form layout="vertical" style={{ flex: 0.5, marginLeft: 8 }}>
						<Form.Item label="상단 텍스트 크기">
							<Input id="text1.fontSize" type="range" min={0.05} max={0.15} step={0.01} value={recipe.text1.fontSize} onChange={onInputChanged} />
						</Form.Item>
					</Form>
					<Form layout="vertical" style={{ flex: 0.75, marginLeft: 8 }}>
						<Form.Item label="상단 텍스트 폰트">
							<Space.Compact style={{ width: '100%' }}>
								<Select defaultValue="NotoSansKR" value={recipe.text1.font} onSelect={(value) => onInputChanged({
								  target: {
								    id: 'text1.font',
								    value
								  }
								})}>
									<Select.Option value="NotoSansKR">NotoSansKR</Select.Option>
									<Select.Option value="SCDream">SCDream</Select.Option>
								</Select>
								<Select defaultValue="Bold" value={recipe.text1.weight} onSelect={(value) => onInputChanged({
								  target: {
								    id: 'text1.weight',
								    value
								  }
								})}>
									<Select.Option value="Bold">Bold</Select.Option>
									<Select.Option value="">Normal</Select.Option>
									<Select.Option value="Light">Light</Select.Option>
								</Select>
							</Space.Compact>
						</Form.Item>
					</Form>
				</EditorInputGroup>

				<EditorInputGroup>
					<Form layout="vertical" requiredMark="optional" style={{ flex: 1.5 }}>
						<Form.Item
							label="하단 텍스트"
							tooltip={{ title: '최대 20자 까지 입력 가능', icon: <InfoCircleOutlined /> }}>
							<Input id="text2.text" type="text" placeholder="하단 텍스트 입력" maxLength={20} onChange={onInputChanged} value={recipe.text2.text} />
						</Form.Item>
					</Form>
					<Form layout="vertical" style={{ flex: 0.5, marginLeft: 8 }}>
						<Form.Item label="하단 텍스트 색상">
							<Input id="text2.color" type="color" onChange={onInputChanged} value={recipe.text2.color} />
						</Form.Item>
					</Form>
					<Form layout="vertical" style={{ flex: 0.5, marginLeft: 8 }}>
						<Form.Item label="하단 텍스트 크기">
							<Input id="text2.fontSize" type="range" min={0.05} max={0.15} step={0.01} value={recipe.text2.fontSize} onChange={onInputChanged} />
						</Form.Item>
					</Form>
					<Form layout="vertical" style={{ flex: 0.75, marginLeft: 8 }}>
						<Form.Item label="하단 텍스트 폰트">
							<Space.Compact style={{ width: '100%' }}>
								<Select defaultValue="NotoSansKR" value={recipe.text2.font} onSelect={(value) => onInputChanged({
								  target: {
								    id: 'text2.font',
								    value
								  }
								})}>
									<Select.Option value="NotoSansKR">NotoSansKR</Select.Option>
									<Select.Option value="SCDream">SCDream</Select.Option>
								</Select>
								<Select defaultValue="Bold" value={recipe.text2.weight} onSelect={(value) => onInputChanged({
								  target: {
								    id: 'text2.weight',
								    value
								  }
								})}>
									<Select.Option value="Bold">Bold</Select.Option>
									<Select.Option value="">Normal</Select.Option>
									<Select.Option value="Light">Light</Select.Option>
								</Select>
							</Space.Compact>
						</Form.Item>
					</Form>
				</EditorInputGroup>

				<EditorInputGroup>
					<Form layout="vertical" style={{ flex: 0.5 }}>
						<Form.Item label="비디오 시작 시간">
							<Input type="number" id="video.startAt" addonAfter="초" defaultValue={0} min={0} max={data.videoDuration} step={0.1} onChange={onInputChanged} />
						</Form.Item>
					</Form>
					<Form layout="vertical" style={{ flex: 0.5, marginLeft: 8 }}>
						<Form.Item label="비디오 종료 시간">
							<Input type="number" id="video.endAt" addonAfter="초" defaultValue={data.videoDuration > 60 ? 60 : data.videoDuration} min={0} max={data.videoDuration} step={0.1} onChange={onInputChanged} />
						</Form.Item>
					</Form>
					<Form layout="vertical" style={{ flex: 0.5, marginLeft: 8 }}>
						<Form.Item label="배경 처리">
							<Select defaultValue="Black" value={recipe.video.blankFill} onSelect={(value) => onInputChanged({
							  target: {
							    id: 'video.blankFill',
							    value
							  }
							})}>
								<Select.Option value="Black">검정</Select.Option>
								<Select.Option value="Blur">블러</Select.Option>
							</Select>
						</Form.Item>
					</Form>
					<Form layout="vertical" style={{ flex: 0.5, marginLeft: 8 }}>
						<Form.Item label="동영상 표시 크기">
							<Select defaultValue="0.65" value={recipe.video.videoSize} onSelect={(value) => onInputChanged({
							  target: {
							    id: 'video.videoSize',
							    value
							  }
							})}>
								<Select.Option value="0.5">작게</Select.Option>
								<Select.Option value="0.65">보통</Select.Option>
								<Select.Option value="1.0">꽉 차게</Select.Option>
							</Select>
						</Form.Item>
					</Form>
				</EditorInputGroup>
			</EditorContainer>
		</VideoEditorContainer>
  )
}

export default VideoEditor
