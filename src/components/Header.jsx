import React from 'react'
import '../css/header.css'
import { Menu } from 'antd'
import { styled } from 'styled-components'

const Logo = styled.div`
	width: 140px;
	height: 32px;
	background-color: rgba(0, 0, 0, 0.88);
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
  return (
		<Header>
			<div className="container">
				<Logo />

				<Menu mode="horizontal" style={{ marginLeft: 32, borderBottom: 'none' }}>
					<Menu.Item>프로젝트에 대해</Menu.Item>
					<Menu.Item>개발팀</Menu.Item>
				</Menu>
			</div>
		</Header>
  )
}

export default HeaderComp
