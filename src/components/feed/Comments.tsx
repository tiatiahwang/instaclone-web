import styled from 'styled-components';
import { gql } from '@apollo/client';
import { useForm } from 'react-hook-form';
import {
  SeeFeedQuery,
  useCreateCommentMutation,
} from '../../graphql/generated';
import Comment from './Comment';
import useUser from '../../hooks/useUser';

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-size: 10px;
  font-weight: 600;
`;

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid rgb(219, 219, 219);
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;

type ArrayElement<ArrayType extends readonly unknown[] | null | undefined> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
interface Props {
  photo: ArrayElement<SeeFeedQuery['seeFeed']>;
}

interface IForm {
  payload: string;
}

const Comments = ({ photo }: Props) => {
  const user = useUser();
  const { register, handleSubmit, setValue, getValues } = useForm<IForm>();
  const [createCommentMutation, { loading }] = useCreateCommentMutation({
    update: (cache, { data }) => {
      const { payload } = getValues();
      setValue('payload', '');
      if (data?.createComment?.ok && user) {
        const newComment = {
          __typename: 'Comment',
          createdAt: Date.now() + '',
          id: data?.createComment?.id,
          isMine: true,
          payload,
          user,
        };
        const newCacheComment = cache.writeFragment({
          data: newComment,
          fragment: gql`
            fragment BSNAME on Comment {
              id
              isMine
              payload
              createdAt
              user {
                username
                avatar
              }
            }
          `,
        });
        cache.modify({
          id: `Photo:${photo?.id}`,
          fields: {
            comments: (prev) => [...prev, newCacheComment],
            commentNumber: (prev) => prev + 1,
          },
        });
      }
    },
  });

  const onSubmitValid = ({ payload }: IForm) => {
    if (loading) return;
    createCommentMutation({
      variables: {
        photoId: photo?.id!,
        payload,
      },
    });
  };
  return (
    <CommentsContainer>
      <Comment username={photo?.user?.username} payload={photo?.caption} />
      <CommentCount>
        {photo?.commentNumber === 0
          ? '0 comment'
          : photo?.commentNumber === 1
          ? '1 comment'
          : `${photo?.commentNumber} comments`}
      </CommentCount>
      {photo?.comments?.map((comment) => (
        <Comment
          key={comment?.id}
          photoId={photo?.id}
          commentId={comment?.id}
          username={comment?.user.username}
          payload={comment?.payload}
          isMine={comment?.isMine}
        />
      ))}
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <PostCommentInput
            {...register('payload', {
              required: true,
            })}
            name="payload"
            type="text"
            placeholder="내용을 입력하세요"
          />
        </form>
      </PostCommentContainer>
    </CommentsContainer>
  );
};

export default Comments;
