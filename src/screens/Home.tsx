import { useSeeFeedQuery } from '../graphql/generated';
import PageTitle from '../components/PageTitle';
import Photo from '../components/feed/Photo';

const Home = () => {
  const { data = {} } = useSeeFeedQuery();
  return (
    <>
      <PageTitle title="홈" />
      {data?.seeFeed?.map((photo) => (
        <Photo key={photo?.id} photo={photo} />
      ))}
    </>
  );
};

export default Home;
