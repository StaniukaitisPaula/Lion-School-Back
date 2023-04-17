/*************************************************************
 * Objetivo:
 * API Lion School
 * Data: 27/03/2023
 * Autor: paula
 * Versão 1.0
 *************************************************************/
const express = require('express')
    //Responsavel pelas permissoes das requisiçoes
const cors = require('cors')
    //responsavel pela manipulaçao do body da requisiçao
const bodyParser = require('body-parser')

//Impot do arquivo de fuçoes para listar estados e cidades
const alunos = require('./module/alunos.js')
const cursos = require('./module/cursos.js')
const funct = require('./model/function.js')


const { request } = require('express')
    //cria um objeto com as informaçoes da classe express
const app = express()

//Define  a permissoes no header da API
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')

    //PERMITE GERENCIAR QUAIS VERBOS (METODOS) PODERAO FAZER REQUISIÇOES
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    //ATIVA NO CORS DAS REQUISIÇOES AS PERMISSOES ESTABELECIDAS
    app.use(cors())

    next();
})

//endPoints 

app.get("/v1/lion-school/cursos", cors(), async function(request, response, next) {

    let listCursos = funct.getListaCursos()

    if (listCursos) {
        response.json(listCursos);
        response.status(200);
    } else {
        response.status(500)
    }
})

app.get('/v1/lion-school/alunos/:matricula', cors(), async function(request, response, next) {

    let statusMatricula = request.params.matricula
    let statusCode
    let dadosMatricula = {}

    //Tratamento para validar os valores encaminhados no parametro
    if (statusMatricula == '' || statusMatricula == undefined || isNaN(statusMatricula)) {

        statusCode = 400

    } else {
        let listMatricula = funct.getListarMatricula(statusMatricula)


        if (listMatricula) {
            statusCode = 200 //Estado encontrado
            dadosMatricula = listMatricula

        } else {
            statusCode = 404 // Estado nao encontrado
        }
    }
    response.status(statusCode)
    response.json(dadosMatricula)

})
app.get("/v1/lion-school/alunos", cors(), async function(request, response, next) {

    let siglaCurso = request.query.curso
    let statusAluno = request.query.status
    let anoConclusao = request.query.ano
    let dadosAluno = {}
    let statusCode
    let alunos = funct.getListarAluno()

    if (siglaCurso == undefined && statusAluno == undefined && anoConclusao == undefined) {
        if (alunos) {
            dadosAluno = alunos
            statusCode = 200
        } else {
            statusCode = 200
        }
    } else if (siglaCurso != undefined) {

        if (siglaCurso == '' || siglaCurso == undefined || !isNaN(siglaCurso)) {
            statusCode = 400

            dadosAluno.message = "Não é possível processar a requisição, pois a sigla do curso não foi informada ou não é válida."
        } else {
            if (anoConclusao != undefined) {
                if (anoConclusao == '' || anoConclusao == undefined || isNaN(anoConclusao)) {
                    statusCode = 400

                    dadosAluno.message = "Não é possível processar a requisição, pois a sigla do curso não foi informada ou não é válida."
                } else {

                    let cursoAluno = funct.getListaAlunoCurso(siglaCurso)
                    let aluno = funct.getListaData(anoConclusao, cursoAluno)

                    if (aluno) {
                        statusCode = 200
                        dadosAluno = aluno
                    } else {
                        statusCode = 404
                    }
                }
            } else if (statusAluno != undefined) {

                if (statusAluno == '' || statusAluno == undefined || !isNaN(statusAluno)) {
                    statusCode = 400
                    dadosAluno.message = "Não é possível processar a requisição, pois a sigla do curso não foi informada ou não é válida."

                } else {

                    let cursoAluno = funct.getListaAlunoCurso(siglaCurso)
                    let aluno = funct.getListarStatusAluno(statusAluno, cursoAluno)

                    if (aluno) {
                        statusCode = 200
                        dadosAluno = aluno
                    } else {
                        statusCode = 404
                    }
                }
            } else {

                let aluno = funct.getListaAlunoCurso(siglaCurso)
                if (aluno) {
                    statusCode = 200
                    dadosAluno = aluno
                } else {
                    statusCode = 404
                }

            }
        }

    } else if (statusAluno != undefined) {

        if (statusAluno == '' || statusAluno == undefined || !isNaN(statusAluno)) {
            statusCode = 400
            dadosAluno.message = "Não é possível processar a requisição, pois a sigla do curso não foi informada ou não é válida."

        } else {
            let aluno = funct.getListarStatusAluno(statusAluno)
            if (aluno) {
                statusCode = 200
                dadosAluno = aluno
            } else {
                statusCode = 404
            }
        }

    } else if (siglaCurso == undefined && statusAluno == undefined && anoConclusao != undefined) {
        if (anoConclusao == '' || anoConclusao == undefined || isNaN(anoConclusao)) {
            statusCode = 400
            dadosAluno.message = "Não é possível processar a requisição, pois a sigla do curso não foi informada ou não é válida."

        } else {
            let aluno = funct.getListaData(anoConclusao)
            if (aluno) {
                statusCode = 200
                dadosAluno = aluno
            } else {
                statusCode = 404
            }
        }
    } else {
        statusCode = 400
        dadosAluno.message = "Não é possível processar a requisição, verifique a URL da requisição."

    }
    response.status(statusCode)
    response.json(dadosAluno)
})

//permite carregar os endPoints e aguardar as requisiçoes pelo protocolo HTTP na porta 8080
app.listen(8080, function() {
    console.log('servidor aguardando requisiçoes na porta 8080')
});