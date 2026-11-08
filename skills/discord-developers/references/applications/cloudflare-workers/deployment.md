# Deployment
Context: Discord developer reference: Deployment
[Source](hosting-on-cloudflare-workers-index.md) / [Previous source section](setting-up-ngrok.md) / [Following source section](code-deep-dive.md)
<a id="source-deployment"></a>

### Deployment

 The repository is configured to deploy automatically to Cloudflare Workers when changes reach the `main` branch. For manual deployment, run `npm run publish`; it invokes `wrangler publish`. A GitHub Action deployment needs an [API Token and your Account ID from Cloudflare](https://developers.cloudflare.com/workers/cli-wrangler/authentication/). Store those values [as secrets in the GitHub repository](https://docs.github.com/en/actions/security-guides/encrypted-secrets) so GitHub Actions can use them. The `.github/workflows/ci.yaml` example below shows the configuration:

```
release:
  if: github.ref == 'refs/heads/main'
  runs-on: ubuntu-latest
  needs: [test, lint]
  steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
      with:
        node-version: 16
    - run: npm install
    - run: npm run publish
      env:
        CF_API_TOKEN: ${{ secrets.CF_API_TOKEN }}
        CF_ACCOUNT_ID: ${{ secrets.CF_ACCOUNT_ID }}

```

