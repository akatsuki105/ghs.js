import React, { useState } from 'react';
import { Separator, Spacer, Viewer, ROMUpload, Box, Rom } from './components';
import { convert4BppToRGB, palettes, RGB, rgb555 } from './utils';

export const Bpp: React.VFC = React.memo(() => {
  const [rgb, setRgb] = useState<RGB[]>([]);
  const [width, _] = useState<number>(16);

  return (
    <>
      {rgb.length > 0 ? (
        <Viewer id="canvas" w={width * 8} rgb={rgb.slice(rgb.length - 0x100000, rgb.length - 1)} />
      ) : (
        <Box height={300} />
      )}

      <Spacer size="sm" />
      <Separator />
      <Spacer size="sm" />

      {rgb.length === 0 && (
        <>
          <Spacer size="sm" />
          <ROMUpload
            load={(r: Rom) => {
              const romRgb = convert4BppToRGB(r.data, rgb555(palettes[0]));
              console.log(romRgb.length);
              setRgb(romRgb);
            }}
          />
        </>
      )}
    </>
  );
});
