import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    addTeam: (state, action) => {
      state.value.push(action.payload);
    },
  },
})

export const { addTeam } = teamsSlice.actions

export default teamsSlice.reducer