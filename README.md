# 🏪 Gerenciamento de Produtos - AgilStore

Uma aplicação de linha de comando (CLI) desenvolvida em Node.js para o controle automatizado de inventário, permitindo a gestão eficiente de produtos com persistência de dados.

<div align="center">
  <img src="https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.dot-js&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E">
  <img src="https://img.shields.io/badge/json-5E5E5E?style=for-the-badge&logo=json&logoColor=white">
</div>

## 📋 Funcionalidades e Requisitos

| Item | Descrição da Implementação |
| :--- | :--- |
| **Adicionar** | Cadastro de produtos com ID único automático ). |
| **Listar** | Exibição do inventário completo em formato de tabela no terminal. |
| **Atualizar** | Edição de campos específicos (Nome, Categoria, Qtd, Preço) via ID. |
| **Excluir** | Remoção de itens do sistema com busca por ID. |
| **Buscar** | Localização detalhada por ID ou busca parcial por nome. |
| **Persistência** | Salvamento automático e leitura de dados. |
| **Validação** | Verificação de tipos numéricos e proteção contra entradas vazias ou inválidas. |

## 🛠️ Tecnologias

| Tecnologia | Utilização |
| :--- | :--- |
| **JavaScript** | Lógica de programação e manipulação de objetos. |
| **Node.js** | Ambiente de execução do código. |
| **Readline** | Interface para leitura de dados e interação com o usuário. |
| **FileSystem (fs)** | Persistência de dados e manipulação do arquivo JSON. |

## 📂 Estrutura de Arquivos

```text
/
├── index.js           # Motor da aplicação (Menu, Lógica e Operações)
├── produtos.json      # Banco de dados local (gerado automaticamente)
└── README.md          # Documentação técnica do projeto
```

## 📦 Como rodar o projeto

| Passo | Comando / Ação |
| :--- | :--- |
| **1. Obter código** | `git clone https://github.com/pazoliveira/agil-store.git` |
| **2. Acessar pasta** | `cd agil-store` |
| **3. Iniciar Sistema** | `node index.js` |

---
**Autor:** Diego Oliveira - PUCRS 2026

