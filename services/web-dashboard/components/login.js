import React , { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
`
const Container = styled.div`
  margin: 20px;
  border: 1px #ccc solid;
  border-radius: 5px;
`
const InnerWrapper = styled.div`
  padding: 20px;
`

const Head = styled.h1`
  font-size: 30px;
  text-align: center;
  font-family: ${props => props.theme.font.family};
`

const InputText = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 15px;
  font-size: 18px;
  border-radius: 5px;
  border: 1px #ccc solid;
  margin-bottom: 15px;
`

const Button = styled.button`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 15px;
  font-size: 18px;
  text-align: center;
  font-family: ${props => props.theme.font.family};
  background-color: #157544;
  color: white;
  border-radius: 5px;
  border: 1px #ccc solid;

  &:hover {
    background-color: #25d47a;
  }
`
export default () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    console.log(username, password)
  }

  return (
    <Wrapper>
      <Container>
        <InnerWrapper>
          <Head>SignIn</Head>
          <InputText value={username} onChange={handleUsernameChange} placeholder="Username"/>
          <InputText value={password} onChange={handlePasswordChange} type="password" placeholder="Password"/>
          <Button onClick={handleLogin} >Login</Button>
        </InnerWrapper>
      </Container>
    </Wrapper>
  )
}