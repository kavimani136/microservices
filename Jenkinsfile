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

    environment {
        SERVICES_TO_DEPLOY = ''
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Load Services from .env') {
            steps {
                script {
                    echo "🔍 Reading .env file for deployment list..."
                    
                    def envFile = readFile("${WORKSPACE}/.env")
                    def match = envFile =~ /SERVICES_TO_DEPLOY=(.*)/
                    if (match) {
                        env.SERVICES_TO_DEPLOY = match[0][1].trim()
                        echo "📦 Services to deploy: ${env.SERVICES_TO_DEPLOY}"
                    } else {
                        env.SERVICES_TO_DEPLOY = ''
                        echo "⚠️ No SERVICES_TO_DEPLOY variable found in .env"
                    }
                }
            }
        }

        stage('Deploy Selected Microservices') {
            when { expression { env.SERVICES_TO_DEPLOY?.trim() } }
            steps {
                script {
                    def services = env.SERVICES_TO_DEPLOY.split(',').collect { it.trim() }
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
        success {
            echo '✅ Deployment pipeline completed successfully!'
        }
        failure {
            echo '❌ Deployment failed! Check the logs for errors.'
        }
        always {
            echo 'Pipeline execution finished.'
        }
    }
}
