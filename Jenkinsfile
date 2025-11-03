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
        SERVICE_NAME = ''
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

      stage('Detect Changed Microservice') {
    steps {
        script {
            echo "🔍 Detecting which microservice changed..."
            def changedFiles = bat(returnStdout: true, script: 'git diff --name-only HEAD~1 HEAD').trim().split('\n')
            echo "Changed files: ${changedFiles}"

            // Match folder name containing "-service"
            def changedServiceFolder = changedFiles.find { it =~ /.*-service.*/ }
            if (changedServiceFolder) {
                env.SERVICE_NAME = changedServiceFolder.tokenize('/')[0].trim()
                echo "📦 Detected changed service folder: ${env.SERVICE_NAME}"
            } else {
                env.SERVICE_NAME = 'none'
                echo "⚠️  No microservice changes detected. Skipping deployment."
            }
        }
    }
}


       stage('Deploy Changed Microservice') {
    when { expression { env.SERVICE_NAME != 'none' } }
    steps {
        bat """
            echo ================================
            echo 🐳 Deploying Service: ${SERVICE_NAME}
            echo ================================

            cd ${WORKSPACE}

            docker-compose build ${SERVICE_NAME}
            docker-compose up -d ${SERVICE_NAME}

            echo ✅ ${SERVICE_NAME} deployed successfully!
            docker ps
        """
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
