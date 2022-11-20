pipeline {
  agent any

  environment {
    FIREBASE_TOKEN = credentials('FIREBASE_TOKEN')
    PROJECT_ID = credentials('PROJECT_ID_ERENTCAR')
  }

  stages {
    stage ("Build") {
      steps {
        bat "npm install"
        bat "npm run build"
      }
    }

    stage ("Deploy") {
      steps {
        bat "firebase deploy --project=%PROJECT_ID% --token %FIREBASE_TOKEN%"
      }
    }
  }
}