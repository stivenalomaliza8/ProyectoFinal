

export interface Usuario{
    id?:string,
    uid?:string,
    nombre:string,
    telefono:string,
    direccion:string,
    correo?:string,
    clave?:string
}
export interface Anuncios{
    id?:string,
    uidPer:string,
    titulo:string,
    anio?:string,
    estado:string,
    tipo:string,
    precio:number,
    ciudad:string,
    direccion:string,
    descripcion:string,
    imagen?:string[],
    lng:string,
    lat:string,
    contacto:string
}



export interface misServicios{
    id:string;
}
export interface favoritos{
    id:string;
}