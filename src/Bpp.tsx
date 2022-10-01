import React, { useState } from 'react';
import { Separator, Spacer, ROMUpload, Box, Rom, FlexBox, TileViewer } from './components';
import { useWindowDimensions } from './hooks';
import { convert4BppToRGB, palettes, RGB, rgb555, toHex } from './utils';

// const ROM = 0x0800_0000 as const;

export const Bpp: React.VFC = React.memo(() => {
  const [rgb, setRgb] = useState<RGB[]>([]);
  const [width, _] = useState<number>(16);
  const { height } = useWindowDimensions();
  const [addr, setAddr] = useState<number>(0x0800_0000);

  const scale = 4;
  const canvasHeight = ((height * 9) / 10) & ~(8 * scale - 1);

  const setAddress = (col: number, row: number) => {
    const ofs = (row * width + col) * 32;
    const addr = 0x0800_0000 + ofs;
    setAddr(addr);
  };

  return (
    <FlexBox className="w-full">
      <div className="w-1/2">
        {rgb.length > 0 ? (
          <div className="flex justify-center">
            <TileViewer
              w={width * 8}
              h={canvasHeight}
              rgb={rgb}
              scale={scale}
              onScroll={setAddress}
              grid
            />
          </div>
        ) : (
          <Box height={canvasHeight} />
        )}
      </div>

      <Spacer size="sm" />
      <Separator axis="vertical" stretch />
      <Spacer size="sm" />

      <div className="w-1/2">
        {!rgb.length && (
          <>
            <Spacer size="sm" />
            <ROMUpload
              load={(r: Rom) => {
                const romRgb = convert4BppToRGB(r.data, rgb555(palettes[0]));
                setRgb(romRgb);
              }}
            />
          </>
        )}

        {!!rgb.length && <div>{`Address: 0x${toHex(addr, 8)}`}</div>}
      </div>
    </FlexBox>
  );
});
