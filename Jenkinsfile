// docker build -t gotchasite .
// docker run -d --name gotchasite -p 4110:4110 gotchasite
pipeline {
    agent any
    triggers {
        githubPush()
    }
    stages {
        stage('Build Site') {
            steps {
                sh '''
                    #!/bin/bash
                    cp site.conf /etc/nginx/sites-available/dev.gotchadiablo.com
                    if [ -f /etc/nginx/sites-enabled/dev.gotchadiablo.com ];
                    then
                        echo "ya esta el enlace"
                    else
                        ln -s /etc/nginx/sites-available/dev.gotchadiablo.com /etc/nginx/sites-enabled/dev.gotchadiablo.com
                    fi
                    cd /var/lib/jenkins/workspace/GotchaDiablo_dev/page
                    npm install
                    npm run build:ssr
                '''
            }
        }
       stage('Build Admin') {
            steps {
                sh '''
                    #!/bin/bash
                    cp admin.conf /etc/nginx/sites-available/admin.dev.gotchadiablo.com
                    if [ -f /etc/nginx/sites-enabled/admin.dev.gotchadiablo.com ];
                    then
                        echo "ya esta el enlace"
                    else
                        ln -s /etc/nginx/sites-available/admin.dev.gotchadiablo.com /etc/nginx/sites-enabled/admin.dev.gotchadiablo.com
                    fi
                    cd /var/lib/jenkins/workspace/GotchaDiablo_dev/app
                    npm install --legacy-peer-deps
                    ng build
                '''
            }
        }
        stage('Build Backend') {
            steps {
                sh '''
                    #!/bin/bash
                    cp backend.conf /etc/nginx/sites-available/backend.dev.gotchadiablo.com
                    if [ -f /etc/nginx/sites-enabled/backend.dev.gotchadiablo.com ];
                    then
                        echo "ya esta el enlace"
                    else
                        ln -s /etc/nginx/sites-available/backend.dev.gotchadiablo.com /etc/nginx/sites-enabled/backend.dev.gotchadiablo.com
                    fi
                    cd /var/lib/jenkins/workspace/GotchaDiablo_dev/api
                    npm install
                    pm2 restart app.js --name devBackGD --watch
                '''
            }
        }
    }
}