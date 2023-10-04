
export interface Sismo {
    properties: {
      place: string;
      mag: string;
      time: string;
      // Otras propiedades aquí
    };
    geometry:{
      coordinates: string;
    };
    latitud?: number;
    longitud?: number;

  }
  