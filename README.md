# Roadmap

## Recuperação de Senha

**Requisitos Funcionais**

- [x] O usuário deve poder recuperar sua senha informando seu e-mail;

- [x] O usuário deve receber um email informando as instruções de recuperação de senha;

- [x] O usuário deve poder restaurar a senha;

**Regras de Negócio**

- [x] O link enviado por email para resetar a senhar deve expirar em duas horas;

- [x] O usuário precisa confirmar a nova senha ao resetar sua senha;

**Requisitos Não Funcionais**

- [x] Utilizar Ethereal para testar envios de email em ambiente de desenvolvimento;

- [ ] Utilizar o Amazon SES para envios de email em producão;

- [ ] O envio de email deve ser assícrono (segundo plano);



## Atualização de Perfil

**Requisitos Funcionais**

- [x] O usuário deve poder atualizar seu nome, email e senha;

**Requisitos Não Funcionais**

- [x] O usuário não pode alterar um email para outro já utilizado;

- [x] Para alterar sua senha o usuário deve informar sua senha antiga;

- [x] Para alterar sua senha o usuário precisa confirmar a nova senha;



## Painel do Prestador

**Requisitos Funcionais**

- [x] O usuário deve poder listar seus agendamentos em um dia específico;

- [x] O prestador dever receber uma notificação sempre que houver um novo agendamento;

- [ ] O prestador deve poder visualizar as notificações não lidas;

**Regras de Negócio**

- [x] A notificação dever ter um status de lida ou não lida;

**Requisitos Não Funcionais**

- [ ] Os agendamentos do prestador devem ser armazenados em cache;

- [x] As notificações do prestador devem ser armazenadas no MongoDB;

- [ ] As notificações do prestador devem ser enviadas em tempo-real via web socket.



## Agendamento de Serviços

**Requisitos Funcionais**

- [x] O usuário deve poder listar todos os prestadores de serviço cadastrados;

- [x] O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um presatador;

- [x] O usuário deve poder listar horários disponiveeis em um dia especifico de um prestador;

- [x] O usuário deve poder realizar um novo agendamento com um prestador;

**Regras de Negócio**

- [x] Cada agendamento devem durar 1h hora exatamente;

- [x] Os agendamentos devem estar disponíveis de 8h às 18h (primeiros às 8h, ultimo às 18h);

- [x] O usuário não pode agendar em um horário que já passou;

- [x] O usuário não pode agendar em um horário já ocupado;

- [x] O usuário não pode agendar serviços consigo mesmo;

**Requisitos Não Funcionais**

- [ ] A listagem de prestadores devem ser armazenada em cache;
