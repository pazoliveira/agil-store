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


function exibirMenu() { 
    console.log("MENU DE OPERAÇÕES DA AGIL STORE")
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
            console.log("-------------")
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
            console.log("-------------")
            console.log("Muito Obrigado por utilizar os serviços da AGIL STORE")
            rl.close()

        }else {
            console.log("-------------")
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
                    console.log(inventario);
                    console.log("-------------")
                    exibirMenu()
                }) 
            })
        })
    })
}
function listarInventario() {
    if (inventario.length === 0){
        console.log("Nenhum item no inventário ainda.") 
        console.log("Digite o número 1 no menu para adicionar um novo item!")
        console.log("-------------")
        exibirMenu()
    } else{
        console.table(inventario)
        console.log("-------------")
        exibirMenu()
    }
}

function atualizarProdutos() {
    rl.question("Qual é o ID ou nome do produto? ", (id) => {
        let produtoEncontrado = inventario.find(p => p.id === parseInt(id) || p.nome.toLowerCase() === id.toLowerCase());
            if (!produtoEncontrado){
                console.log("-----------------------------------")
                console.log("-----------------------------------")
                console.log("-----------------------------------")
                console.log("Esse produto não consta no sistema")
                console.log("-----------------------------------")
                console.log("-----------------------------------")
                console.log("-----------------------------------")
                exibirMenu()
            }
            else { 
                console.log(`Encontramos o seu produto ${produtoEncontrado.nome}`)
                rl.question(`Qual será o novo nome? `, (novoNome)=> { 
                    rl.question(`Qual será a nova categoria? `, (novaCategoria) => {
                        rl.question(`Qual será a nova quantidade? `, (novaQuantidade)=> {
                            rl.question(`Qual será o novo preço? `, (novopreço) => {
                                produtoEncontrado.nome = novoNome;
                                produtoEncontrado.categoria = novaCategoria;
                                produtoEncontrado.quantidade = parseInt(novaQuantidade);
                                produtoEncontrado.preço = parseFloat(novopreço)

                                fs.writeFileSync("produtos.json", JSON.stringify(inventario, null, 2));
                                console.log(`PRODUTO ATUALIZADO`);

                                exibirMenu()

                            })
                        })
                    })
                })   
            }
    })
}

function excluirProduto(){
    rl.question("Qual é o ID do produto que você deseja excluir?", (idDel) => {
        const ID_velho = parseInt(idDel)

        let produtoDel = inventario.find(p => 
            p.id === parseInt(idDel) || 
            p.nome.toLowerCase() === idDel.toLowerCase()
        )

        if (!produtoDel){
            console.log(`Não foi encontrado um produto com o id"${idDel}`)
            exibirMenu()

        } else{
            inventario = inventario.filter(p => p.id !== produtoDel.id);

            fs.writeFileSync("produtos.json", JSON.stringify(inventario, null, 2));

            console.log("Inventario Atualizado")
            console.log(inventario)
            
            exibirMenu()
        }
    })
}





function BuscarProdutos() {
    rl.question("Qual é o ID  ou nome do produto? ", (id) => {
        let produtoEncontrado = inventario.find(p => 
            p.id === parseInt(id) || 
            p.nome.toLowerCase() === id.toLowerCase()
        )

            if (!produtoEncontrado){
                console.log("-----------------------------------")
                console.log("-----------------------------------")
                console.log("-----------------------------------")
                console.log("Esse produto não consta no sistema")
                console.log("-----------------------------------")
                console.log("-----------------------------------")
                console.log("-----------------------------------")
                exibirMenu()
            }
            else {
                console.log(`Encontramos o seu produto ${produtoEncontrado.nome}`)
                console.log(`Categoria ${produtoEncontrado.categoria}`)
                console.log(`Quantidade ${produtoEncontrado.quantidade}`)
                console.log(`Preço ${produtoEncontrado.preço}`)
                console.log("------------")
                exibirMenu()
            }
    })
}
exibirMenu()