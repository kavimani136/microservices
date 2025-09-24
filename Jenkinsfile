pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = "mani5747"
        // Use Jenkins credentials instead of hardcoding PATs
         DOCKER_CREDENTIALS = "f192eec4-48b4-4d05-9e98-5a6f0d6f553a"  // Docker Hub credentials ID in Jenkins
        // GITHUB_CREDENTIALS = "github-kavimani136"      // GitHub PAT credentials ID in Jenkins
    }

    stages { 

       stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/kavimani136/microservices.git'
                  // credentialsId: "${GITHUB_CREDENTIALS}"
            }
        }

       stage('Build & Push Docker Images') {
    steps {
        script {
            def services = ['user-service','role-service','api-gateway']
            for (service in services) {
                def imageTag = "${DOCKER_REGISTRY}/${service}:${env.BUILD_NUMBER}"
                echo "Building and pushing image: ${imageTag}"
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS}", 
                                                 usernameVariable: 'DOCKER_USER', 
                                                 passwordVariable: 'DOCKER_PASS')]) {
                    bat """
                        docker build -t ${imageTag} ${service}
                        echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                        docker push ${imageTag}
                    """
                }
            }
        }
    }
}


        stage('Deploy to Kubernetes') {
            steps {
                script {
                    def services = ['user-service','role-service','api-gateway']
                    for (service in services) {
                        def imageTag = "${DOCKER_REGISTRY}/${service}:${env.BUILD_NUMBER}"
                        echo "Updating Kubernetes deployment: ${service} with image ${imageTag}"
                        sh "kubectl set image deployment/${service} ${service}=$imageTag --record"
                    }
                }
            }
        }
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
