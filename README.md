# Trabalho Prático: Implementando Padrões de Teste (Test Patterns)

Este repositório contem os elementos necessários para execução do projeto de Test Patterns

## Sua Tarefa

Seu objetivo é criar a suíte de testes para o `src/services/CheckoutService.js`.

1.  **Crie seu arquivo de teste:** `__tests__/CheckoutService.test.js`.
2.  **Crie os Builders:** Crie a pasta `__tests__/builders/` e implemente:
    - `UserMother.js` (Object Mother)
    - `CarrinhoBuilder.js` (Data Builder)
3.  **Implemente os Testes:** No seu arquivo de teste, cubra os principais cenários do `CheckoutService`, aplicando os padrões de Test Doubles corretos.

### Cenários Principais a Cobrir:

- **Verificação de Estado (Stub):**
  - Deve retornar `null` se o `GatewayPagamento` recusar a cobrança.
  - Deve retornar o pedido salvo com o `totalFinal` correto para um cliente padrão.
- **Verificação de Comportamento (Mock):**
  - Deve aplicar 10% de desconto ao chamar o `GatewayPagamento` se o usuário for "PREMIUM".
  - Deve chamar o `EmailService.enviarEmail` com os dados corretos após um pagamento bem-sucedido.
  - Não deve chamar o `EmailService` nem o `PedidoRepository` se o pagamento falhar.

## 5. Como Começar

1.  **Fork e Clone:** Faça um fork deste repositório e clone-o para sua máquina.
2.  **Instale as Dependências:**
    ```bash
    npm install
    ```
3.  **Execute os Testes (Modo Watch):**
    ```bash
    npm test -- --watch
    ```
    (Comece a criar seus arquivos em `__tests__/` e o Jest irá executá-los automaticamente.)
