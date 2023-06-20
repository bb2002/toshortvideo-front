import React, { useState } from 'react'
import '../css/header.css'
import { Menu, Modal } from 'antd'
import { styled } from 'styled-components'

const Logo = styled.div`
	width: 140px;
	height: 32px;
	display: flex;
	justify-content: center;
	align-items: center;

	p {
		font-family: 'GangwonTeunTeun';
		margin: 0;
		cursor: pointer;
	}
`

const Header = styled.header`
	width: 100%;
	height: 64px;
	border-bottom: 1px solid rgb(218,218,218);
	
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
	}
`

const HeaderComp = () => {
	const [isModalOpenAboutProject, setIsModalOpenAboutProject] = useState(false)
	const [isModalOpenAboutDeveloper, setIsModalOpenAboutDeveloper] = useState(false)

  return (
		<Header>
			<Modal title="TOSHORT.VIDEO Projects" open={isModalOpenAboutProject} onOk={() => setIsModalOpenAboutProject(false)} cancelButtonProps={{ style: { display: 'none' } }} closable={false}>
        <p>이 프로젝트는 개인이 무료로 운영하는 서비스 입니다.</p>
        <p>아래 업로드에 영상을 (MAX 2GB / 5개)업로드하고, 자막을 바꾸고 인코딩을 시작하세요! 1080x1920 사이즈의 숏츠 영상이 인코딩됩니다.</p>
      </Modal>

			<Modal title="Developers" open={isModalOpenAboutDeveloper} onOk={() => setIsModalOpenAboutDeveloper(false)} cancelButtonProps={{ style: { display: 'none' } }} closable={false}>
        <p>업로드된 파일은 Cloudflare 네트워크에 저장되며, 48시간이 지나면 자동으로 삭제됩니다.</p>
        <p>기타 문의는 Twitter @Ballbot3 로 연락 주세요.</p>
				<p>개발자의 포트폴리오 보기 <a href="https://ballbot.dev">https://ballbot.dev</a></p>
      </Modal>

			<div className="container">
				<Logo>
					<p onClick={() => window.location.href = '/'}>TOSHORT.VIDEO</p>
				</Logo>

				<Menu mode="horizontal" style={{ marginLeft: 32, borderBottom: 'none' }}>
					<Menu.Item onClick={() => setIsModalOpenAboutProject(true)}>프로젝트에 대해</Menu.Item>
					<Menu.Item onClick={() => setIsModalOpenAboutDeveloper(true)}>개발팀</Menu.Item>
				</Menu>
			</div>
		</Header>
  )
}

export default HeaderComp
