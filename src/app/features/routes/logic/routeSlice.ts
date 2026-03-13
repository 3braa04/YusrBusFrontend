import RoutesApiService from "@/app/core/networking/services/routesApiService";
import { createGenericEntitySlice } from "@/app/core/state/generics/genericEntitySlice";

const { reducer, actions } = createGenericEntitySlice("route", new RoutesApiService());

export const { setCurrentPage: setCurrentRoutesPage, refresh: refreshRoutes, filter: filterRoutes } = actions;
export default reducer;
