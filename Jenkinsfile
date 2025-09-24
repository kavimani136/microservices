pipeline {
    agent any


    environment {
        APP_NAME = "microservices"
        DIST_DIR = "${WORKSPACE}\\dist\\${APP_NAME}"
        IIS_DIR  = "C:\\inetpub\\wwwroot\\${APP_NAME}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/kavimani136/MicroServicesNodeApp.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat "npm install"
            }
        }

        stage('Build Angular App') {
            steps {
                bat "npm run build -- --configuration=production"
            }
        }

        // stage('Deploy to IIS Folder') {
        //     steps {
        //         powershell '''
        //         # Create IIS folder if it doesn't exist
        //         if (!(Test-Path "$env:IIS_DIR")) {
        //             New-Item -ItemType Directory -Path "$env:IIS_DIR" | Out-Null
        //         }

        //         # Clean old files
        //         Remove-Item -Path "$env:IIS_DIR\\*" -Recurse -Force -ErrorAction SilentlyContinue

        //         # Copy new build (web.config already included)
        //         Copy-Item -Path "$env:DIST_DIR\\*" -Destination "$env:IIS_DIR" -Recurse -Force
        //         '''
        //     }
        // }
        
    }

    post {
        success {
            echo "✅ Deployment completed successfully!"
        }
        failure {
            echo "❌ Deployment failed."
        }
    }
}