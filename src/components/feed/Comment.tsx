import React from 'react';
import styled from 'styled-components';
// import sanitizeHtml from 'sanitize-html';
import { FatText } from '../shared';
import { Link } from 'react-router-dom';

const CommentContainer = styled.div`
  margin-bottom: 7px;
`;

const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: #0095f6;
    cursor: pointer;
    &:hover {
      font-weight: 600;
    }
  }
`;

interface Props {
  username: string | undefined;
  payload: string | null | undefined;
}

const Comment = ({ username, payload }: Props) => {
  //   const cleanedPayload = sanitizeHtml(
  //     payload?.replace(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g, '<mark>$&</mark>')!,
  //     { allowedTags: ['mark'] },
  //   );

  return (
    <CommentContainer>
      <FatText>{username}</FatText>
      {/* <CommentCaption
        dangerouslySetInnerHTML={{
          __html: cleanedPayload,
        }}
      /> */}
      <CommentCaption>
        {payload?.split(' ').map((word, index) =>
          /#[\w]+/.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{' '}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          ),
        )}
      </CommentCaption>
    </CommentContainer>
  );
};

export default Comment;
