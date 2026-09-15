#!/usr/bin/env bash
# Ejecutar en el VPS: descubre la red, el entrypoint y el certresolver de Traefik
# para rellenar /opt/1492tokens/.env
set -e
C=$(docker ps --format '{{.Names}}' | grep -i traefik | head -n1)
[ -z "$C" ] && { echo "No encuentro un contenedor de Traefik en ejecución"; exit 1; }
echo "Contenedor Traefik: $C"
echo
echo "== Redes a las que está conectado (usa una en TRAEFIK_NETWORK) =="
docker inspect "$C" --format '{{range $k,$v := .NetworkSettings.Networks}}{{$k}}{{"\n"}}{{end}}'
echo
echo "== Argumentos de arranque (busca entrypoints y certificatesresolvers) =="
docker inspect "$C" --format '{{range .Args}}{{.}}{{"\n"}}{{end}}' | grep -Ei 'entrypoints|certificatesresolvers' || true
echo
echo "== Si está configurado por archivo, mira también: =="
docker inspect "$C" --format '{{range .Mounts}}{{.Source}} -> {{.Destination}}{{"\n"}}{{end}}'
echo
echo "Ejemplo: si ves '--entrypoints.websecure.address=:443' y"
echo "'--certificatesresolvers.letsencrypt.acme...', entonces:"
echo "  TRAEFIK_ENTRYPOINT=websecure"
echo "  TRAEFIK_CERTRESOLVER=letsencrypt"
