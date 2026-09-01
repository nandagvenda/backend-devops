import {Usuario, UsuarioAttributes} from "../models/Usuario";

export class UsuarioRepository {
    async findAll(): Promise<Usuario[]> {
        return await Usuario.findAll();
    } 

    async findById(id: number): Promise<Usuario | null> {
        return await Usuario.findByPk(id);
    }

    async create(usuario: Omit<UsuarioAttributes, 'id'>): Promise<Usuario> {
        return await Usuario.create(usuario);
    }

    async update(id: number, usuarioData: Partial<UsuarioAttributes>): Promise<Usuario | null> {
        const currentUser = await Usuario.findByPk(id);
        if (!currentUser) return null;

        await currentUser.update(usuarioData);
        return currentUser;
    }

    async delete(id: number): Promise<boolean> {
        const result = await Usuario.destroy({ where: { id } });
        return result > 0;
    }
}