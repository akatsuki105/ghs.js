import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Separator,
  Spacer,
  TileViewer,
  Slider,
  Palette,
  Uploader,
  Box,
  ROMInfo,
  ImageInfo,
  ImageInfoProps,
} from './components';
import { BinaryContext } from './contexts/Binary';
import {
  convert4BppToRGB,
  convert8BppToRGB,
  decompressLZ77,
  lookupLZ77,
  palettes,
  RGB,
  rgb555,
} from './utils';
import { DataInfo } from 'utils/helper';

export const LZ77: React.VFC = React.memo(() => {
  const rom = useContext(BinaryContext);

  const [rgb, setRgb] = useState<RGB[]>([]);
  const [width, setWidth] = useState<number>(2);
  const [bpp, setBpp] = useState<number>(4);

  const [rows, setRows] = useState<DataInfo[]>([]);
  const [info, setInfo] = useState<ImageInfoProps | null>(null);

  const [pal, setPal] = useState<number>(0);

  useEffect(() => {
    if (!!rom.data) {
      setRows(lookupLZ77(rom.data));
    }
  }, [rom.data]);

  return (
    <>
      {rgb.length > 0 ? (
        <TileViewer w={width * 8} h={304} rgb={rgb} scale={4} grid />
      ) : (
        <Box height={304} />
      )}

      <Spacer size="sm" />
      <Separator />
      <Spacer size="sm" />

      {!rom.data ? (
        <>
          <Spacer size="sm" />
          <Uploader
            load={(title: string, data: Uint8Array) => {
              rom.setBinary(title, data);
            }}
          />
        </>
      ) : (
        <div className="flex">
          <StyledDiv className="flex flex-col border">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Address
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Compressed size
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Decompressed size
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r, i) => {
                        return (
                          <tr
                            className={
                              r[0] === info?.addr || 0
                                ? 'bg-blue-100'
                                : (i & 1) === 1
                                ? 'bg-gray-100'
                                : 'bg-white'
                            }
                            key={r[0].toString()}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              0x{(r[0] + 0x08000000).toString(16)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {r[1]} Bytes
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {r[2]} Bytes
                            </td>
                            <td
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
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
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </StyledDiv>

          <Spacer size="md" />

          <div>
            <Slider label="Width" max={64} min={2} onChange={setWidth} />
            <Spacer size="sm" />
            <Selector
              onChange={(val: string) => {
                const decompressed = decompressLZ77(rom.data!, info?.addr || 0);
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
              }}
            />
            <Spacer size="sm" />
            Palette
            <Spacer size="sm" />
            {palettes.map((p, i) => {
              return (
                <>
                  <div
                    onClick={() => {
                      setPal(i);
                      const decompressed = decompressLZ77(rom.data!, info?.addr || 0);
                      const rgb =
                        bpp === 4
                          ? convert4BppToRGB(decompressed[0], rgb555(palettes[i]))
                          : convert8BppToRGB(decompressed[0], rgb555(palettes[i]));
                      setRgb(rgb);
                    }}
                  >
                    <Palette id={`pal${i}`} colors={p} />
                  </div>
                  <Spacer size="sm" />
                </>
              );
            })}
          </div>

          <Spacer size="md" />

          <div>
            <ROMInfo rom={rom} />
            <Spacer size="sm" />
            <Separator />
            <Spacer size="sm" />
            <ImageInfo
              addr={info?.addr || 0}
              compressedSize={info?.compressedSize || 0}
              decompressedSize={info?.decompressedSize || 0}
            />
          </div>
        </div>
      )}
    </>
  );
});

const StyledDiv = styled.div`
  max-height: 600px;
  overflow-y: scroll;
`;

const Selector: React.VFC<{ onChange: (v: string) => void }> = React.memo(({ onChange }) => {
  return (
    <div>
      <label htmlFor="location" className="form-label">
        Bpp
      </label>
      <select
        id="location"
        name="location"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        onChange={(e) => {
          const val = e.target.value;
          onChange(val);
        }}
      >
        <option selected>4Bpp</option>
        {/* <option>8Bpp</option> */}
      </select>
    </div>
  );
});
