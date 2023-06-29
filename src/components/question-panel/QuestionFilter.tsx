import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { QuestionFilterWrapper } from './QuestionForm.styles';

interface QuestionOptionsProps {
  options: {
    option: string;
    selections: string[];
    handleChange: (event: SelectChangeEvent) => void;
    value: string;
    required: boolean;
  }[];
  error: boolean;
}

const QuestionFilter: React.FC<QuestionOptionsProps> = ({ options, error }) => {
  return (
    <QuestionFilterWrapper>
      {options.map((item, index) => {
        return (
          <Box sx={{ minWidth: 50, flex: 1 }} key={index}>
            <FormControl fullWidth>
              <InputLabel id={`${item.option}-select-label`}>
                {item.option}
              </InputLabel>
              <Select
                labelId={`${item.option}-select-label`}
                id={item.option}
                value={item.value}
                label={item.option}
                onChange={item.handleChange}
                error={item.required && error && !item.value}
              >
                {item.selections.map((q, i) => {
                  return (
                    <MenuItem key={i} value={q}>
                      {q.charAt(0).toUpperCase() + q.slice(1)}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        );
      })}
    </QuestionFilterWrapper>
  );
};

export default QuestionFilter;
