export interface IGenre {
  id: number,
  genre: string
}

export interface IAuthor {
	id: number, 
	lastName: string, 
	name: string, 
	father: string, 
	dateBorn: string,
	quantity?: number
}

export interface IBook {
	id: number;
	title: string;
	pages: number;
	genre: string;
	foreignKey: number;
}