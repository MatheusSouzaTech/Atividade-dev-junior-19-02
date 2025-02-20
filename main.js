
function loadProduct(){ // função de carregamento para sempre que houver uma alteração dos dados
    const productList = document.getElementById("productList"); //Selecionando o elemento de lista que sera maninpulado
    productList.innerHTML = ""; // zera os valores listados

  
    const products = JSON.parse(localStorage.getItem('products')) || []; //Transforma o arquivo em objeto para ser manipulado e pegar os itens do localStorage

    products.forEach((product, index) => { // ultiliza o laço for each para percorrer o objeto no localStorage e fazer a manipulação dos dados
        const li = document.createElement("li"); // cria um elemento ou tag do tipo lista no arquivo
        li.textContent = `${product.nome} | ${product.preco} | ${product.quant}`; // adiciona ou substitui os valores da lista pelo que esta armazenado no forEach junto a variavel objeto

        //ambos os botões são criados por indice

        //criação do botao de remover produtos e atribuindo a função de click a ela

        const buttonRemove = document.createElement('button');
        buttonRemove.textContent = "Remover";
        buttonRemove.onclick = () => removeProduct(index);
        li.appendChild(buttonRemove);

       //criação do botão de editar podutos
        const buttonEdit = document.createElement('button');
        buttonEdit.textContent = "Editar";
        buttonEdit.onclick = () => editProduct(index);
        li.appendChild(buttonEdit);

        //adicionando o li a lista de produtos 
        productList.appendChild(li);
    });
}


function addProduct(){

    const nomeInput = document.getElementById("nomeInput");
    const nome = nomeInput.value.trim();

    const priceInput = document.getElementById("priceInput");
    const preco = parseFloat(priceInput.value.trim());

    const quantInput = document.getElementById("quantInput");
    const quant = parseInt(quantInput.value.trim());

        
        if(nome && preco && quant){
    
        const products = JSON.parse(localStorage.getItem('products')) || []
        
        const dados = { //variavel objeto para produtos armazenar os dados do nome preço e quant dentro de uma variavel
            nome: nome,
            preco: preco,
            quant: quant
        };

        products.push(dados); //Esta puxando e atribuindo os dados na ultima posição do array de produtos

        localStorage.setItem("products", JSON.stringify(products)); //convertedndo o valor e de objeto para string afim de ser acessado e vizualizado
        nomeInput.value = "";
        priceInput.value = "";
        quantInput.value = "";
        loadProduct(); // apos o processo finalizado o codigo realizada a recarga da pagina 
        }
    
}


function removeProduct(index){

    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.splice(index,1);
    localStorage.setItem("products", JSON.stringify(products));
    loadProduct();
    
}

function editProduct(index){

    const product = JSON.parse(localStorage.getItem("products"));
    const productList = document.getElementById("productList");
    const li = productList.children[index];

    const inputNome = document.createElement("input");
    inputNome.type = "text";
    inputNome.classList = "edit-input"
    inputNome.value = product[index].nome;

    const inputPreco = document.createElement("input");
    inputPreco.type = "text";
    inputPreco.classList = "edit-input"
    inputPreco.value = product[index].preco;

    const inputQuant = document.createElement("input");
    inputQuant.type = "text";
    inputQuant.classList = "edit-input"
    inputQuant.value = product[index].quant;

    const saveButton = document.createElement("button");
    saveButton.textContent = 'Salvar';
    saveButton.onclick = () => saveProduct(index, inputNome.value,inputPreco.value,inputQuant.value);// salva as alterações com base nas edições

    li.innerHTML = "";
    li.appendChild(inputNome);
    li.appendChild(inputPreco);
    li.appendChild(inputQuant);
    li.appendChild(saveButton);


}

function saveProduct(index,nome,preco,quant){


    const products = JSON.parse(localStorage.getItem("products")) || [];
    products[index] = {nome, preco,quant};
    localStorage.setItem("products", JSON.stringify(products));
    loadProduct();

}


function removeAll(){

    
        localStorage.removeItem('products');
        loadProduct();

}


window.onload = loadProduct;
