import { Pedido } from '../domain/Pedido.js';

export default class CheckoutService {
  constructor(gateway, repository, emailSvc) {
    this.gatewayPagamento = gateway;
    this.pedidoRepository = repository;
    this.emailService = emailSvc;
  }

  async processarPedido(carrinho, cartaoCredito) {
    const totalInicial = carrinho.calcularTotal();
    let totalFinal = totalInicial;

    // Regra de negócio: desconto de 10% para clientes Premium
    if (carrinho.user.isPremium()) {
      totalFinal = totalInicial * 0.9;
    }

    // Dependência externa: cobrança
    const respostaPgto = await this.gatewayPagamento.cobrar(totalFinal, cartaoCredito);
    if (!respostaPgto.success) return null;

    // Criar e salvar pedido
    const pedido = new Pedido(null, carrinho, totalFinal, 'PROCESSADO');
    const pedidoSalvo = await this.pedidoRepository.salvar(pedido);

    // Envio de e-mail (mockável)
    try {
      await this.emailService.enviarEmail(
        carrinho.user.email,
        'Seu Pedido foi Aprovado!',
        `Pedido ${pedidoSalvo.id} no valor de R$${totalFinal}`
      );
    } catch (e) {
      console.error('Falha ao enviar e-mail', e.message);
    }

    return pedidoSalvo;
  }
}
