pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'caas-test-jenkins:latest'
        DOCKER_REPO = 'localhost:5000/caas-test-jenkins' // Cambia esto si usas un registro privado
        GITHUB_CREDENTIALS_ID = 'dd39add3-52fb-4134-8775-9553352cb936' // ID de las credenciales en Jenkins
        REPO_URL = 'github.com/lldisool1997/adv-caas-reportes.git' // ejemplo: github.com/lldisool1997/test-jenkins.git
        TARGET_BRANCH = 'develop'
    }

    stages {
         stage('Clean Workspace') {
            steps {
                script {
                    // Eliminar el contenido del directorio de trabajo
                    deleteDir()
                }
            }
        }
        stage('Checkout') {
            steps {
                script {
                    withCredentials([string(credentialsId: "${GITHUB_CREDENTIALS_ID}", variable: 'GITHUB_TOKEN')]) {
                        sh 'git clone https://${GITHUB_TOKEN}@${REPO_URL} .'
                        sh 'git checkout ${TARGET_BRANCH}'
                    }
                }
            }
        }

        stage('Build and Test') {
            steps {
                script {
                    // Construir y testear la imagen de Docker
                    sh 'docker build --target test -t ${DOCKER_IMAGE} .'
                }
            }
        }

        stage('Push') {
            steps {
                script {
                    // Subir la imagen al registro de Docker
                    sh 'docker tag ${DOCKER_IMAGE} ${DOCKER_REPO}'
                    sh 'docker push ${DOCKER_REPO}'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Desplegar la imagen en Docker Swarm
                    sh """
                    docker service rm test-llento-test || true
                    docker service create --name test-llento-test --publish published=9000,target=80 --replicas=3 ${DOCKER_REPO}
                    """
                }
            }
        }
    }

    post {
        always {
            script {
                // Limpiar imágenes no usadas
                sh 'docker system prune -f'
            }
        }
    }
}
