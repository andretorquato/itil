export interface ModuleProps {
	questions: Question[];

}


export interface Question {
	id: number;
	answer_id: number;
	options: Array<{
		id: number;
		ctx: string;
	}>;
	question: string;
}