import React from 'react'
import { Typography } from 'antd'
import { styled } from 'styled-components'

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

const HeadLineComp = () => {
  return (
		<Headline>
			<Typography.Title level={1} id="headline-title">세상에서 가장 빠르게 숏츠 영상 만들기</Typography.Title>
			<p id="headline-content">1분짜리 영상 만드는데 편집만 20분? 이제 영상 업로드하고 글자만 바꿔 숏츠 영상을 찍어내세요.</p>
		</Headline>
	)
}

export default HeadLineComp;