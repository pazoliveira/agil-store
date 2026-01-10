const readline = require("readline")
const rl = readline.createInterface({

    input: process.stdin,
    output: process.stdout
});

const fs = require("fs");
let inventario = [];
try {
    const dados = fs.readFileSync('produtos.json','utf8');
    inventario = JSON.parse(dados);
    console.log("inventário carregado com sucesso!")
} catch (erro) {
    console.log("Nenhum arquivo encontrado. Começando com inventário vazio. ");
    inventario = [];
}

const vermelho = "\x1b[31m";
const verde = "\x1b[32m";
const amarelo = "\x1b[33m";
const reset = "\x1b[0m";


function exibirMenu() { 
    console.log("==========================================");
    console.log("    MENU DE OPERAÇÕES - AGIL STORE       ");
    console.log("==========================================");
    console.log("1 - Adicionar um produto")
    console.log("2 - Listar produtos no inventário")
    console.log("3 - Atualizar o produto")
    console.log("4 - Excluir o produto")
    console.log("5 - Buscar o produto")
    console.log("6 - Sair")

    rl.question("Escolha uma opção: ", (opção) => {
        if (opção === "1"){
            console.log("-------------")
            adicionarProduto()

        }else if (opção === "2"){

            listarInventario()

        }else if (opção === "3"){

            console.log("-------------")
            atualizarProdutos()

        }else if (opção === "4"){
            console.log("-------------")
            excluirProduto()

        }else if (opção === "5"){
            console.log("-------------")
            BuscarProdutos()
                
        }else if (opção === "6"){
            console.log(" ")
            console.log("Muito Obrigado por utilizar os serviços da AGIL STORE!")
            console.log(" ")

            rl.close()

        }else {
            console.log("")
            console.log("Essa opção não está disponível! Selecione outra opção!")
            
            exibirMenu()
        }

    })

}

function adicionarProduto() {
    rl.question("Qual é o nome do produto? ", (nome) => {
        rl.question("Qual é a categoria do seu produto? ", (categoria) => {
            rl.question("Qual é a quantidade desse produto? ", (quantidade) => {
                rl.question("Qual é o preço desse produto? ", (preço) => {
                    let novoProduto = {
                        id: Date.now(),
                        nome: nome,
                        categoria: categoria,
                        quantidade: parseInt(quantidade),
                        preço: parseFloat(preço)
                    };
                    inventario.push(novoProduto)
                    fs.writeFileSync("produtos.json", JSON.stringify(inventario, null,2));
                    console.log(" ")
                    console.log(" [SUCESSO]: Produto adicionado ao inventário da Ágil Store!");
                    console.log(" ")
                    exibirMenu()
                }) 
            })
        })
    })
}
function listarInventario() {
    if (inventario.length === 0){
        
        console.log(" ")
        console.log(`${amarelo} AVISO: Nenhum item no inventário ainda.${reset}`);
        console.log(" ")
        
        exibirMenu()
    } else{
        console.table(inventario)
        console.log("-------------")
        exibirMenu()
    }
}



function atualizarProdutos() {
    rl.question("Digite o ID do produto que deseja atualizar: ", (idInformado) => {
        const idNumero = parseInt(idInformado);
        let produto = inventario.find(p => p.id === idNumero);
        if (!produto) {
            console.log(`\n${vermelho} ERRO: Produto com ID ${idInformado} não encontrado.${reset}\n`);
            return exibirMenu();
        }
        console.log(`\n--- Editando: ${produto.nome} ---`);
        console.log(`(Aperte ENTER para manter o valor atual)`);
        rl.question(`Nome [${produto.nome}]: `, (novoNome) => {
            rl.question(`Categoria [${produto.categoria}]: `, (novaCat) => {
                rl.question(`Quantidade [${produto.quantidade}]: `, (novaQtd) => {
                    rl.question(`Preço [${produto.preço}]: `, (novoPreço) => { 

                        if (novoNome.trim().length > 0) produto.nome = novoNome;
                        if (novaCat.trim().length > 0) produto.categoria = novaCat;

                        if (novaQtd.trim().length > 0) {
                            const qtd = parseInt(novaQtd);
                            if (!isNaN(qtd) && qtd >= 0) {
                                produto.quantidade = qtd;
                            } else {
                                console.log(`${vermelho} Quantidade inválida (mantida a anterior).${reset}`);
                            }
                        }

            
                        if (novoPreço.trim().length > 0) {
                            const valorPreço = parseFloat(novoPreço.replace(",", "."));
                            if (!isNaN(valorPreço) && valorPreço >= 0) {
                                produto.preço = valorPreço; 
                            } else {
                                console.log(`${vermelho} Preço inválido (mantido o anterior).${reset}`);
                            }
                        }

            
                        fs.writeFileSync("produtos.json", JSON.stringify(inventario, null, 2));
                        console.log(`\n${verde} [SUCESSO]: Produto atualizado!${reset}\n`);
                        exibirMenu();
                    });
                });
            });
        });
    });
}

function excluirProduto(){

    rl.question("Qual é o ID do produto que você deseja excluir?", (idDel) => {
        const ID_velho = parseInt(idDel)
        let produtoDel = inventario.find(p =>
            p.id === parseInt(idDel) ||
            p.nome.toLowerCase() === idDel.toLowerCase()
        )
        if (!produtoDel){
            console.log(" ")
            console.log(`${vermelho} AVISO! Esse produto não foi localizado em nossa base de dados.${reset}`);
            console.log(" ")
            exibirMenu()
        } else{
            inventario = inventario.filter(p => p.id !== produtoDel.id);
            fs.writeFileSync("produtos.json", JSON.stringify(inventario, null, 2));
            console.log(" ")
            console.log(`${verde}[SUCESSO]: Produto foi excluido no inventario da Agil Store!${reset}`);
            console.log(" ")
            exibirMenu()
        }
    })

}

function BuscarProdutos() {
    rl.question("🔍 Digite o ID ou parte do nome: ", (busca) => {
        // .includes permite achar "Smartphone" digitando apenas "Smart"
        const p = inventario.find(item => 
            item.id === parseInt(busca) || 
            item.nome.toLowerCase().includes(busca.toLowerCase())
        );

        console.log("\n----------------------------");
        if (!p) {
            console.log(`${vermelho} Nenhum produto encontrado com "${busca}"${reset}`);
        } else {
            console.log(`${verde} DESCRIÇÃO DO PRODUTO:${reset}`);
            console.log(`• ID:    ${p.id}`);
            console.log(`• Nome:  ${p.nome}`);
            console.log(`• Qtd:   ${p.quantidade}`);
            console.log(`• Preço: R$ ${p.preço.toFixed(2)}`);
        }
        console.log("----------------------------\n");
        exibirMenu();
    });
}
exibirMenu()