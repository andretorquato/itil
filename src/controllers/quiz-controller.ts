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
	const { name, id, slug, questions } = module;
	const newQuestions = questions.map(q => ({ id: q.id, answered: q.answered }));
	if (sessionData) {
		let data = JSON.parse(sessionData);
		let { completedModules } = data;
		const newCompletedModules = [...completedModules];
		const addedModule = completedModules.find((m: any) => m.id == id);
		if (addedModule) 
			addedModule.questions = newQuestions
		else 
			newCompletedModules.push({ id, name, slug, questions: newQuestions });
		let newData = {
			score: score,
			completedModules: newCompletedModules
		};
		localStorage.setItem(config.session, JSON.stringify(newData));
		return;
	}
	localStorage.setItem(
		config.session,
		JSON.stringify({
			score,
			completedModules: [
				{ id, name, slug, questions: newQuestions },
			],
		})
	);
};