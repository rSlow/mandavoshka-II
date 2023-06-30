FROM python:3.11

WORKDIR $DJANGO_WORKDIR

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . $DJANGO_WORKDIR

RUN chmod +x ./entrypoint.sh
ENTRYPOINT ./entrypoint.sh