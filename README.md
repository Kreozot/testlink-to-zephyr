# testlink-to-zephyr

Converter from Testlink test cases (exported to XML) to CSV ready to import to Zephyr

## Usage

```
npx testlink-to-zephyr --input=./testlink-export.xml --output=./zephyr-import.csv
```

Arguments:
* **input** - Path to an input XML
* **output** (optional) - Path to an output CSV ('result.csv' by default)

## Import to Zephyr Scale

![Screenshot 1](/docs/import1.png)

![Screenshot 2](/docs/import2.png)

Choose generated CSV file. Select semicolon as a CSV delimeter.

![Screenshot 3](/docs/import3.png)

Ensure that fields mapping is correct:

![Screenshot 4](/docs/import4.png)

## Features

* Hierarchical folders (from nested test suites)
* Labels (from test case keywords)

There is no statuses and importance mapping for now.
If you want some (or any other feature), feel free to send me a PR.
