// pipeline {
//   agent any

//   options {
//     timeout(time: 60, unit: 'MINUTES')
//   }

//   triggers {
//     // Equivalent of push trigger (poll repo)
//     pollSCM('H/5 * * * *')
//   }

//   stages {

//     stage('Checkout repo') {
//       steps {
//         checkout scm
//       }
//     }

//     stage('Setup Node + Install deps') {
//       steps {
//         sh 'npm ci'
//       }
//     }

//     stage('Install Playwright browsers') {
//       steps {
//         sh 'npx playwright install --with-deps'
//       }
//     }

//     stage('Install Allure CLI') {
//       steps {
//         sh 'npm install -D allure-commandline'
//       }
//     }

//     stage('Run Playwright tests') {
//       steps {
//         // xvfb like GitHub Actions
//         sh 'xvfb-run -a npx playwright test || true'
//       }
//     }

//     stage('Generate Allure Report') {
//       steps {
//         sh '''
//         npx allure-commandline generate \
//         results_reports/allure-results \
//         --clean \
//         -o results_reports/allure-report
//         '''
//       }
//     }
//   }

//   post {
//     always {

//       // Archive raw artifacts (like upload-artifact in GitHub)
//       archiveArtifacts artifacts: 'results_reports/test-results/**', allowEmptyArchive: true
//       archiveArtifacts artifacts: 'artifacts/**', allowEmptyArchive: true
//       archiveArtifacts artifacts: 'results_reports/playwright-report/**', allowEmptyArchive: true
//       archiveArtifacts artifacts: 'results_reports/allure-report/**', allowEmptyArchive: true

//       // Publish Playwright HTML report inside Jenkins UI
//       publishHTML([
//         reportDir: 'results_reports/playwright-report',
//         reportFiles: 'index.html',
//         reportName: 'Playwright Report',
//         keepAll: true,
//         allowMissing: true,
//         alwaysLinkToLastBuild: true
//       ])

//       // Publish Allure HTML report
//       publishHTML([
//         reportDir: 'results_reports/allure-report',
//         reportFiles: 'index.html',
//         reportName: 'Allure Report',
//         keepAll: true,
//         allowMissing: true,
//         alwaysLinkToLastBuild: true
//       ])
//     }
//   }
// }


pipeline {
  agent any

  options {
    timeout(time: 60, unit: 'MINUTES')
  }

  stages {

    stage('Setup Node + Install deps') {
      steps {
        bat 'npm ci'
      }
    }

    stage('Install Playwright browsers') {
      steps {
        bat 'npx playwright install'
      }
    }

    stage('Install Allure CLI') {
      steps {
        bat 'npm install -D allure-commandline'
      }
    }

    stage('Run Playwright tests') {
      steps {
        // xvfb is Linux only, remove it on Windows
        bat 'npx playwright test || exit /b 0'
      }
    }

    stage('Generate Allure Report') {
      steps {
        bat '''
        npx allure-commandline generate results_reports\\allure-results ^
        --clean ^
        -o results_reports\\allure-report
        '''
      }
    }
  }

  post {
    always {

      archiveArtifacts artifacts: 'results_reports\\test-results\\**', allowEmptyArchive: true
      archiveArtifacts artifacts: 'artifacts\\**', allowEmptyArchive: true

      publishHTML([
        reportDir: 'results_reports\\playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright Report',
        keepAll: true,
        allowMissing: true
      ])

      publishHTML([
        reportDir: 'results_reports\\allure-report',
        reportFiles: 'index.html',
        reportName: 'Allure Report',
        keepAll: true,
        allowMissing: true
      ])
    }
  }
}
