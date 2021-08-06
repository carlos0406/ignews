<h1 align="center">< / >Ignews</h1>
 olá 🙋‍♂️
<p>Ignews é um blog onde usamos <a href="https://prismic.io/">Prismic CMS</a> para serviço para cadastrar as postagens
[Stripe](https://stripe.com/br) como metodo de pagamento, e [FaunaDB](https://fauna.com/) para salvar os dados, além do nextjs para gerar posts do blog estaticamente
</p>

<div>
  <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt=""/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt=""/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="">
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="">
  <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white" alt="">
</div>

# Como usar?

## Download e instalação

```bash
# Clone este repositório
$ git clone https://github.com/carlos0406/ignews.git ignews

# Acesse a pasta do projeto no terminal/cmd
$ cd ignews

# Instale as dependências
$ npm install ou yarn

# Execute a aplicação em modo de desenvolvimento
$ npm run dev ou yarn dev


# O servidor inciará na porta:3000 -como endereco base: <http://localhost:3000>
```

## Variaveis Ambientes

O arquivo .env.local deve ser criado na raiz do projeto com as seguintes variaveis:

PRISMIC_ACCESS_TOKEN para poder acessar a API do prismic

PRISMIC_URL para poder acessar o endpoint referente ao seu projeto

## Configuracões do prismic

Dentro do prismic você deve criar um repositório
com um custom type com o nome de "post"
na aba JSON cole a estrutura disponivél no pastebin(não disponivel)
na aba de configurações do seu repositório dentro do prismic você deve gerar a chave
de acesso para a variavel PRISMIC_ACCESS_TOKEN e também copiar o endpoint para a variavel PRISMIC_URL

### Dentro da interface do prismic você pode criar

varios posts na interface Documents é importante copular algum
ou alguns posts para poder ver o resultado do do site

# Prints do projeto
