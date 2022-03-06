import React, { useCallback, useState } from 'react';
import { FlexBox, Spacer } from '..';

export interface SliderProps {
  label?: string;
  max?: number;
  min?: number;
  onChange?: (val: number) => void;
}

export const Slider: React.FC<SliderProps> = React.memo(
  ({ label, max = 100, min = 0, onChange }) => {
    const [val, setVal] = useState<number>(min);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = Number(e.currentTarget.value);
        setVal(newVal);
        onChange && onChange(newVal);
      },
      [onChange],
    );

    return (
      <div className="relative">
        {label && (
          <label htmlFor="slider" className="form-label">
            {label}
          </label>
        )}
        <FlexBox>
          <input
            type="range"
            className="form-range w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none"
            min={min}
            max={max}
            id="slider"
            value={val}
            onChange={handleChange}
          />
          <Spacer size="sm" />
          <div>{val}</div>
        </FlexBox>
      </div>
    );
  },
);
