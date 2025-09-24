pipeline {
    agent any

    environment {
        // Docker Hub username or organization name
        DOCKER_REGISTRY = "mani5747"

        // Jenkins credentials ID for Docker Hub login
        DOCKER_CREDENTIALS = "dockerhub-kavimani136"

        // Jenkins credentials ID for GitHub Personal Access Token (PAT)
        // GITHUB_CREDENTIALS = "github-kavimani136"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/kavimani136/MicroServicesNodeApp.git',
                    //  credentialsId: "${GITHUB_CREDENTIALS}"
            }
        } 

        stage('Docker Login') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS}", usernameVariable: 'mani5747', passwordVariable: 'dckr_pat_i-wSg5CszAN0ITkbgBh7ErrV5jk')]) {
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

        // stage('Deploy to Kubernetes') {
        //     steps {
        //         script {
        //             def services = ['user-service','role-service','api-gateway']
        //             for (service in services) {
        //                 def imageTag = "${DOCKER_REGISTRY}/${service}:${env.BUILD_NUMBER}"
        //                 echo "Updating Kubernetes deployment: ${service} with image ${imageTag}"
        //                 sh "kubectl set image deployment/${service} ${service}=${imageTag} --record"
        //             }
        //         }
        //     }
        // }
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
