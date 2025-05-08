export interface Cita {
    id?: number;
    dolencia?: string;
    disponibilidad?: {
        cita_id: number;
        inicio: string;
        fin: string;
        semana: string;
    }[];
    user_id?: number;
    user?: {
        name: string | null;
        email: string | null;
        role_id: number;
    };
    servicio_id?: number;
    servicio?: {
        id: number;
        titulo: string;
        tiempo: number;
        descripcion: string;
        foto: string | null;
    };
    
}
