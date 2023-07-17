import { Box, Center } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from './components';
import { BinaryContext } from './contexts/Binary';
import { APP_NAME } from './utils';

export const Top: React.FC = React.memo(() => {
  const rom = useContext(BinaryContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!!rom.data) {
      navigate(`/${APP_NAME}/info`);
    }
  }, [rom.data]); // eslint-disable-line

  return (
    <Center>
      <Box w="66%" h="50vh">
        <Upload
          id="rom-upload"
          load={(title: string, data: Uint8Array) => {
            rom.setBinary(title, data);
          }}
        />
      </Box>
    </Center>
  );
});
