import { useParams } from 'react-router-dom';

const Profile = () => {
  const { username } = useParams();
  return <>profile</>;
};

export default Profile;
