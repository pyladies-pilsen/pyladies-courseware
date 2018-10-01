FROM alpine:3.8

RUN apk add build-base mongodb python3 python3-dev libffi-dev openssl-dev nodejs npm nginx
RUN python3 -m pip install -U pip wheel

ENV NODE_ENV=production

COPY frontend/package.json frontend/package-lock.json /frontend/
RUN cd /frontend && npm install

COPY backend/requirements.txt /backend/
RUN python3 -m pip install -r /backend/requirements.txt

COPY frontend /frontend/
RUN cd /frontend && npm run build

COPY backend /backend/
RUN python3 -m pip install /backend

COPY courses /data/courses/
COPY docker_demo_entrypoint.sh nginx.conf /
COPY docker_frontend_entrypoint.sh /bin/cw-frontend

EXPOSE 8000

CMD ["/docker_demo_entrypoint.sh"]
