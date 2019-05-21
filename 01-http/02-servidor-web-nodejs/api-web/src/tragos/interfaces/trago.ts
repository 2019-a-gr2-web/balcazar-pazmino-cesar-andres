
export interface Trago{
    id?:number;
    nombre:string;
    tipo:'Ron'|'Vodka'|'Whiskey'|'Tequila'|'Puntas'|'Cerveza'; //hacer directamente una validación a nivel de tipo (solo digoq ue el tipo peude ser uno  de esos)
    gradoAlcohol:number;
    fechaCaducidad:Date;
    precio:number;

}

