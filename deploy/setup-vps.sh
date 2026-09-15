#!/usr/bin/env bash
# Primera instalación en el VPS. Ejecutar UNA vez como root (o con sudo):
#   bash setup-vps.sh
set -e
mkdir -p /opt/1492tokens/dist
cp docker-compose.yml nginx.conf /opt/1492tokens/
[ -f /opt/1492tokens/.env ] || cp .env.example /opt/1492tokens/.env
echo "Revisa /opt/1492tokens/.env (usa detect-traefik.sh para los valores) y luego:"
echo "  cd /opt/1492tokens && docker compose up -d"
echo
echo "Crea también el usuario de despliegue para GitHub Actions:"
echo "  adduser --disabled-password --gecos '' deploy"
echo "  chown -R deploy:deploy /opt/1492tokens/dist"
echo "  mkdir -p /home/deploy/.ssh && chmod 700 /home/deploy/.ssh"
echo "  # pega la clave pública en /home/deploy/.ssh/authorized_keys"
