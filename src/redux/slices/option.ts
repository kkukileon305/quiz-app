import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Option = {
  categorie: string;
  difficulty: string;
  limit: number;
};

export const option = createSlice({
  name: 'option',
  initialState: {
    categorie: '',
    difficulty: '',
    limit: 5,
  },
  reducers: {
    setOption(_, { payload }: PayloadAction<Option>) {
      return payload;
    },
  },
});

export const { setOption } = option.actions;
