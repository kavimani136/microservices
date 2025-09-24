pipeline {
    agent any

    environment {
        // DOCKER_REGISTRY = "your-dockerhub-username"
        // DOCKER_CREDENTIALS = "dockerhub-creds"  // Jenkins Docker Hub credentials ID
        // GITHUB_CREDENTIALS = "github-creds"     // Jenkins GitHub PAT credentials ID
          // Docker Hub username or organization name
    DOCKER_REGISTRY = "kavimani136"

    // Jenkins credentials ID for Docker Hub login
    DOCKER_CREDENTIALS = "dockerhub-kavimani136"

    // Jenkins credentials ID for GitHub Personal Access Token (PAT)
    GITHUB_CREDENTIALS = "github-kavimani136"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/kavimani136/MicroServicesNodeApp.git',
                    credentialsId: "${GITHUB_CREDENTIALS}"
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
                            docker build -t $imageTag ${service}
                            echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin
                            docker push $imageTag
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
        //                 sh "kubectl set image deployment/${service} ${service}=$imageTag --record"
        //             }
        //         }
        //     }
        // }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed!"
        }
    }
}
