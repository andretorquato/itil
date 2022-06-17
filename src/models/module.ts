export interface ModuleProps {
	id: number;
	name: string;
	slug: string;
	introduction: {
		html: string;
	};
	context: {
		images: Array<string>;
	};
	questions: Question[];

}

export interface Question {
	id: number;
	answer_id: number;
	answered?: boolean;
	options: Array<{
		id: number;
		ctx: string;
	}>;
	question: string;
	tag?: Array<string>;
}