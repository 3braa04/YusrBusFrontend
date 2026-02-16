import type Branch from "@/app/features/branches/data/Branch";
import BaseApiService from "../BaseApiService";

export default class BranchesApiService extends BaseApiService<Branch>
{
    routeName: string = "Branches";
}