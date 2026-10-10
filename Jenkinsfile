pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.48.0-jammy'
      args '--ipc=host'
    }
  }
  environment {
    CI = 'true'
    BASE_URL = 'http://jupiter.cloud.planittesting.com'
    HOME = "${WORKSPACE}"
  }
  options { timeout(time: 30, unit: 'MINUTES') }
  stages {
    stage('Install')    { steps { sh 'npm ci' } }
    stage('Type check') { steps { sh 'npm run lint' } }
    stage('Test suite') { steps { sh 'npm run test:ci' } }
    stage('TC2 stability (5 runs, no retries)') {
      steps {
        sh 'JUNIT_FILE=results/junit-tc2-x5.xml PLAYWRIGHT_HTML_REPORT=playwright-report-tc2-x5 npm run test:tc2:x5'
      }
    }
  }
  post {
    always {
      junit allowEmptyResults: true, testResults: 'results/*.xml'
      publishHTML(target: [reportDir: 'playwright-report', reportFiles: 'index.html',
                           reportName: 'Playwright Report', keepAll: true, allowMissing: true])
      archiveArtifacts artifacts: 'test-results/**, playwright-report-tc2-x5/**', allowEmptyArchive: true
    }
  }
}
