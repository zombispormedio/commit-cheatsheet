FROM zombispormedio/micro:1.0.0

COPY public /var/www/public

ENV PORT 8085

ENV STATIC_DIR /var/www/public

EXPOSE 8085

CMD ["./micro"]