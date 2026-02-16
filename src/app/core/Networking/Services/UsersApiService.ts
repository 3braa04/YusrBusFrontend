import type User from "@/app/features/Users/Data/User";
import BaseApiService from "../BaseApiService";

export default class UsersApiService extends BaseApiService<User>
{
    routeName: string = "Users";
}