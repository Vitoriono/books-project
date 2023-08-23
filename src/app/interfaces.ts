export interface IFitness {
  id: number,
  name: string
}

export interface IAuthor {
	id: number, 
	lastName: string, 
	name: string, 
	father: string, 
	dateBorn: string
}

export interface IBook {
	id: number;
	title: string;
	pages: number;
	genre: string;
	foreignKey: number;
}