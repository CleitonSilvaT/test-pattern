import { Carrinho } from '../../src/domain/Carrinho.js';
import { Item } from '../../src/domain/Item.js';
import UserMother from './UserMother.js';

export default class CarrinhoBuilder {
  constructor() {
    this.user = UserMother.umUsuarioPadrao();
    this.itens = [new Item('Item Padrão', 100)];
  }

  comUser(user) {
    this.user = user;
    return this;
  }

  comItens(itens) {
    this.itens = itens;
    return this;
  }

  comValorTotal(valor) {
    this.itens = [new Item('Item X', valor)];
    return this;
  }

  vazio() {
    this.itens = [];
    return this;
  }

  build() {
    return new Carrinho(this.user, this.itens);
  }
}
