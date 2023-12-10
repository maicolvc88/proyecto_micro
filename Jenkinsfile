pipeline {

    agent any

    stages {
        stage ('Clinar repositorio'){
            steps {
                git branch: 'master', credentialsId: 'git-jenkins', url: 'https://github.com/maicolvc88/proyecto_balanceado.git'
            }
        }
        stage ('Construir imagen de docker') {
            steps {
                script {
                    withCredentials ([
                        String (credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
                    ]) {
                        docker.build('proyectos-micros:v1', "--build-arg MONGO_URI=${MONGO_URI} .")
                    }
                }
            }
        }
        stage('Construir image de docker'){
            steps {
                    script {
                        withCredentials([
                            string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
                        ]) {
                            sh """
                            docker build --build-arg MONGO_URI=${MONGO_URI} -t proyectos-micros:v1 .
                            """  
                        }
                    }
                }
                steps {
                    script {
                        withCredentials([
                            string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
                        ]) {
                            sh """
                            docker build --build-arg MONGO_URI=${MONGO_URI} -t docker-compose.yml .
                            """  
                        }
                    }
                }
                steps {
                    script {
                        withCredentials([
                            string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
                        ]) {
                            sh """
                            docker build --build-arg MONGO_URI=${MONGO_URI} -t loader-balancer .
                            """  
                        }
                    }
                }
        }
        stage('Desplegar contenedores Docker'){
            steps {
                script {
                    withCredentials([
                            string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
                    ]) {
                        sh """
                            docker-compose -f docker-compose.yml up -d
                        """
                    }
                }
            }
            
        }
        stage('Desplegar contenedor docker'){
            steps {
                script {
                    withCredentials ([
                        String (credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
                    ]) {
                        sh """
                            sed '${MONGO_URI}' docker-compose.yml > docker-compose-update.yml
                            docker.compose -f docker-compose-update.yml up -d
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            emailext {
                subject: "Estado del build: ${currentBuild.currentResult}",
                body: "Se ha completado el build, accede a los detalles en ${env.BUILD_URL}",
                to: 'maicolvc88@gmail.com',
                from: 'jenkins@iudigital.edu.co'

            }
        }
    }
}