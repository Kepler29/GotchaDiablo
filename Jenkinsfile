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
                    cp site.conf /etc/nginx/sites-available/gotchadiablo.com
                    if [ -f /etc/nginx/sites-enabled/gotchadiablo.com ];
                    then
                        echo "ya esta el enlace"
                    else
                        ln -s /etc/nginx/sites-available/gotchadiablo.com /etc/nginx/sites-enabled/gotchadiablo.com
                    fi
                    cd /var/lib/jenkins/workspace/GotchaDiablo_master/page
                    npm install
                    npm audit fix
                    npm run build:ssr
                    cd dist/page/server
                    pwd
                    pm2 start main.js --name siteGD --watch
                '''
            }
        }
       stage('Build Admin') {
            steps {
                sh '''
                    #!/bin/bash
                    cp admin.conf /etc/nginx/sites-available/admin.gotchadiablo.com
                    if [ -f /etc/nginx/sites-enabled/admin.gotchadiablo.com ];
                    then
                        echo "ya esta el enlace"
                    else
                        ln -s /etc/nginx/sites-available/admin.gotchadiablo.com /etc/nginx/sites-enabled/admin.gotchadiablo.com
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
                    cp backend.conf /etc/nginx/sites-available/backend.gotchadiablo.com
                    if [ -f /etc/nginx/sites-enabled/backend.gotchadiablo.com ];
                    then
                        echo "ya esta el enlace"
                    else
                        ln -s /etc/nginx/sites-available/backend.gotchadiablo.com /etc/nginx/sites-enabled/backend.gotchadiablo.com
                    fi
                    cd /var/lib/jenkins/workspace/GotchaDiablo_master/api
                    npm install
                    pm2 start app.js --name backGD --watch
                '''
            }
        }
    }
}