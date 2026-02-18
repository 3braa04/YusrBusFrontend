import type { Route } from "@/app/features/Routes/Data/Route";
import BaseApiService from "../BaseApiService";

export default class RoutesApiService extends BaseApiService<Route>
{
    routeName: string = "Routes";
}

