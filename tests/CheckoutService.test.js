import { jest } from '@jest/globals';
import CheckoutService from '../src/services/CheckoutService.js';
import CarrinhoBuilder from './builders/CarrinhoBuilder.js';
import UserMother from './builders/UserMother.js';

describe('CheckoutService', () => {
  test('deve retornar null quando o pagamento falha', async () => {
    // Arrange
    const carrinho = new CarrinhoBuilder().build();

    const gatewayStub = { cobrar: jest.fn().mockResolvedValue({ success: false }) };
    const pedidoRepoDummy = { salvar: jest.fn() };
    const emailServiceDummy = { enviarEmail: jest.fn() };

    const checkout = new CheckoutService(gatewayStub, pedidoRepoDummy, emailServiceDummy);

    // Act
    const pedido = await checkout.processarPedido(carrinho);

    // Assert
    expect(pedido).toBeNull();
    expect(pedidoRepoDummy.salvar).not.toHaveBeenCalled();
    expect(emailServiceDummy.enviarEmail).not.toHaveBeenCalled();
  });

  test('deve aplicar desconto e enviar email quando cliente é Premium', async () => {
    // Arrange
    const userPremium = UserMother.umUsuarioPremium();
    const carrinho = new CarrinhoBuilder().comUser(userPremium).comValorTotal(200).build();

    const gatewayStub = { cobrar: jest.fn().mockResolvedValue({ success: true }) };
    const pedidoRepoStub = { salvar: jest.fn().mockResolvedValue({ id: 1 }) };
    const emailMock = { enviarEmail: jest.fn() };

    const checkout = new CheckoutService(gatewayStub, pedidoRepoStub, emailMock);

    // Act
    const pedido = await checkout.processarPedido(carrinho, { numero: '1234-5678' }); // Cartão fake

    // Assert
    // ✅ Verificação de comportamento (Mock)
    expect(gatewayStub.cobrar).toHaveBeenCalledWith(180, expect.anything());
    expect(pedidoRepoStub.salvar).toHaveBeenCalled();
    expect(emailMock.enviarEmail).toHaveBeenCalledTimes(1);
    expect(emailMock.enviarEmail).toHaveBeenCalledWith(
      'maria.premium@example.com',
      'Seu Pedido foi Aprovado!',
      expect.stringContaining('R$180')
    );

    // ✅ Verificação de estado (retorno)
    expect(pedido).not.toBeNull();
  });
});
