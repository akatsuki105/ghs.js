import React, { useState } from 'react';
import { Separator, Spacer, ROMUpload, Box, Rom, FlexBox, Viewer } from './components';
import { useWindowDimensions } from './hooks';
import { convert4BppToRGB, palettes, RGB, rgb555 } from './utils';

export const Bpp: React.VFC = React.memo(() => {
  const [rgb, setRgb] = useState<RGB[]>([]);
  const [width, _] = useState<number>(16);
  const { height } = useWindowDimensions();

  const canvasHeight = (height * 9) / 10;

  return (
    <FlexBox>
      {rgb.length > 0 ? (
        <Viewer
          id="canvas"
          w={width * 8}
          visible={{ w: width * 8, h: canvasHeight }}
          rgb={rgb}
          mag={4}
        />
      ) : (
        <Box height={canvasHeight} />
      )}

      <Spacer size="sm" />
      <Separator axis="vertical" stretch />
      <Spacer size="sm" />

      {rgb.length === 0 ? (
        <>
          <Spacer size="sm" />
          <ROMUpload
            load={(r: Rom) => {
              const romRgb = convert4BppToRGB(r.data, rgb555(palettes[0]));
              setRgb(romRgb);
            }}
          />
        </>
      ) : (
        <div>hoge</div>
      )}
    </FlexBox>
  );
});
