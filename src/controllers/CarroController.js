const CarroService = require('../services/CarroServices');



module.exports = {
  //Função push buscar todos os carros e seu codigo
  buscarTodos: async (req, res) => {
    let json = {error: '', result:[]};

    let carros = await CarroService.buscarTodos()

    for(let i in carros){
      json.result.push({
        codigo: carros[i].codigo,
        descricao: carros[i].modelo
      }); 
    }
    res.json(json)
  },
  //Função para buscar apenas um carro pelo seu código
  buscarUm: async (req, res) => {
    let json = {error: '', result:{}};

    let codigo = req.params.codigo;
    let carro = await CarroService.buscarUm(codigo);

    if(carro){
      json.result = carro;
    }
    res.json(json);
  },
  //Inserindo carros na tabela
  inserir: async (req, res) => {
    let json = {error: '', result:{}};

    let modelo = req.body.modelo;
    let placa = req.body.placa;

    if(modelo && placa){
      let CarroCodigo = await CarroService.inserir(modelo, placa)
      json.result = {
        codigo: CarroCodigo,
        modelo,
        placa
      };
    }else{
      json.error = 'Campos não enviados'
    }
    res.json(json);
  },
  //Alterar os dados da tabela
  alterar: async (req, res) => {
    let json = {error: '', result:{}};

    let codigo = req.params.codigo
    let modelo = req.body.modelo;
    let placa = req.body.placa;

    if(codigo && modelo && placa){
      let CarroCodigo = await CarroService.alterar(codigo, modelo, placa)
      json.result = {
        codigo,
        modelo,
        placa
      };
    }else{
      json.error = 'Campos não enviados'
    }
    res.json(json);
  },
  // Excluir dados
  excluir: async(req, res) => {
    let json = {error: '', result:{}};

    await CarroService.excluir(req.params.codigo)

    res.json(json)
  }
}