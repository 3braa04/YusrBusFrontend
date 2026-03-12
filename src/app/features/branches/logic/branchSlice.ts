import BranchesApiService from "@/app/core/networking/services/branchesApiService";
import { createGenericEntitySlice } from "@/app/core/state/generics/genericEntitySlice";
import type IEntityState from "@/app/core/state/interfaces/iEntityState";
import type Branch from "../data/branch";
import type { PayloadAction } from "@reduxjs/toolkit";

const { reducer, actions } = createGenericEntitySlice(
  "branch",
  new BranchesApiService(),
  undefined,
  {
    ss: (state: IEntityState<Branch>, action: PayloadAction<void>) => {
      console.log(state);
      console.log(action);
    },
  },
);

export const { setCurrentPage, refresh, filter, ss } = actions;
export default reducer;
