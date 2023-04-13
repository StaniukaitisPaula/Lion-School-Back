let alunos = require('../module/alunos')
let cursos = require('../module/cursos')


function getListaCursos() {
   
    let listaJson = {}
    let listaArry = []

    cursos.cursos.forEach(function(date) {

        listaArry.push({
            Curso: date.nome,
            Sigla_Curso: date.sigla,
            Icone: date.icone,
            Carga_Horaria: date.carga
        })
        listaJson.cursos = listaArry
    })

    return listaJson
}
//console.log(getListaCursos())


function getListaAlunoCurso(cursoEspecifico) {
   

    let listaJson = {}
    let listaArry = []

    alunos.alunos.forEach((aluno) => {
        aluno.curso.forEach((item) => {
            if (item.sigla == cursoEspecifico.toUpperCase() && item != []) {
                listaArry.push(aluno)
            }
        })
        listaJson.alunos = listaArry
    })
    return listaJson
}
//console.log(getListaAlunoCurso("rds"))


function getListarAluno() {


    let listaJson = {}
    let listaArry = []


    alunos.alunos.forEach(function(date) {

        listaArry.push({

            Perfil: date.foto,
            Nome: date.nome,
            Matricula: date.matricula,
            Sexo: date.sexo,
            Curso: date.curso,
            Status: date.status,


        })
        listaJson.alunos = listaArry

    })

    return listaJson
}
//console.log(getListarAluno())

function getListarMatricula(matricula) {

    let alunoFiltrado = alunos.alunos.filter((aluno) => {
        return aluno.matricula == matricula
    })

    return alunoFiltrado
}
//console.log(getListarMatricula(20151001001));


function getListarStatusAluno(statusDoAluno, siglaCurso) {
    

    let listaJson = {}
    let listaArry = []
    let status = false

    if (siglaCurso != undefined) {
        alunos = siglaCurso
    }

    let statusCase = statusDoAluno[0].toUpperCase() + statusDoAluno.substring(1).toLowerCase()


    alunos.alunos.forEach(function (aluno) {
        if (aluno.status == statusCase) {
            listaArry.push(aluno)
            status = true
        }
    })
    listaJson.Status = listaArry

    if(status){
        return listaJson
    }else{
        return status
    }
}
 //console.log(getListarStatusAluno('cursando', getListaAlunoCurso('ds')));

function getListaData(dataConclusao, siglaCurso) {
  
   

    let listaJson = {}
    let listaArry = []
    let status = false

    if (siglaCurso != undefined) {
        alunos = siglaCurso
    }

    alunos.alunos.forEach(function (aluno) {
        if (dataConclusao == aluno.curso[0].conclusao) {
            listaArry.push(aluno)
            status = true
        }
    })
   
    listaJson.alunos = listaArry

    if (status) {
        return listaJson
    } else {
        status == true
        return listaJson
    }

}
//console.log(getListaData('2020', getListaAlunoCurso('rds')))

module.exports = {
    getListaCursos,
    getListarAluno,
    getListaAlunoCurso,
    getListaData,
    getListarStatusAluno,
    getListarMatricula
}