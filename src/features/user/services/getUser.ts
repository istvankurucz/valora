import getGroupsByUserId from "../../group/services/getGroupsByUserId";
import { User } from "../types/userTypes";
import getUserData from "./getUserData";

export default async function getUser(id: string): Promise<User> {
	// Get user
	const userData = await getUserData(id);

	// Get groups
	const groups = await getGroupsByUserId(id);

	// Return user
	return { ...userData, groups };
}
