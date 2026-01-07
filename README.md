# 📦 Agil Store - Sistema de Gestão de Inventário

Este é um sistema de controle de estoque desenvolvido em **Node.js**. O projeto permite o gerenciamento completo de produtos através de uma interface de linha de comando (CLI), com persistência de dados em arquivos JSON.

## 🚀 Funcionalidades

O sistema conta com as 5 operações principais (CRUD):
- **Adicionar Produto**: Registra nome, categoria, quantidade e preço (com ID único gerado automaticamente).
- **Listar Inventário**: Exibe todos os produtos em uma tabela organizada.
- **Atualizar Produto**: Permite editar informações de um produto existente buscando por ID ou Nome.
- **Excluir Produto**: Remove um item do estoque permanentemente.
- **Buscar Produto**: Localização rápida de itens por ID ou Nome.

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução.
- **Readline**: Para interação com o usuário via terminal.
- **FS (File System)**: Para salvar e ler os dados do arquivo `produtos.json`.
- **Git & GitHub**: Para versionamento e hospedagem do código.

## 📦 Como rodar o projeto

1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
2. Clone o repositório:
   ```bash
   git clone [https://github.com/pazoliveira/agil-store.git](https://github.com/pazoliveira/agil-store.git)
