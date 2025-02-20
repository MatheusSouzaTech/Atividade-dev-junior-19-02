
function loadProduct(){
    const productList = document.getElementById("productList"); 
    productList.innerHTML = "";

  
    const products = JSON.parse(localStorage.getItem('products')) || [];

    products.forEach((product, index) => {
        const li = document.createElement("li");
        li.textContent = `${product.nome} - ${product.preco} - ${product.quant}`;

   
        const buttonRemove = document.createElement('button');
        buttonRemove.textContent = "Remover";
        buttonRemove.onclick = () => removeProduct(index);
        li.appendChild(buttonRemove);

       
        const buttonEdit = document.createElement('button');
        buttonEdit.textContent = "Editar";
        buttonEdit.onclick = () => editProduct(index);
        li.appendChild(buttonEdit);

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

    if(isNaN(preco)){

        alert ("Preço invalido, Favor digitar um valor valido");
    }
    else if(isNaN(quant)){

        alert ("Quantidade invalida, Favor digitar um valor valido");

    }
    else{
        
        if(nome && preco && quant){
    
        const products = JSON.parse(localStorage.getItem('products')) || []
        
        const dados = {
            nome: nome,
            preco: preco,
            quant: quant
        };

        products.push(dados);

        localStorage.setItem("products", JSON.stringify(products));
        nomeInput.value = "";
        priceInput.value = "";
        quantInput.value = "";
        loadProduct();
        }
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
