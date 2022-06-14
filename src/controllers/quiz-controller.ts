import config from "../configuration/config.json";
import { ModuleProps } from "../models/module";

export const getProgress = () => {
	const sessionData = localStorage.getItem(config.session);
	if (sessionData) {
		return JSON.parse(sessionData);
	}
	return null;
};

export const saveProgress = (module: ModuleProps, score: number) => {
	const sessionData = localStorage.getItem(config.session);
	if (sessionData) {
		let data = JSON.parse(sessionData);
		data.completedModules.push({
			name: module?.name,
			slug: module?.slug,
			id: module?.id,
		});
		data.score = score;
		localStorage.setItem(config.session, JSON.stringify(data));
		return;
	}
	localStorage.setItem(
		config.session,
		JSON.stringify({
			score,
			completedModules: [
				{ name: module?.name, slug: module?.slug, id: module?.id },
			],
		})
	);
};