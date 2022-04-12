import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthLayout from '../components/auth/AuthLayout';
import Button from '../components/auth/Button';
import FormBox from '../components/auth/FormBox';
import Input from '../components/auth/Input';
import Seperator from '../components/auth/Seperator';
import BottomBox from '../components/auth/ButtonBox';
import PageTitle from '../components/PageTitle';
import { LoginMutation, useLoginMutation } from '../graphql/generated';
import FormError from '../components/auth/FormError';
import { logUserIn } from '../apollo/vars';

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

interface IForm {
  username: string;
  password: string;
  result?: string;
}

interface ILocation {
  state: {
    username: string;
    password: string;
    message: string;
  };
}

const Login = () => {
  const { state } = useLocation() as ILocation;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<IForm>({
    mode: 'onChange',
    defaultValues: {
      username: state?.username || '',
      password: state?.password || '',
    },
  });
  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError('result', { message: error! });
    }
    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading }] = useLoginMutation({ onCompleted });
  const onSubmitValid = ({ username, password }: IForm) => {
    if (loading) return;
    login({ variables: { username, password } });
  };
  const clearLoginError = () => {
    clearErrors('result');
  };

  return (
    <AuthLayout>
      <PageTitle title="로그인" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <Notification>{state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register('username', {
              required: '필수 입력 사항입니다',
              minLength: {
                value: 3,
                message: '3자 이상 입력해주세요',
              },
            })}
            name="username"
            type="text"
            placeholder="Username"
            onChange={clearLoginError}
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register('password', {
              required: '필수 입력 사항입니다',
            })}
            name="password"
            type="password"
            placeholder="Password"
            onChange={clearLoginError}
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? '로딩중' : '로그인'}
            disabled={loading}
          />
          <FormError message={errors?.result?.message} />
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
