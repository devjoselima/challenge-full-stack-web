## Decisões sobre a arquitetura
### Backend
#### Visão geral
A API foi desenvolvida seguindo os princípios da **Clean Architecture**, garantindo um código bem estruturado, de fácil manutenção e escalável. Além disso, os princípios **Dependency Inversion Principle (DIP)** e **Open/Closed Principle (OCP)** do SOLID foram aplicados para promover desacoplamento e responsabilidade única.

A arquitetura está dividida nas seguintes camadas:
#### 1. Controllers
Os **Controllers** são responsáveis por receber as requisições HTTP e delegá-las aos **Use Cases** apropriados. Eles também tratam as respostas e erros antes de enviá-los ao cliente.

**Responsabilidades:**
- Validar e interpretar a requisição HTTP.
- Invocar o Use Case Adequado.
- Retornar a resposta ao cliente.

#### 2. Use Cases
Os **Use Cases** representam a lógica de negócio da aplicação, garantindo que as regras do sistema sejam cumpridas independente da interface de entrada (HTTP, CLI, etc.).

**Responsabilidades:**
- Implementar regras de negócio.
- Orquestrar chamadas para **Repositories** e **Adapters**.

#### 3. Repositories
Os **Repositories** são responsáveis por interagir com o banco de dados ou outras fontes de dados externas. Eles encapsulam a lógica de acesso a dados e expõem apenas métodos necessários para os **Use Cases**.

**Responsabilidades**
- Abstrair o acesso aos dados.
- Garantir a persistência correta da informação.

#### 4. Factories
As **Factories** são utilizadas para montar os **Controllers**, garantindo a inversão de dependências de forma adequada. Elas criam instância dos **Controllers** injetando as dependências corretas.

**Responsabilidades**
- Criar instâncias dos controllers, repositories, use cases e adapters.
- Passar via injeção de dependência suas instâncias corretamente.

#### 5. Adapters
Os **Adapters** atuam como intermediários entre a aplicação e dependências externas, garantindo que as interfaces se mantenham consistentes e que o código siga o princípio **Open/Closed Principle** do SOLID. Isso significa que podemos modificar ou substituir uma dependência externa sem alterar o código da aplicação principal.

**Responsabilidades:**
- Encapsular dependências externas.
- Permitir substituições futuras sem alterar o código principal.

#### 6. Middlewares
Os **Middlewares** são utilizados para tratar requisições antes de chegarem ao **Controller**, como autenticação, login e validação.

**Responsabilidades:**
- Autenticar rotas para garantir que o usuário que esta tentando acessar esteja permitido.


### Frontend
#### Visão geral
A estrutura foi  desenhada a fim de atender e seguir princípios de **Clean Architecture** boas práticas e princípios SOLID como **Single Responsability Principle (SRP)**.

#### 1. Components
Os componentes são responsáveis por exibir a interface do usuário. Eles devem ser pequenos e reutilizáveis. Cada componente pode consumir dados da **store** ou chamar funções de **composables**.

#### 2. Composables
Os composables fornecem uma lógica reutilizável, como manipulação de estados, formulários, lógica de API, etc.

**Exemplo:**
- **useStudentForm:** Lógica de validação do formulário de um aluno.

#### 3. Services
São responsáveis pela comunicação com o backend. Os **services** expõem métodos que são usados para buscar ou enviar dados.

#### 4. Store
Aqui foi utilizado o **Pinia**, ele serve para lidar com o gerenciamento global da aplicação. Ele mantém o estado da autenticação do usuário, permitindo que possa ser acessado em qualquer lugar da aplicação.

#### 5. Router
Aqui utilizamos o **Vue Router**, ele lida com o roteamento entre as páginas de aplicação.

## Principios SOLID Aplicados
#### 1. Dependency Inversion Principle (DIP)
A inversão de dependências é aplicada por meio de injeção de dependências garantindo que os módulos superiores não dependam diretamente dos módulos inferiores

**Exemplo**
- O **CreateStudentController** recebe o **CreateStudentUseCase** por meio de injeção de dependências.
- Com isso o **Controller** não possui conhecimento direto de outras camadas, apenas depende de uma abstração que define o comportamento esperado.

