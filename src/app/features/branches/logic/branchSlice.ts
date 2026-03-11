import { createSlice } from "@reduxjs/toolkit";
import Branch from "../data/branch";
import EntityState, { EntityActions } from "@/app/core/state/entityState";
import BranchesApiService from "@/app/core/networking/services/branchesApiService";

const initialState: EntityState<Branch> = new EntityState<Branch>();
const actions = new EntityActions<Branch>(new BranchesApiService());
export const branchSlice = createSlice({
  name: "branch",
  initialState: initialState,
  reducers: {
    setCurrentPage: actions.setCurrentPage,
    refresh: actions.refresh,
  },
  extraReducers: (builder) => {
    // builder.addCase();
  },
});

export const { setCurrentPage, refresh } = branchSlice.actions;

export default branchSlice.reducer;
