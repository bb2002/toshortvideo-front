import React from 'react'
import { styled } from 'styled-components'

const FooterComp = styled.footer`
	width: 100%;
	margin-top: 96px;
	margin-bottom: 16px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-top: 1px solid #ecf0f1;

	p {
		font-size: 0.75rem;
		color: #95a5a6;
		padding: 16px;
	}
`

const Footer = () => {
  return (<FooterComp>
		<p>Copyright 2015-2023 Ballbot All rights reserved.</p>
	</FooterComp>)
}

export default Footer;