
export interface Libro{
    id?:number;
    isbn:number;
    nombre:string;
    numeroPaginas:number;
    edicion:number;
    fechaPublicacion:Date;
    nombreEditorial:string;
    autorId:number;
}