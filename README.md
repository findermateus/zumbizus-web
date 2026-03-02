# Zumbizus - Web Page

Este projeto consiste no site de divulgação do jogo Zumbizus, desenvolvido com Next.js e TypeScript.

## Tecnologias Utilizadas

* Framework: Next.js (App Router)
* Linguagem: TypeScript
* UI/Styling: Tailwind CSS + Shadcn/UI
* State Management: Nuqs (Query Parameters)
* Banco de Dados: MariaDB (Executado via Docker)
* Licença: MIT

## Requisitos Prévios

1. Node.js: Versão LTS recomendada.
2. Docker: Necessário para rodar a instância do MariaDB.
3. NPM: Gerenciador de pacotes padrão.

## Configuração do Ambiente

Certifique-se de que o container Docker com o MariaDB esteja ativo antes de iniciar a aplicação. Caso utilize um arquivo docker-compose.yml no projeto, inicie-o com:

```bash
docker-compose up -d
