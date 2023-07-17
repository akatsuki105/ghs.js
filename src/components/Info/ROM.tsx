import { Text } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';

type Props = {
  title: string;
};

export const ROMInfo: React.VFC<Props> = React.memo(({ title }) => {
  return (
    <Container>
      <Text fontSize="md" fontWeight="medium">
        ROM Info
      </Text>
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
