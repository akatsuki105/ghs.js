import {
  Box,
  Divider,
  Flex,
  Select,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TileViewer, Palette, ROMInfo, ImageInfo, ImageInfoProps } from './components';
import { BinaryContext } from './contexts/Binary';
import {
  APP_NAME,
  convert4BppToRGB,
  convert8BppToRGB,
  decompressLZ77,
  lookupLZ77,
  palettes,
  RGB,
  rgb555,
} from './utils';
import { DataInfo } from 'utils/helper';

export const LZ77: React.FC = React.memo(() => {
  const rom = useContext(BinaryContext);
  const navigate = useNavigate();

  const [rgb, setRgb] = useState<RGB[]>([]);
  const [width, setWidth] = useState<number>(2);
  const [bpp, setBpp] = useState<number>(4);

  const [rows, setRows] = useState<DataInfo[]>([]);
  const [info, setInfo] = useState<ImageInfoProps | null>(null);

  const [pal, setPal] = useState<number>(0);

  useEffect(() => {
    if (!!rom.data) {
      setRows(lookupLZ77(rom.data));
    } else {
      navigate(`/${APP_NAME}/top`);
    }
  }, [rom.data]); // eslint-disable-line

  if (!rom.name) return <></>;

  return (
    <VStack>
      {rgb.length > 0 ? (
        <TileViewer w={width * 8} h={304} rgb={rgb} scale={4} grid />
      ) : (
        <Box h="304px" />
      )}

      <Spacer h="4" />
      <Divider />
      <Spacer h="4" />

      <Flex gap={4}>
        <TableContainer maxH="600px" overflowY="scroll">
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                <Th>Address</Th>
                <Th>Compressed size</Th>
                <Th>Decompressed size</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rows.map((r) => {
                return (
                  <Tr key={r[0].toString()}>
                    <Td>0x{(r[0] + 0x08000000).toString(16)}</Td>
                    <Td>{r[1]} Bytes</Td>
                    <Td>{r[2]} Bytes</Td>
                    <Td
                      onClick={() => {
                        setInfo({
                          addr: r[0],
                          compressedSize: r[1],
                          decompressedSize: r[2],
                        });
                        const pal555 = rgb555(palettes[pal]);
                        const [decompressed] = decompressLZ77(rom.data!, r[0]);
                        // const [decompressed] = decompressRLE(rom.data, r[0]);
                        const buf =
                          bpp === 4
                            ? convert4BppToRGB(decompressed, pal555)
                            : convert8BppToRGB(decompressed, pal555);
                        setRgb(buf);
                      }}
                    >
                      View
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>

        <Box>
          Width
          <Spacer h="4" />
          <Flex gap="2">
            <Slider aria-label="slider-ex-2" defaultValue={2} onChange={(val) => setWidth(val)}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
            </Slider>
            <Box>{width}</Box>
          </Flex>
          <Spacer h="4" />
          <Selector
            onChange={(val: string) => {
              if (!!rom.data) {
                const decompressed = decompressLZ77(rom.data, info?.addr || 0);
                switch (val) {
                  case '4Bpp': {
                    setBpp(4);
                    const rgb = convert4BppToRGB(decompressed[0], rgb555(palettes[pal]));
                    setRgb(rgb);
                    break;
                  }
                  case '8Bpp': {
                    setBpp(8);
                    const rgb = convert8BppToRGB(decompressed[0], rgb555(palettes[pal]));
                    setRgb(rgb);
                    break;
                  }
                }
              }
            }}
          />
          <Spacer h="4" />
          Palette
          <Spacer h="4" />
          {palettes.map((p, i) => {
            return (
              <Box
                key={i}
                mb="4"
                onClick={() => {
                  if (!!rom.data) {
                    setPal(i);
                    const decompressed = decompressLZ77(rom.data, info?.addr || 0);
                    const rgb =
                      bpp === 4
                        ? convert4BppToRGB(decompressed[0], rgb555(palettes[i]))
                        : convert8BppToRGB(decompressed[0], rgb555(palettes[i]));
                    setRgb(rgb);
                  }
                }}
              >
                <Palette id={`pal${i}`} colors={p} />
              </Box>
            );
          })}
        </Box>

        <Spacer h="6" />

        <Box>
          <ROMInfo title={rom.name} />
          <Divider my="4" />
          <ImageInfo
            addr={info?.addr || 0}
            compressedSize={info?.compressedSize || 0}
            decompressedSize={info?.decompressedSize || 0}
          />
        </Box>
      </Flex>
    </VStack>
  );
});

const Selector: React.FC<{ onChange: (v: string) => void }> = React.memo(({ onChange }) => {
  return (
    <Select
      placeholder="Select Bpp"
      onChange={(e) => {
        const val = e.target.value;
        onChange(val);
      }}
    >
      <option value="4bpp">4Bpp</option>
      {/* <option value="8bpp">8Bpp</option> */}
    </Select>
  );
});
