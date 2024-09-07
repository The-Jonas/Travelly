import { Request, Response } from "express";
import { CriarUsuario } from "../../use-cases/usuario/CriarUsuario";
import { AtualizarUsuario } from "../../use-cases/usuario/AtualizarUsuario";
import { UsuarioRepository } from "../../database/repositories/UsuarioRepository";
import { Usuario } from "../../domain/interfaces/IUsuarioRepository";
import { DeletarUsuario } from "../../use-cases/usuario/DeletarUsuario";
import { BuscarUsuarioUnico } from "../../use-cases/usuario/BuscarUsuarioUnico";

const usuarioRepository = new UsuarioRepository();
const criarUsuario = new CriarUsuario(usuarioRepository);
const atualizarUsuario = new AtualizarUsuario(usuarioRepository);
const deletarUsuario = new DeletarUsuario(usuarioRepository);
const buscarUsuarioUnico = new BuscarUsuarioUnico(usuarioRepository);

export class UsuarioController {
  static async createUser(req: Request, res: Response) {
    const { nome, email, senha } = req.body;
    const usuario: Usuario = {
      nome,
      email,
      senha,
    };
    try {
      const novoUsuario = await criarUsuario.execute(usuario);
      return res
        .status(201)
        .json({ message: "Usuário criado com sucesso!", novoUsuario });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar usuário", error });
    }
  }
  static async getUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const usuario = await buscarUsuarioUnico.execute(id);

      if (usuario) {
        return res.status(200).json(usuario);
      } else {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar usuário.", error });
    }
  }
  static async getAllUsers(req: Request, res: Response) {
    try {
      const usuarios = await usuarioRepository.getAll();
      return res.status(200).json({ usersList: usuarios });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar usuários.", error });
    }
  }
  static async updateUser(req: Request, res: Response) {
    const { id, nome, email, senha } = req.body;
    const usuario: Usuario = {
      nome,
      email,
      senha,
    };
    try {
      await atualizarUsuario.execute(id, usuario);
      return res
        .status(201)
        .json({ message: `Usuário ${id} atualizado com sucesso!` });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao atualizar usuário", error });
    }
  }
  static async deleteUser(req: Request, res: Response) {
    const { id } = req.body;

    try {
      await deletarUsuario.execute(id);
      return res
        .status(200)
        .json({ message: `Usuário ${id} deletado com sucesso!` });
    } catch (error: any) {
      return res
        .status(error.message.includes("não encontrado") ? 404 : 500)
        .json({
          message: "Erro ao deletar usuário",
          error: error.message || error,
        });
    }
  }
}
