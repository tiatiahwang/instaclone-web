import styled from 'styled-components';
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthLayout from '../components/auth/AuthLayout';
import Button from '../components/auth/Button';
import FormBox from '../components/auth/FormBox';
import Input from '../components/auth/Input';
import Seperator from '../components/auth/Seperator';
import BottomBox from '../components/auth/ButtonBox';
import PageTitle from '../components/PageTitle';

const Notification = styled.div`
  color: #2ecc71;
`;

const GithubLogin = styled.div`
  color: #0e1117;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Login = () => {
  return (
    <AuthLayout>
      <PageTitle title="로그인" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <Notification></Notification>
        <form>
          <Input name="username" type="text" placeholder="Username" />
          <Input name="password" type="password" placeholder="Password" />
          <Button type="submit" value={'로그인'} />
        </form>
        <Seperator />
        <GithubLogin>
          <FontAwesomeIcon icon={faGithub} />
          <span>깃헙 로그인</span>
        </GithubLogin>
      </FormBox>
      <BottomBox
        text="계정이 없으신가요?"
        linkText="가입하기"
        link="/sign-up"
      />
    </AuthLayout>
  );
};

export default Login;
