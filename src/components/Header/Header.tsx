import { Box, Flex, Heading, Spacer } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BinaryContext } from '../../contexts/Binary';
import { APP_NAME } from '../../utils';

export const Header: React.FC = React.memo(() => {
  const rom = useContext(BinaryContext);
  const navigate = useNavigate();

  return (
    <Flex minWidth="max-content" alignItems="center" px="4">
      <Box px={2}>
        <Heading
          as="h1"
          size="md"
          onClick={() => {
            rom.setBinary();
            navigate(`/${APP_NAME}/top`);
          }}
        >
          {APP_NAME}
        </Heading>
      </Box>

      <Spacer />

      {!!rom.data && (
        <Flex gap="8">
          <Box onClick={() => navigate(`/${APP_NAME}/info`)} cursor="pointer">
            Info
          </Box>
          <Box onClick={() => navigate(`/${APP_NAME}/bpp`)} cursor="pointer">
            4Bpp
          </Box>
          <Box onClick={() => navigate(`/${APP_NAME}/lz77`)} cursor="pointer">
            LZ77
          </Box>
          <Box onClick={() => navigate(`/${APP_NAME}/pal`)} cursor="pointer">
            Palette
          </Box>
        </Flex>
      )}
    </Flex>
  );
});
