FROM rocicorp/zero:0.22.2025070600

RUN mkdir -p /data
EXPOSE 80

# Add a simple health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:80/keepalive || exit 1

CMD ["zero-cache"]