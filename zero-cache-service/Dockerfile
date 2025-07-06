FROM rocicorp/zero:0.21.2025062401

RUN mkdir -p /data
EXPOSE 4848

# Add a simple health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:4848/keepalive || exit 1

CMD ["zero-cache"]