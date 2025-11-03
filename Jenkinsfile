// pipeline {
//     agent any

//     environment {
//         DOCKER_REGISTRY = "mani5747"
//         WORKSPACE = "C:/ProgramData/Jenkins/.jenkins/workspace/microservice"
//         // Use Jenkins credentials instead of hardcoding PATs
//          DOCKER_CREDENTIALS = "f192eec4-48b4-4d05-9e98-5a6f0d6f553a"  // Docker Hub credentials ID in Jenkins
//         // GITHUB_CREDENTIALS = "github-kavimani136"      // GitHub PAT credentials ID in Jenkins
//     }

//     stages {  

//        stage('Checkout Code') {
//             steps {
//                 git branch: 'main',
//                     url: 'https://github.com/kavimani136/microservices.git'
//             }
//         }


// stage('Build & Run with Docker Compose') {
//     steps {
//         script {
//             bat """
//                 REM Navigate to the folder where docker-compose.yml exists
//                 cd ${WORKSPACE}
                
//                 REM Build and start all services
//                 docker-compose up --build -d
                
//                 REM Optional: Show running containers
//                 docker ps
//             """
//         }
//     }
// }

//     }

//     post {
//         success {
//             echo "Pipeline completed successfully!"
//         }
//         failure {
//             echo "Pipeline failed!"
//         }
//     }
// }

pipeline {
    agent any

    parameters {
        string(name: 'SERVICES_TO_DEPLOY', defaultValue: 'user-service', description: 'Comma-separated microservices to deploy')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy Selected Microservices') {
            steps {
                script {
                    def services = params.SERVICES_TO_DEPLOY.split(',').collect { it.trim() }
                    for (service in services) {
                        echo "🚀 Deploying ${service}..."
                        bat """
                            docker-compose build ${service}
                            docker-compose up -d ${service}
                        """
                    }
                }
            }
        }
    }

    post {
        success { echo '✅ Deployment pipeline completed successfully!' }
        failure { echo '❌ Deployment failed!' }
        always  { echo 'Pipeline execution finished.' }
    }
}
