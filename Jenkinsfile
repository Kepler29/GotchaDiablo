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
                  docker build -t siteimagedevgd .
                  docker run -it -p 4012:4012 --name sitedevgd -d siteimagedevgd
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
                  docker build -t backimagedevgd .
                  docker run -it -p 4011:4011 --name backdevgd -d backimagedevgd
              '''
          }
      }
  }
}