#### 2. Open/Closed Principle (OCP)
Esse princípio afirma que uma classe ou módulo deve ser aberto para extensão mas fechado para modificação.

**Exemplo**
- Por meio dos **Adapters** garantimos que o código principal não dependa de recursos externos, ou seja garantimos que, caso um desses recursos mude, não precisemos altera-lo.

#### 3. Single Responsability Principle (SRP)
Esse princípio afirma que uma classe ou módulo deve ter apenas uma razão para mudar, ou seja, cada classe deve ter uma única responsabilidade 

**Exemplo**
- O **CreateStudentController** tem a responsabilidade de lidar com requisições HTTP e não realiza nenhuma lógica das regras de negócio da aplicação. Essa lógica fica no **CreateStudentUseCase** ele fica responsável por **apenas** validar as regras de negócio.
- Dessa forma, caso haja uma alteração nas regras de negócio **apenas** será necessário mexer no **use case**, agora se precisarmos mexer na conexão com o banco mexemos **apenas** no **repository**.

**Exemplo**
- Por meio dos **Adapters** garantimos que o código principal não dependa de recursos externos, ou seja garantimos que caso um desses recursos mudem não precisemos altera-lo.

## Bibliotecas
- **vue.js:** Framework Javascript progressivo para contrução de interfaces de usuário.
- **vuetify:** Biblioteca de componentes UI baseada no Material Design para Vue.js.
- **pinia:** Gerenciador de estado moderno e simplificado para Vue.js.
- **vee-Validate:** Biblioteca para validação de formularios baseada em Vue.
- **zod:** Biblioteca para validação e tipagem segura de dados.
- **vue Router:** Biblioteca de roteamento para Vue.js.
- **axios:** Biblioteca usada para fazer requisições HTTP e comunicação com API's.
- **vue3-Toastify:** Biblioteca para exibição de notificações estilo Toast.
- **fastify:** Framework web para Node.js usado para criar servidores HTTP
- **@fastify/cors:** Middleware para habilitar CORS no fastify.
- **@fastify/jwt:** Plugin para autenticação JWT no Fastify.
- **tsx:** Ferramenta para compilar e executar arquivos TypeScript.
- **bcrypt.js:** Biblioteca para hash de senhas.
- **dotenv:** Carrega variáveis de ambiente de um arquivo chamado `.env`.
- **vitest:** Framework usado para realizar testes para projetos TypeScript.
- **prisma:** ORM para modelagem e migração de banco de dados.
- **faker.js:** Biblioteca para geração de dados fictícios, como nomes e e-mails
 
## Melhorias
> Como se trata de um teste técnico, realizei os commits diretamente na branch principal para agilizar a entrega. Entretanto, em um ambiente real, utilizaria um fluxo Git baseado em branches feature e PRs para revisão de código.
#### Backend
1. Autenticação com Refresh Tokens
   - Aprimorar a autenticação utilizando **refresh tokens** para evitar que os usuários precisem fazer login com frequência
2. Integração com Serviços Cloud
   - Utilização do **AWS cognito** para uma autenticação mais aprimorada, habilitando logins sociais como google, apple e etc.
3. Aumentar cobertura de testes
   - Aumentar a cobertura de testes da aplicação escrevendo testes para outras **camadas como controllers ou repositories**.
4. Documentação
   - Adicionar uma documentação mais precisa das rotas da API utilizando **swagger**

#### Frontend
1. Integração com TanStack Query
    - Utilização do **TanStack Query** para **gerenciamento eficiente de estado assíncrono**.
    - **Otimização de requisições HTTP** com cache, refetching automático e sincronização em tempo real.
2. Testes Automatizados
    - Implementação de **testes unitários** para componentes chaves.
    - Criação de **testes e2e** para validação de fluxos completos do usuário.
3. Gerenciamento de Roles e Permissões 
    - Implementação de um **controle de acesso baseado em roles (RBAC)**.
    - Garantir que certas páginas e funcionalidades sejam acessíveis apenas para usuários autorizados.

## Instruções para rodar o projeto
- Instruções para o back end [aqui](backend/README.md)
- Instruções para o front end [aqui](frontend/README.md)


## Requisitos obrigatórios não entregues
Todos os requisitos obrigatórios foram entregues.