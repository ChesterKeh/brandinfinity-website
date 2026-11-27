"""
Builds an upload-ready copy of the site for any static host (Netlify, Cloudflare Pages, Vercel, cPanel...).

  python3 tools/make-deploy.py https://www.brandinfinity.sg/

- copies only what the site needs (no tools/, README, git files)
- points the link-preview tags (og:url, og:image, canonical) at the final address
- adds _headers (cache + security headers; read by Netlify and Cloudflare Pages)
- writes ../brandinfinity-site-deploy.zip next to the repo
"""
import os, shutil, sys, zipfile

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
url = (sys.argv[1] if len(sys.argv) > 1 else "https://www.brandinfinity.sg/").rstrip("/") + "/"
out = os.path.join(root, "..", "brandinfinity-site-deploy")
zpath = out + ".zip"

if os.path.isdir(out):
    shutil.rmtree(out)
os.makedirs(out)
for f in ["index.html", "styles.css", "main.js", "projects.js", "i18n.js"]:
    shutil.copy2(os.path.join(root, f), out)
shutil.copytree(os.path.join(root, "assets"), os.path.join(out, "assets"))

p = os.path.join(out, "index.html")
s = open(p, encoding="utf-8").read()
s = s.replace("https://chesterkeh.github.io/brandinfinity-website/", url)
open(p, "w", encoding="utf-8").write(s)

open(os.path.join(out, "_headers"), "w").write("""/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: frame-ancestors 'self' https://www.brandinfinity.sg https://brandinfinity.sg https://*.wixsite.com https://*.wix.com https://*.editorx.io

/assets/*
  Cache-Control: public, max-age=604800

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable
""")

if os.path.exists(zpath):
    os.remove(zpath)
with zipfile.ZipFile(zpath, "w", zipfile.ZIP_DEFLATED) as z:
    for d, _, files in os.walk(out):
        for f in files:
            full = os.path.join(d, f)
            z.write(full, os.path.join("brandinfinity-site", os.path.relpath(full, out)))
size = os.path.getsize(zpath) / 1e6
print(f"Built {os.path.normpath(zpath)} ({size:.1f} MB) for {url}")
