import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
// import { useDrizzleStudio } from "expo-drizzle-studio-plugin/build/useDrizzleStudio";
import { useEffect } from "react";
import { db /* sqliteClient */ } from "../db/db";
import migrations from "../db/migrations/migrations";
import { useError } from "../features/error/contexts/ErrorContext";

const useInitDB = () => {
	// #region Hooks
	// useDrizzleStudio(sqliteClient as any); // Drizzle Studio plugin does not support SDK 54 yet
	const { success, error } = useMigrations(db, migrations);
	const { setError } = useError();

	useEffect(() => {
		// Check error
		if (error) {
			setError(error);
			return;
		}

		// Wait until migration finished
		if (!success) return;

		// console.log("Successful migration.");
	}, [success, error, setError]);

	return { loading: !success };
};

export default useInitDB;
