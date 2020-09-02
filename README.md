# Roadmap

## Recuperação de Senha

**Requisitos Funcionais**

[ ] O usuário deve poder recuperar sua senha informando seu e-mail;

[ ] O usuário deve receber um email informando as instruções de recuperação de senha;

[ ] O usuário deve poder restaurar a senha;

**Regras de Negócio**

[ ] O link enviado por email para resetar a senhar deve expirar em duas horas;

[ ] O usuário precisa confirmar a nova senha ao resetar sua senha;

**Requisitos Não Funcionais**

[ ] Utilizar mailtrap para testar envios de email em ambiente de desenvolvimento;

[ ] Utilizar o Amazon SES para envios de email em producão;

[ ] O envio de email deve ser assícrono (segundo plano);



## Atualização de Perfil

**Requisitos Funcionais**

[ ] O usuário deve poder atualizar seu nome, email e senha;

**Requisitos Não Funcionais**

[ ] O usuário não pode alterar um email para outro já utilizado;

[ ] Para alterar sua senha o usuário deve informar sua senha antiga;

[ ] Para alterar sua senha o usuário precisa confirmar a nova senha;



## Painel do Prestador

**Requisitos Funcionais**

[ ] O usuário deve poder listar seus agendamentos em um dia específico;

[ ] O prestador dever receber uma notificação sempre que houver um novo agendamento;

[ ] O prestador deve poder visualizar as notificações não lidas;

**Regras de Negócio**

[ ] A notificação dever ter um status de lida ou não lida;

**Requisitos Não Funcionais**

[ ] Os agendamentos do prestador devem ser armazenados em cache;

[ ] As notificações do prestador devem ser armazenadas no MongoDB;

[ ] As notificações do prestador devem ser enviadas em tempo-real via web socket.



## Agendamento de Serviços

**Requisitos Funcionais**

[ ] O usuário deve poder listar todos os prestadores de serviço cadastrados;

[ ] O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um presatador;

[ ] O usuário deve poder listar horários disponiveeis em um dia especifico de um prestador;

[ ] O usuário deve poder realizar um novo agendamento com um prestador;

**Regras de Negócio**

[ ] Cada agendamento devem durar 1h hora exatamente;

[ ] Os agendamentos devem estar disponíveis de 8h às 18h (primeiros às 8h, ultimo às 18h);

[ ] O usuário não pode agendar em um horário já ocupado;

[ ] O usuário não pode agendar serviços consigo mesmo;

**Requisitos Não Funcionais**

[ ] A listagem de prestadores devem ser armazenada em cache;
