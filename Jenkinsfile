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
                    cp site.conf /etc/nginx/sites-available/gotchadiablo.com.conf
                    if [ -f /etc/nginx/sites-enabled/gotchadiablo.com.conf ];
                    then
                        echo "ya esta el enlace"
                    else
                        ln -s /etc/nginx/sites-available/gotchadiablo.com.conf /etc/nginx/sites-enabled/gotchadiablo.com.conf
                    fi
                    cd /var/lib/jenkins/workspace/GotchaDiablo_master/page
                    npm install
                    npm run build:ssr
                '''
            }
        }
       stage('Build Admin') {
            steps {
                sh '''
                    #!/bin/bash
                    cp admin.conf /etc/nginx/sites-available/admin.gotchadiablo.com.conf
                    if [ -f /etc/nginx/sites-enabled/admin.gotchadiablo.com.conf ];
                    then
                        echo "ya esta el enlace"
                    else
                        ln -s /etc/nginx/sites-available/admin.gotchadiablo.com.conf /etc/nginx/sites-enabled/admin.gotchadiablo.com.conf
                    fi
                    cd /var/lib/jenkins/workspace/GotchaDiablo_master/app
                    npm install --legacy-peer-deps
                    ng build
                '''
            }
        }
        stage('Build Backend') {
            steps {
                sh '''
                    #!/bin/bash
                    cp backend.conf /etc/nginx/sites-available/backend.gotchadiablo.com.conf
                    if [ -f /etc/nginx/sites-enabled/backend.gotchadiablo.com.conf ];
                    then
                        echo "ya esta el enlace"
                    else
                        ln -s /etc/nginx/sites-available/backend.gotchadiablo.com.conf /etc/nginx/sites-enabled/backend.gotchadiablo.com.conf
                    fi
                    cd /var/lib/jenkins/workspace/GotchaDiablo_master/api
                    npm install
                    pm2 start app.js --name backGD --watch
                '''
            }
        }
    }
}