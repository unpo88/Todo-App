FROM ubuntu:latest

MAINTAINER Wonsub Choi <whatsup@khu.ac.kr>

ENV PYTHONUNBUFFERED 1

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y python3 python3-pip python-pip python3-dev build-essential libmysqlclient-dev
COPY ./requirements.txt /requirements.txt
RUN pip3 install --upgrade pip
RUN pip install -r /requirements.txt

RUN mkdir /backend
RUN mkdir /frontend

ADD ./backend /backend/
ADD ./frontend /frontend/

WORKDIR /frontend
RUN npm install
RUN npm run build

WORKDIR /
ADD ./config /todo-app-configs/

COPY ./config/nginx/default.conf /tmp/
COPY ./docker-entrypoint.sh /docker-entrypoint.sh 

RUN chmod +x /docker-entrypoint.sh  

ENTRYPOINT ["/docker-entrypoint.sh"]
