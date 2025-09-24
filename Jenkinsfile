pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = "mani5747"                // Docker Hub username/org
        DOCKER_CREDENTIALS = "dockerhub-kavimani136" // Jenkins credential ID for Docker Hub
        GITHUB_CREDENTIALS = "github-kavimani136"    // Jenkins credential ID for GitHub PAT
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/kavimani136/MicroServicesNodeApp.git',
                    credentialsId: "${GITHUB_CREDENTIALS}"
            }
        }

        stage('Docker Login') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    }
                }
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                script {
                    def services = ['user-service','role-service','dept-service','country-service','api-gateway']
                    for (service in services) {
                        def imageTag = "${DOCKER_REGISTRY}/${service}:${env.BUILD_NUMBER}"
                        echo "Building and pushing image: ${imageTag}"
                        sh """
                            docker build -t ${imageTag} ${service}
                            docker push ${imageTag}
                        """
                    }
                }
            } 
        }
    }

    post {
        success {
            echo "✅ Pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed!"
        }
    }
}
