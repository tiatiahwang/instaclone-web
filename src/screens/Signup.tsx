import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthLayout from '../components/auth/AuthLayout';
import FormBox from '../components/auth/FormBox';
import PageTitle from '../components/PageTitle';
import { FatLink } from '../components/shared';
import Input from '../components/auth/Input';
import Button from '../components/auth/Button';
import BottomBox from '../components/auth/ButtonBox';
import FormError from '../components/auth/FormError';
import {
  CreateAccountMutation,
  useCreateAccountMutation,
} from '../graphql/generated';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

interface IForm {
  firstName: string;
  lastName?: string;
  email: string;
  username: string;
  password: string;
  result?: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm<IForm>({ mode: 'onChange' });

  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError('result', { message: error! });
    }
    const { username, password } = getValues();
    navigate('/', {
      state: { username, password, message: '계정이 생성되었습니다' },
    });
  };

  const [signup, { loading }] = useCreateAccountMutation({ onCompleted });

  const onSubmitValid = ({
    email,
    firstName,
    lastName,
    username,
    password,
  }: IForm) => {
    if (loading) return;
    signup({
      variables: { email, firstName, lastName, username, password },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="회원가입" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>친구들의 사진과 동영상을 보려면 가입하세요.</Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register('email', {
              required: '필수 입력 사항입니다',
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                message: '이메일 형식에 맞게 입력해주세요',
              },
            })}
            name="email"
            type="text"
            placeholder="이메일"
            hasError={Boolean(errors?.email?.message)}
          />
          <FormError message={errors?.email?.message} />
          <Input
            {...register('firstName', {
              required: '필수 입력 사항입니다',
            })}
            name="firstName"
            type="text"
            placeholder="이름"
          />
          <FormError message={errors?.firstName?.message} />
          <Input
            {...register('lastName', {})}
            name="lastName"
            type="text"
            placeholder="성"
          />
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
            placeholder="사용자 이름"
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register('password', {
              required: '필수 입력 사항입니다',
            })}
            name="password"
            type="password"
            placeholder="비밀번호"
          />
          <Button type="submit" value={'가입'} />
          <FormError message={errors?.result?.message} />
        </form>
      </FormBox>
      <BottomBox text="계정이 있으신가요?" linkText="로그인" link="/" />
    </AuthLayout>
  );
};

export default Signup;
