# runs when called without arguments
default:
  @just --list

# deploy to server
deploy:
  just version
  just feed
  ./deploy.sh

# run blog for local development
dev:
  deno run --allow-env --allow-net --allow-read main.ts development

# generate feeds
feed:
  deno run --allow-env --allow-read --allow-write feed.ts

# run blog for production
start:
  deno run --allow-env --allow-net --allow-read main.ts

# generate version.txt
version:
  @echo "Updating version.txt with ChronVer"
  @deno eval "const now = new Date(); const version = \`\${now.getFullYear()}.\${String(now.getMonth() + 1).padStart(2, '0')}.\${String(now.getDate()).padStart(2, '0')}\`; await Deno.writeTextFile('version.txt', version);"
  @echo "Version updated: $(cat version.txt)"
