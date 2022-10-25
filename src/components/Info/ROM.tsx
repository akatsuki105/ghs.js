import React from 'react';
import styled from 'styled-components';

type Props = {
  title: string;
};

export const ROMInfo: React.VFC<Props> = React.memo(({ title }) => {
  return (
    <Container>
      <div className="text-lg font-medium">ROM Info</div>
      <StyledDiv>Title: {title}</StyledDiv>
    </Container>
  );
});

const Container = styled.div`
  width: 200px;
`;

const StyledDiv = styled.div`
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
