import { Box, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {
  title: string;
};

export const ROMInfo: React.VFC<Props> = React.memo(({ title }) => {
  return (
    <Box w="200px">
      <Text fontSize="md" fontWeight="medium">
        ROM Info
      </Text>
      <Box overflowX="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
        Title: {title}
      </Box>
    </Box>
  );
});
