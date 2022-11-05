import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BinaryContext } from '../../contexts/Binary';
import { APP_NAME } from '../../utils';
import { Spacer } from '../atoms';

export const Header: React.FC = React.memo(() => {
  const rom = useContext(BinaryContext);
  const navigate = useNavigate();

  return (
    <div className="flex">
      <Spacer axis="horizontal" size="md" />

      <h1
        className="text-lg w-1/6 cursor-pointer"
        onClick={() => {
          rom.setBinary();
          navigate(`/${APP_NAME}/top`);
        }}
      >
        {APP_NAME}
      </h1>

      <div className="w-5/6"></div>

      {!!rom.data && (
        <div className="flex justify-items-end">
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate(`/${APP_NAME}/info`);
            }}
          >
            Info
          </div>

          <Spacer axis="horizontal" size="md" />

          <div
            className="cursor-pointer"
            onClick={() => {
              navigate(`/${APP_NAME}/bpp`);
            }}
          >
            4Bpp
          </div>

          <Spacer axis="horizontal" size="md" />

          <div
            className="cursor-pointer"
            onClick={() => {
              navigate(`/${APP_NAME}/lz77`);
            }}
          >
            LZ77
          </div>
          <Spacer axis="horizontal" size="md" />
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate(`/${APP_NAME}/pal`);
            }}
          >
            Palette
          </div>
          <Spacer axis="horizontal" size="md" />
        </div>
      )}
    </div>
  );
});
