import{Request, Response} from "express";
import {UsuarioService} from "../services/usuarioService";

interface Usuario {
    id: number;
    nome: string;
}

export class UsuarioController {

    private usuarioService: UsuarioService;

    constructor() {
        this.usuarioService = new UsuarioService();
    }
    
    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const usuarios = await this.usuarioService.getAllUsuarios();
            return res.json(usuarios);
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }

    async getById(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const usuario = await this.usuarioService.getUsuarioById(id);
            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(404).json({ error: (error as Error).message });
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { nome } = req.body;
            const novoUsuario = await this.usuarioService.createUsuario({ nome });
            return res.status(201).json(novoUsuario);
        } catch (error) {
           return res.status(400).json({ error: (error as Error).message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const updateUsuario = await this.usuarioService.getUsuarioById(id);
            return res.status(200).json(updateUsuario);
        } catch (error) {
            return res.status(404).json({ error: (error as Error).message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const deletedUsuario = await this.usuarioService.getUsuarioById(id);
            return res.status(200).json({ message: "Usuario deletado com sucesso" });
        } catch (error) {
            return res.status(404).json({ error: (error as Error).message });
        }
    }
}