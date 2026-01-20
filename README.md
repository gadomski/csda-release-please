# csda-version

A Github action to calculate the next CSDA version for the checked-out repository.
To use with [release-please](https://github.com/googleapis/release-please):

```yaml
steps:
  - name: CSDA Version
    id: csda-version
    uses: gadomski/csda-version
  - uses: googleapis/release-please-action@v4
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      release-as: ${{ steps.csda-version.outputs.version }}
```
