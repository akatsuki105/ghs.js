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
        className="text-lg w-1/6"
        onClick={() => {
          rom.setBinary();
          navigate('/GBAC.js/top');
        }}
      >
        {APP_NAME}
      </h1>

      <div className="w-5/6"></div>

      <div className="flex justify-items-end">
        <div
          onClick={() => {
            navigate('/GBAC.js/info');
          }}
        >
          Info
        </div>

        <Spacer axis="horizontal" size="md" />

        <div
          onClick={() => {
            navigate('/GBAC.js/bpp');
          }}
        >
          4Bpp
        </div>

        <Spacer axis="horizontal" size="md" />

        <div
          onClick={() => {
            navigate('/GBAC.js/lz77');
          }}
        >
          LZ77
        </div>
        <Spacer axis="horizontal" size="md" />
      </div>
    </div>
  );
});
