# clp-master

## Integrantes do Grupo:

<ul>
    <li>Arthur Henrique - nascimentoarthur.br@gmail.com</li>
    <li>Fabio Elvino - fabioelvino@outlook.com</li>
    <li>Filipe Falcão Pimentel - filipeffp@gmail.com</li>
    <li>Henrique Mendes - henrique.barbosa@ufrpe.br</li>
    <li>José Elvis Júlio de Santana - elvislcufrpe@gmail.com</li>
    <li>Maryana Hermínio de Carvalho - maryhdec@gmail.com</li>
    <li>Pedro Henrique - pedrohenrique110401@outlook.com</li>
    <li>Túlio Lorca de Araujo Falcão - falcao.tulio@gmail.com</li>
</ul>

## Descrição Geral do Projeto:
<ul>
<p align="justify"> O projeto LeitorPessoal é um sistema desenvolvido para proporcionar uma experiência personalizada de controle e organização de leituras. Destinado a entusiastas e apaixonados por livros, o LeitorPessoal oferece uma plataforma intuitiva e funcional para gerenciar a jornada literária de cada usuário.</p>
</ul>

## Arquitetura do projeto:
<ul>
<p align="justify"> Foi adotado o modelo C4 como técnica de notação gráfica enxuta para modelar a arquitetura do sistema de software da presente solução. O modelo C4 é baseado em uma decomposição estrutural de um sistema em containers e componentes e depende de técnicas de modelagem existentes, como o Linguagem de Modelagem Unificada (UML) ou Diagramas de Relacionamento entre Entidades (ERD) para uma decomposição mais detalhada dos blocos de construção arquitetônicos e de maneira bem breve é estruturado nos seguintes níveis:</p>
</ul>

1. **Nível - Contexto:**
   - <p align="justify"> O nível 1, diagrama de contexto, mostra o sistema inserido no mundo em termos das pessoas que o utilizam e outros possíveis sistemas de software com os quais ele interage.</p>

2. **Nível - Containers:**
   - <p align="justify"> O nível 2, diagrama de container, amplia o software e mostra os containers (aplicativos, armazenamentos de dados, microserviços, etc.) que o compõe. Aqui constam as decisões de tecnologia.</p>

3. **Nível - Componentes:**
   - <p align="justify"> O nível 3, diagrama de componentes, amplia um container individual para mostrar os componentes dentro dele. Esses componentes mapeiam abstrações reais (por exemplo, um agrupamento de código) em sua base de código com detalhamentos dos componentes dentro da aplicação da API.</p>

4. **Nível - Código:**
   - O nível 4, que mostra como os componentes são implementados a nível de classes.

A página de documentação do projeto está disponível em https://filipeffp.github.io/clp-master/.

## Requisitos do Projeto:
   
1. **Cadastro de Livros:**
   - Os usuários devem poder adicionar informações sobre os livros que estão lendo, incluindo título, autor e status de leitura.

2. **Lista de Leituras:**
   - Exibir uma lista dos livros adicionados pelos usuários, mostrando o status de leitura atual.

3. **Avaliações:**
   - Permitir que os usuários avaliem os livros lidos e deixem comentários.

4. **Notificações:**
   - Implementar um sistema de notificação para lembrar os usuários de continuar a leitura.

## Detalhes das Funcionalidades:

1. **Quem vai usar o programa?**
    - O programa será usado por pessoas que desejam organizar e acompanhar suas leituras pessoais.

2. **Que serviços são "necessários"?**
    - <p align="justify"> Os serviços necessários incluem o cadastro de livros, a exibição de uma lista de leituras, avaliações e comentários, além de notificações para incentivar a continuidade da leitura.</p>

3. **Quais serviços cada usuário pode executar?**
    - <p align="justify"> Cada usuário pode executar operações como cadastrar novos livros, visualizar sua lista de leituras, avaliar livros e receber notificações para continuar a leitura.</p>
