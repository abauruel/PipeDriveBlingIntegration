<p align="center">
 <img src="https://image.flaticon.com/icons/svg/2164/2164832.svg" height="160" width="160" alt="https://image.flaticon.com/">
 </p>
<h1 align="center">Data Integration PipeDrive => Bling => 🗄</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/abauruel/PipeDriveBlingIntegration">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/abauruel/PipeDriveBlingIntegration">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

<p align="center">
  <a href="#rocket-technologias">Tecnologias utilizadas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;

<a href="#-how-can-i-run-it">Como executar?</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#memo-license">License</a>

</p>

<br>

## :rocket: Tecnologias

This project uses these technologies:

- [NodeJs]()
- [Express]()
- [TypeScript]()
- [Jest]()
- [TypeOrm]()
- [Tsrynge]()
- [MongoDB]()
- [Redis]()
- [Bull]()
- [Axios]()
- [Eslint]()
- [React Icons]()
- [XMLBuilder2]()
- [date-fns]()

## 💻 Projeto

O Projeto consiste no desenvolvimento de uma aplicação backend para a integraçāo dados entre a plataforma PipeDrive e Bling consumindo as informações e salvando em um Banco de dados MongoDB

Para atender os requisítos da proposta foi utilizado a lib [Bull]() para criaçāo de Filas e Jobs que realizavam as consultas nas API da PipeDrive e Bling através com token de autenticação.

## ✓ Prerequisitos

- MongoDB (utilizado [mongoDB Altas](https://www.mongodb.com/cloud/atlas) plataforma cloud mongodb)
- [Docker compose](https://docs.docker.com/compose/)

## 👨‍💻 Como executar?

`git clone https://github.com/abauruel/PipeDriveBlingIntegration.git`

### Backend

`cd PipeDriveBlingIntegration`<br>
❗️renomear .env.example para .env e adicionar suas informações <br>

Executar containers:<br>
`docker-compose up -d`

</p>

## :memo: License

This project uses the MIT license. Read [LICENSE](LICENSE.md) for details.

icon : https://www.flaticon.com

---

Made with ♥ by Alex Claude :wave:
