import { Box, Button } from '@chakra-ui/react';
import { Fragment, ReactNode } from 'react';

interface RadioButtonGroupProps {
  options: { value: string; renderValue?: ReactNode }[];
  selected: string;
  setSelected: (value: string) => void;
}

const RadioButtonGroup = ({ options, selected, setSelected }: RadioButtonGroupProps) => {
  return (
    <Box
      display={'flex'}
      height={'40px'}
      sx={{ border: '3px solid #bfbfbf', boxSizing: 'content-box', borderRadius: '9px' }}
    >
      {options.map((option, index) => (
        <Fragment key={index}>
          {index > 0 && <Box sx={{ width: '2px', backgroundColor: '#bfbfbf', ml: '-2px' }} />}
          <Button
            key={index}
            isDisabled={option.value === selected}
            onClick={() => option.value !== selected && setSelected(option.value)}
            sx={{
              borderRadius: `${index === 0 ? '6px' : '0'} ${
                index === options.length - 1 ? '6px' : '0'
              } ${index === options.length - 1 ? '6px' : '0'} ${index === 0 ? '6px' : '0'}`,
              _disabled: {
                backgroundColor: '#9f9f9f',
                color: '#2a2a2a',
              },
              _hover: {
                background: option.value !== selected ? 'rgba(255, 255, 255, 0.16)' : '#bfbfbf',
              },
              paddingX: '7px',
            }}
          >
            {option.renderValue ?? option.value}
          </Button>
        </Fragment>
      ))}
    </Box>
  );
};

export default RadioButtonGroup;
